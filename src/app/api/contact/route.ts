import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { naam, email, bericht } = await req.json();

    if (!naam || !email || !bericht) {
      return NextResponse.json({ error: "Ontbrekende velden" }, { status: 400 });
    }

    await resend.emails.send({
      from: "TrustTapz <hallo@trusttapz.nl>",
      to: "hallo@trusttapz.nl",
      replyTo: email,
      subject: `Nieuw contactbericht van ${naam}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#111827">Nieuw contactbericht via de website</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px">Naam</td>
              <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:600">${naam}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px">E-mail</td>
              <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:600">
                <a href="mailto:${email}" style="color:#1d4ed8">${email}</a>
              </td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <h3 style="color:#111827;font-size:14px;margin-bottom:8px">Bericht</h3>
          <p style="color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap">${bericht}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] mail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
