import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetEmployeesListDto } from "./dto/get-employees-list.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Prisma } from "db";

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // use in employee auth
  async getEmployeeByBarcode(barcode: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { barcode: barcode },
      include: {
        rank: true,
        employee_allowed_posts: {
          include: { post: true },
        },
      },
    });
    if (!employee) {
      throw new HttpException(
        "Сотрудник с таким штрихкодом не найден",
        HttpStatus.NOT_FOUND,
      );
    }

    if (employee.banned) {
      throw new HttpException("Доступ запрещен!", HttpStatus.FORBIDDEN);
    }
    const { employee_allowed_posts, ...cleanEmployee } = employee;
    const mappedAllowedPosts = (employee_allowed_posts || []).map(
      (eap) => eap.post,
    );
    return {
      ...cleanEmployee,
      allowed_posts: mappedAllowedPosts,
    };
  }

  async getEmployeeList(query: GetEmployeesListDto) {
    const where: Prisma.EmployeeWhereInput = {};

    if (query.name) {
      where.name = { contains: query.name, mode: "insensitive" };
    }

    if (query.banned && query.banned.length > 0) {
      where.banned = query.banned[0] !== 1;
    }

    if (query.ranks && Array.isArray(query.ranks) && query.ranks.length > 0) {
      where.rank_id = { in: query.ranks };
    }

    if (query.posts && Array.isArray(query.posts) && query.posts.length > 0) {
      const andConditions: Prisma.EmployeeWhereInput[] = query.posts.map(
        (postId) => ({
          employee_allowed_posts: {
            some: {
              post_id: postId,
            },
          },
        }),
      );
      if (where.AND) {
        where.AND = Array.isArray(where.AND)
          ? [...where.AND, ...andConditions]
          : [where.AND, ...andConditions];
      } else {
        where.AND = andConditions;
      }
    }
    const { limit = 10, page = 1, name_asc } = query;

    const [total, employees] = await Promise.all([
      this.prisma.employee.count({ where }),
      this.prisma.employee.findMany({
        where,
        include: {
          rank: true,
          employee_allowed_posts: {
            include: { post: true },
          },
        },
        orderBy: { name: name_asc ? "asc" : "desc" },
        take: limit,
        skip: limit * (page - 1),
      }),
    ]);
    const mappedEmployees = employees.map((e) => {
      const mappedAllowedPosts = e.employee_allowed_posts?.map(
        (eap) => eap.post,
      );
      return { ...e, allowed_posts: mappedAllowedPosts };
    });
    return { employees: mappedEmployees, total: total };
  }

  async getEmployeeById(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employee_id },
      include: {
        employee_allowed_posts: {
          include: { post: true },
        },
      },
    });
    if (!employee)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);

    const mappedAllowedPosts = employee.employee_allowed_posts?.map(
      (eap) => eap.post,
    );
    return { ...employee, allowed_posts: mappedAllowedPosts };
  }

  async changeBanned(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employee_id },
    });
    if (!employee)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    const updateEmployee = await this.prisma.employee.update({
      where: { id: employee_id },
      data: {
        banned: !employee.banned,
      },
    });
    return updateEmployee;
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const rank = await this.prisma.rank.findUnique({
      where: { id: dto.rank_id },
    });
    if (!rank)
      throw new HttpException("Разряд не найден", HttpStatus.NOT_FOUND);
    const employee = await this.prisma.employee.findUnique({
      where: { barcode: dto.barcode },
    });
    if (employee)
      throw new HttpException(
        "Уже существует сотрудник с таким штрихкодом",
        HttpStatus.BAD_REQUEST,
      );
    const { rank_id, allowed_post_ids, ...clearDto } = dto;
    const createdEmployee = await this.prisma.employee.create({
      data: {
        ...clearDto,
        rank: { connect: { id: rank_id } },
        employee_allowed_posts: {
          create: (allowed_post_ids || []).map((postId) => ({
            post: {
              connect: { id: Number(postId) },
            },
          })),
        },
      },
    });
    return createdEmployee;
  }

  async deleteEmployee(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employee_id },
    });
    if (!employee)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    await this.prisma.employee.delete({ where: { id: employee_id } });
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.id },
      include: {
        employee_allowed_posts: {
          include: {
            post: true,
          },
        },
      },
    });
    if (!employee)
      throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);

    const employee_with_same_barcode = await this.prisma.employee.findUnique({
      where: { barcode: dto.barcode },
    });

    if (
      employee_with_same_barcode &&
      employee_with_same_barcode.id !== employee.id
    )
      throw new HttpException(
        "Уже существует сотрудник с таким штрихкодом",
        HttpStatus.BAD_REQUEST,
      );
    const rank = await this.prisma.rank.findUnique({
      where: { id: dto.rank_id },
    });
    if (!rank)
      throw new HttpException("Разряд не найден", HttpStatus.NOT_FOUND);

    const currentAllowedPostIds = employee.employee_allowed_posts.map(
      (ap) => ap.post.id,
    );
    const idsToAdd = dto.allowed_post_ids.filter(
      (id) => !currentAllowedPostIds.includes(id),
    );
    const idsToRemove = currentAllowedPostIds.filter(
      (id) => !dto.allowed_post_ids.includes(id),
    );

    const updateEmployee = await this.prisma.employee.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        barcode: dto.barcode,
        rank_id: dto.rank_id,
        banned: employee.banned,
        employee_allowed_posts: {
          deleteMany: {
            post_id: { in: idsToRemove },
          },
          create: idsToAdd.map((id) => ({
            post: { connect: { id } },
          })),
        },
      },
    });
    return updateEmployee;
  }
}
