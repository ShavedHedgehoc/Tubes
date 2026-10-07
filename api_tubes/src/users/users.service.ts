import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GetUsersListDto } from "./dto/get-users-list.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "db";
import { UpdateRolesDto } from "./dto/update-roles.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsersList(query: GetUsersListDto) {
    const where: Prisma.UserWhereInput = {};

    if (query.name) {
      where.name = { contains: query.name, mode: "insensitive" };
    }

    if (query.email) {
      where.email = { contains: query.email, mode: "insensitive" };
    }

    if (query.banned && query.banned.length > 0) {
      where.banned = query.banned[0] !== 1;
    }

    if (query.roles && query.roles.length > 0) {
      where.user_roles = {
        some: {
          role_id: {
            in: query.roles,
          },
        },
      };
    }

    const { limit = 10, page = 1, name_asc } = query;

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        include: { user_roles: { include: { role: true } } },

        orderBy: { name: name_asc ? "asc" : "desc" },
        take: limit,
        skip: limit * (page - 1),
      }),
    ]);

    const formattedUsers = users.map((user) => {
      const { password: _, user_roles, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        roles: user_roles.map((ur) => ur.role),
      };
    });

    return { users: formattedUsers, total };
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { user_roles: { include: { role: true } } },
    });
    if (!user)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    const { password: _, user_roles, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      roles: user_roles.map((ur) => ur.role),
    };
  }

  async updateUserRoles(dto: UpdateRolesDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.id },
      include: { user_roles: { include: { role: true } } },
    });
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    const currentRolesIds = user.user_roles.map((ur) => ur.role.id);
    const idsToAdd = dto.roles.filter((id) => !currentRolesIds.includes(id));
    const idsToRemove = currentRolesIds.filter((id) => !dto.roles.includes(id));
    return await this.prisma.user.update({
      where: { id: dto.id },
      data: {
        user_roles: {
          deleteMany: idsToRemove.map((id) => ({
            role_id: id,
          })),

          create: idsToAdd.map((id) => ({
            role: { connect: { id } },
          })),
        },
      },
    });
  }

  async changeBannedStatus(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { banned: !user.banned },
    });
  }

  async updateUser(dto: UpdateUserDto) {
    const { id, ...data } = dto;
    const existsUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existsUser) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    if (data.email && data.email !== existsUser.email) {
      const emailTaken = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (emailTaken) {
        throw new HttpException(
          "Email уже используется",
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, user_roles: true },
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    await this.prisma.user.delete({ where: { id } });
  }

  async resetPassword(id: number) {
    const simplyPassword = "1";
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    const hashPassword = await bcrypt.hash(simplyPassword, 5);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    });
    return { message: "Пароль успешно сброшен" };
  }
}
