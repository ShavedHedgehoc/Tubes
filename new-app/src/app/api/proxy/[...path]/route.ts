import { externalApiUrl } from "@/shared/api/config";
import { NextRequest, NextResponse } from "next/server";

interface BackendError {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>; // для ошибок валидации
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }, // Добавляем Promise
) {
  try {
    const resolvedParams = await params;
    const pathArray = resolvedParams.path;

    if (!pathArray) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const path = pathArray.join("/");
    const { searchParams } = new URL(request.url);
    const backendBaseUrl = externalApiUrl;
    const targetUrl = new URL(path, backendBaseUrl);
    targetUrl.search = searchParams.toString();

    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': request.headers.get('Authorization') || '',
      },
    });
    console.log('FETCHING TO:', targetUrl.toString());

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }, // Добавляем Promise
) {
  try {
    const resolvedParams = await params;
    const pathArray = resolvedParams.path;

    if (!pathArray) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const path = pathArray.join("/");
    const { searchParams } = new URL(request.url);
    const backendBaseUrl = externalApiUrl;
    const targetUrl = new URL(path, backendBaseUrl);
    targetUrl.search = searchParams.toString();

    const response = await fetch(targetUrl.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': request.headers.get('Authorization') || '',
      },
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
    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }, // Добавляем Promise
) {
  try {
    const resolvedParams = await params;
    const pathArray = resolvedParams.path;

    if (!pathArray) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const body = await request.json();

    const path = pathArray.join("/");
    const { searchParams } = new URL(request.url);
    const backendBaseUrl = externalApiUrl;
    const targetUrl = new URL(path, backendBaseUrl);
    targetUrl.search = searchParams.toString();

    const response = await fetch(targetUrl.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body),
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
    return NextResponse.json({ status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: Promise<{ path: string[] }> }, // Добавляем Promise
// ) {
//   try {
//     const resolvedParams = await params;
//     const pathArray = resolvedParams.path;

//     if (!pathArray) {
//       return NextResponse.json({ error: "Path is required" }, { status: 400 });
//     }

//     const body = await request.json();

//     const path = pathArray.join("/");
//     const { searchParams } = new URL(request.url);
//     const backendBaseUrl = externalApiUrl;
//     const targetUrl = new URL(path, backendBaseUrl);
//     targetUrl.search = searchParams.toString();

//     const response = await fetch(targetUrl.toString(), {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': request.headers.get('Authorization') || '',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorData = (await response
//         .json()
//         .catch(() => ({}))) as BackendError;
//       const errorMessage =
//         errorData.message || errorData.detail || "Произошла ошибка на сервере";
//       return NextResponse.json(
//         { error: errorMessage, details: errorData },
//         { status: response.status },
//       );
//     }
//     return NextResponse.json({ status: response.status });
//   } catch (error) {
//     console.error("Proxy error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const resolvedParams = await params;
    const pathArray = resolvedParams.path;

    if (!pathArray) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const body = await request.json();
    const path = pathArray.join("/");
    const { searchParams } = new URL(request.url);
    const targetUrl = new URL(path, externalApiUrl);
    targetUrl.search = searchParams.toString();

    const response = await fetch(targetUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Передаем данные дальше
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
    const data = await response
      .json()
      .catch(() => ({ status: response.status }));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
