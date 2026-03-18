import * as z from "zod";


const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const uploadFileFormSchema = z.object({
    file: z
        .instanceof(File, { message: "Необходимо выбрать файл" })
        .refine((file) => {
            return file.size <= MAX_UPLOAD_SIZE;
        }, `Max file size is 3MB.`)
        .refine((file) => {
            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "Only .png and .jpeg formats are accepted."),
});

export type UploadFileFormValues = z.infer<
    typeof uploadFileFormSchema
>;

