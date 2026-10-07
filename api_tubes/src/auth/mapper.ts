import { Prisma } from "db";

export type UserWithRoles = Prisma.UserGetPayload<{
  include: { user_roles: { include: { role: true } } };
}>;

export interface IUserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  // settings: IUserSettings;
}

export const toRegisteredUserData = (user: UserWithRoles): IUserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.user_roles.map((ur) => ur.role.value ?? ""),
    // settings: user.user_settings,
  };
};
