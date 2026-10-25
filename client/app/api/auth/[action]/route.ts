import { NextResponse } from "next/server";

const authActions = new Set(["login", "signin"]);

export async function POST(
  request: Request,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;
  if (!authActions.has(action)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const apiUrl = process.env.AUTH_API_URL ?? "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text(),
      cache: "no-store",
    });
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Authentication service is unavailable. Please try again." },
      { status: 502 },
    );
  }
}
