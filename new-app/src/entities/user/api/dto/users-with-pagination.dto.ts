import { UserDto } from "./user.dto"

export type UsersWithPaginationDto = {
    users: UserDto[]
    total: number
}