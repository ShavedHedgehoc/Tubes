type RoleDto = {
    id: number
    value: string
    description: string
}

export type UserDto = {
    id: number,
    name: string
    email: string
    avatar_url: string | null
    banned: boolean
    roles: RoleDto[]
};
