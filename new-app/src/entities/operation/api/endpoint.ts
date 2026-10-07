export const OPERATION_ENDPOINTS = {
  LIST: "/operations",
  CHANGE_BANNED: "/operations/change_banned",
  CREATE_PICTURE_RECORD: "/operation-picture",
  DELETE_PICTURE_RECORD: "/operation-picture",
  GET_EXISTING_PICTURES: "/operation-picture/exists_pictures/",
} as const;
