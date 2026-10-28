export const USER_ENDPOINTS = {
  LIST: "/users",
  LAB_ASSISTANTS_LIST: "/users/lab_assistants",
  UPDATE: "/users",
  DELETE: "/users",
  UPDATE_ROLES: "/users/update_roles",
  CHANGE_BANNED: "/users/change_banned",
  RESET: "/users/reset",
  DETAIL: "/users/by_id/",
} as const;
