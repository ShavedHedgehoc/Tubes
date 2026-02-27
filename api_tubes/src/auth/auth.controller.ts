import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register new user" })
  @Post("/register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
