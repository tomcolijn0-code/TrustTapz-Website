import { NextRequest, NextResponse } from "next/server";
import { bestellenSchema } from "@/lib/bestellenSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bestellenSchema.parse(body);

    console.log("[bestellen]", data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Er is iets misgegaan." }, { status: 500 });
  }
}
