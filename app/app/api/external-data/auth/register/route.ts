import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const externalApiUrl = process.env.API_URL;

  const url = `${externalApiUrl}/auth/register`;

  try {
    const body = await request.json();
    return NextResponse.json(
      {
        message: "Data submitted successfully",
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error fetching external data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
