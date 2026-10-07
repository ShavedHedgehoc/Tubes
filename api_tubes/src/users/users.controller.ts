import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { GetUsersListDto } from "./dto/get-users-list.dto";
import { UpdateRolesDto } from "./dto/update-roles.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "Получить список пользователей с параметрами" })
  @Get()
  getUsersList(
    @Query(new ValidationPipe({ transform: true })) query: GetUsersListDto,
  ) {
    return this.userService.getUsersList(query);
  }

  @ApiOperation({ summary: "Получить сотрудника по id" })
  @Get("/by_id/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  getEmployeeById(@Param() params: GetUserDto) {
    return this.userService.getUserById(params.id);
  }

  @ApiOperation({ summary: "Обновление данных пользователя" })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  @Patch()
  updateUser(
    @Body(new ValidationPipe({ transform: true })) userDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userDto);
  }

  @ApiOperation({ summary: "Поменять статус бана пользователя по id" })
  @ApiResponse({ status: 201 })
  @Patch("change_banned/:id")
  changeUserBannedStatus(@Param("id") id: string) {
    return this.userService.changeBannedStatus(Number(id));
  }

  @ApiOperation({ summary: "Сброс пароля пользователя по id" })
  @ApiResponse({ status: 201 })
  @Patch("reset/:id")
  resetPassword(@Param("id") id: string) {
    return this.userService.resetPassword(Number(id));
  }

  @ApiOperation({ summary: "Обновить роли пользователя" })
  @ApiResponse({ status: 201 })
  @Post("/update_roles")
  updateUserRoles(@Body() dto: UpdateRolesDto) {
    return this.userService.updateUserRoles(dto);
  }

  @ApiOperation({ summary: "Удалить сотрудника" })
  @Delete("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteEmployee(@Param() params: DeleteUserDto) {
    return this.userService.deleteUser(params.id);
  }
}
