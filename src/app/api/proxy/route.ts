import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const levelUrl = url.searchParams.get("level");

  if (!levelUrl) {
    return NextResponse.json({ error: "Missing level URL" }, { status: 400 });
  }

  try {
    const response = await fetch(levelUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
