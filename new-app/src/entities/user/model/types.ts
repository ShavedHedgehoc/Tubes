type RoleEntity = {
  id: number;
  value: string;
  description: string;
};

export type UserEntity = {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  banned: boolean;
  roles: RoleEntity[];
};

export type UserResponse = {
  users: UserEntity[];
  total: number;
  totalPages: number;
};

export type LabAssistantRow = Omit<
  UserEntity,
  "email" | "avatar_url" | "banned" | "roles"
>;

export type LabAssistantResponse = {
  labAssistants: LabAssistantRow[];
};
