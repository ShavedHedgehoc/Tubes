import { Controller, Get } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiOperation({ summary: "Получить роли" })
  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }
}
