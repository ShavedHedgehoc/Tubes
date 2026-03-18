import { proxyApiClient } from "@/shared/api";

export const uploadFile = async (formData: FormData) => {
    await proxyApiClient.post("/upload/file", formData)
}
