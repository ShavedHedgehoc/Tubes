import * as z from "zod";
import { JSONSchemaType } from "ajv";
import { SummaryUploadDataRow } from "./types";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

export const uploadSummariesFormSchema = z.object({
  date: z.date("Необходимо выбрать дату"),
  file: z
    .instanceof(File, { message: "Необходимо выбрать файл" })
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, `Max file size is 3MB.`)
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Only .png and .jpeg formats are accepted."),
});

export type UploadSummariesFormValues = z.infer<
  typeof uploadSummariesFormSchema
>;

export const summaryValidationSchema: JSONSchemaType<SummaryUploadDataRow> = {
  type: "object",
  properties: {
    code1C: {
      type: "string",
      pattern: "^[0-9]{6}$",
      errorMessage: { pattern: "Код 1С должен быть шестизначным числом" },
    },
    product_marking: {
      type: "string",
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: "Артикул должен содержать хотя бы один символ",
        maxLength: "Длина артикула не должна быть больше 50 символов",
        type: "",
      },
    },
    product_name: {
      type: "string",
      minLength: 1,
      maxLength: 200,
      errorMessage: {
        minLength: "Наименование должно содержать хотя бы один символ",
        maxLength: "Длина наименования не должна быть больше 200 символов",
        type: "",
      },
    },
    batch: {
      type: "string",
      pattern: "^[1-9]{1}[0-9]{1,3}[A-L]{1}\\d{1}[R,S,Z,X]{0,1}$",
      errorMessage: { pattern: "Шаблон партии не совпадает" },
    },
    plan: {
      type: "string",
      pattern: "^(?:[1-9]\\d{0,5})$",
      errorMessage: {
        pattern: "План должен быть целым числом от 1 до 999 999",
      },
    },
    conveyor: {
      type: "string",
      pattern: "^(?:[1-9]\\d{1,2})$",
      errorMessage: {
        pattern: "Номер конвейера должен быть целым трехзначным  числом",
      },
    },
    specification: {
      type: "string",
      pattern: "^([{]{1}\\d{6}#[^#{}]+#[1-4]{1}[}]{1})+$",
      errorMessage: {
        pattern:
          "Шаблон спецификации '{<Код (6 цифр)>#<Наименование>#<Номер поста (1-4)>}' не совпадает",
      },
    },
    shift: {
      type: "string",
      enum: ["day", "night"],
      pattern: "^\\bday|night\\b$",
      errorMessage: {
        pattern: "В столбце shift возможны только значения `day` или `night`",
      },
    },
  },
  required: [
    "code1C",
    "product_marking",
    "product_name",
    "batch",
    "plan",
    "conveyor",
    "specification",
    "shift",
  ],
};
