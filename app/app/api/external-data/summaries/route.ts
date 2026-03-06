import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const externalApiUrl = process.env.API_URL;

  const url = `${externalApiUrl}/summaries`;
  const { searchParams } = new URL(request.url);

  const targetParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    const cleanValue = value.replace(/["']/g, "");
    targetParams.append(key, cleanValue);
  });

  try {
    const response = await fetch(`${url}?${targetParams.toString()}`, {
      headers: {
        // Add any necessary headers for the external API, e.g., an API key
        // Authorization: `Bearer YOUR_API_KEY`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`External API call failed: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    // console.error("Error fetching external data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
