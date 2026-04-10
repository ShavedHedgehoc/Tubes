import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { RegisterDto } from "src/auth/dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "Register new user" })
  @Post("/register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: "Login" })
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Login" })
  @Post("/refresh")
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }

  @Post("/logout")
  @HttpCode(200)
  async logout(@Body("refreshToken") refreshToken: string) {
    if (refreshToken) {
      await this.authService.removeToken(refreshToken);
    }
    return { success: true };
  }
}
