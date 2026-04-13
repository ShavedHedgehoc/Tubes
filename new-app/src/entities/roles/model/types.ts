export type RoleEntity = {
  id: number;
  value: string;
  description: string;
};
export type RolesResponce = {
  roles: RoleEntity[] | [];
};
