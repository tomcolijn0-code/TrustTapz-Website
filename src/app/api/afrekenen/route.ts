import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.items?.length) {
    return NextResponse.json({ error: "Ontbrekende gegevens" }, { status: 400 });
  }

  console.log("[afrekenen]", body);
  return NextResponse.json({ ok: true });
}
