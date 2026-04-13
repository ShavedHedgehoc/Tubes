import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "src/auth/dto/register.dto";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import * as mapper from "./mapper";
import type { UserWithRoles } from "./mapper";
import { RefreshDto } from "./dto/refresh.dto";

interface JwtPayload {
  id: number;
  email: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(dto: LoginDto): Promise<UserWithRoles> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { user_roles: { include: { role: true } } },
    });
    if (!user) {
      throw new HttpException(
        "Пользователь с таким email не найден",
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.banned) {
      throw new HttpException("Доступ запрещен", HttpStatus.FORBIDDEN);
    }
    const passEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passEquals) {
      return user as UserWithRoles;
    }
    throw new UnauthorizedException({ message: "Некорректный пароль" });
  }

  private async generateTokens(user: UserWithRoles) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.user_roles.map((ur) => ur.role.value),
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: "JWT_ACCESS_SECRET",
        expiresIn: "30m",
      }),
      this.jwtService.signAsync(payload, {
        secret: "JWT_REFRESH_SECRET",
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const candidate = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (candidate) {
      throw new HttpException(
        "Пользователь уже существует",
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashPassword,
        user_roles: {
          create: {
            role: { connect: { value: "USER" } },
          },
        },
      },
      include: { user_roles: { include: { role: true } } },
    });
    const tokens = await this.generateTokens(user);
    await this.prisma.token.upsert({
      where: { user_id: user.id },
      update: { token: tokens.refreshToken },
      create: { user_id: user.id, token: tokens.refreshToken },
    });

    return {
      user: mapper.toRegisteredUserData(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user);

    await this.prisma.token.upsert({
      where: { user_id: user.id },
      update: { token: tokens.refreshToken },
      create: { user_id: user.id, token: tokens.refreshToken },
    });

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refresh(dto: RefreshDto) {
    const refreshToken = dto.refreshToken;
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: "JWT_REFRESH_SECRET",
        },
      );

      const tokenData = await this.prisma.token.findFirst({
        where: {
          user_id: payload.id,
        },
      });

      if (!tokenData) {
        throw new UnauthorizedException();
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        include: { user_roles: { include: { role: true } } },
      });

      if (!user || user.banned) throw new UnauthorizedException();

      const tokens = await this.generateTokens(user);
      return {
        accessToken: tokens.accessToken,
        refreshToken: dto.refreshToken,
      };
    } catch (_e) {
      throw new UnauthorizedException("Session expired");
    }
  }

  async removeToken(refreshToken: string) {
    return await this.prisma.token.deleteMany({
      where: { token: refreshToken },
    });
  }
}
