import { externalApiUrl } from "@/shared/api/config";
import { NextRequest, NextResponse } from "next/server";

interface BackendError {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>; // для ошибок валидации
}

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

async function handleProxy(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string,
) {
  try {
    const { path: pathArray } = await params;
    if (!pathArray)
      return NextResponse.json({ error: "Path is required" }, { status: 400 });

    const path = pathArray.join("/");
    const { searchParams } = new URL(request.url);

    // Формируем безопасный URL
    const base = externalApiUrl?.endsWith("/")
      ? externalApiUrl
      : `${externalApiUrl}/`;
    const targetUrl = new URL(path.replace(/^\//, ""), base); // убираем ведущий слеш если есть
    targetUrl.search = searchParams.toString();

    // const headers = new Headers(request.headers);
    // headers.delete("host");

    // const hasBody = ["POST", "PATCH", "PUT"].includes(method);
    // const body = hasBody ? await request.text() : undefined;

    // console.log(`[PROXY ${method}]:`, targetUrl.toString());



    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");

    // 2. Определяем, как читать тело запроса
    let body: any = null;
    const contentType = request.headers.get("content-type") || "";

    if (["POST", "PATCH", "PUT"].includes(method)) {
      if (contentType.includes("multipart/form-data")) {
        // Для файлов: берем бинарные данные (ArrayBuffer)
        // Это самый надежный способ пробросить файл через Next.js прокси
        body = await request.arrayBuffer();
      } else if (contentType.includes("application/json")) {
        // Для обычного JSON: берем текст (или тоже arrayBuffer)
        body = await request.text();
      } else {
        // На случай других типов (текст, blob)
        body = await request.arrayBuffer();
      }
    }
    const response = await fetch(targetUrl.toString(), {
      method,
      // headers: { "Content-Type": "application/json" },
      headers,
      body,
    });
    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => ({}))) as BackendError;
      const errorMessage =
        errorData.message || errorData.detail || "Произошла ошибка на сервере";
      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: response.status },
      );
    }
    // const contentType = response.headers.get("content-type");
    const responseContentType = response.headers.get("content-type") || "";
    const isJson = responseContentType && responseContentType.includes("application/json");

    if (response.status === 204 || !isJson) {
      return new NextResponse(null, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const GET = (req: NextRequest, ctx: RouteContext) =>
  handleProxy(req, ctx.params, "GET");
export const POST = (req: NextRequest, ctx: RouteContext) =>
  handleProxy(req, ctx.params, "POST");
export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  handleProxy(req, ctx.params, "DELETE");
export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  handleProxy(req, ctx.params, "PATCH");

