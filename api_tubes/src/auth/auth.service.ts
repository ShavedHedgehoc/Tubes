import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateUserDto) {
    const candidate = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (candidate) {
      throw new HttpException("Пользователь уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.prisma.user.create({ data: { ...dto, password: hashPassword } });
    return user;
  }
}
