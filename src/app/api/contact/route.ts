import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { naam, email, bericht } = await req.json();

  if (!naam || !email || !bericht) {
    return NextResponse.json({ error: "Ontbrekende velden" }, { status: 400 });
  }

  console.log("[contact]", { naam, email, bericht });
  return NextResponse.json({ ok: true });
}
