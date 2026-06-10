import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { bestellenSchema, PRIJZEN } from "@/lib/bestellenSchema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = bestellenSchema.parse(body);

    const prijs = PRIJZEN[data.aantalKaarten];
    const totaal = prijs.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });

    await resend.emails.send({
      from: "TrustTapz <bestellingen@trusttapz.nl>",
      to: data.email,
      subject: `Bevestiging bestelling TrustTapz, ${data.aantalKaarten} kaart${data.aantalKaarten > 1 ? "en" : ""}`,
      html: `
        <div style="font-family:'DM Sans',Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:32px 40px;border-radius:16px 16px 0 0">
            <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800">TrustTapz</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;letter-spacing:2px;text-transform:uppercase">Één tik. Meer klanten.</p>
          </div>
          <div style="background:#fff;padding:36px 40px;border:1px solid #bfdbfe;border-top:none;border-radius:0 0 16px 16px">
            <h2 style="margin:0 0 8px;font-size:20px;font-weight:800">Bedankt voor je bestelling, ${data.contactpersoon.split(" ")[0]}!</h2>
            <p style="color:#6b7280;margin:0 0 28px;font-size:15px">We hebben je bestelling ontvangen en gaan direct aan de slag. Je ontvangt je TrustTapz-kaart${data.aantalKaarten > 1 ? "en" : ""} binnen 3 werkdagen.</p>

            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:24px;margin-bottom:28px">
              <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1d4ed8">Jouw bestelling</h3>
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:5px 0;color:#6b7280">Bedrijf</td><td style="padding:5px 0;font-weight:600;text-align:right">${data.bedrijfsnaam}</td></tr>
                <tr><td style="padding:5px 0;color:#6b7280">Contactpersoon</td><td style="padding:5px 0;font-weight:600;text-align:right">${data.contactpersoon}</td></tr>
                <tr><td style="padding:5px 0;color:#6b7280">Aantal kaarten</td><td style="padding:5px 0;font-weight:600;text-align:right">${data.aantalKaarten}×</td></tr>
                <tr style="border-top:1px solid #bfdbfe">
                  <td style="padding:14px 0 5px;font-weight:700">Totaal (incl. gratis verzending)</td>
                  <td style="padding:14px 0 5px;font-weight:800;font-size:18px;text-align:right;color:#1d4ed8">${totaal}</td>
                </tr>
              </table>
            </div>

            <p style="font-size:14px;color:#6b7280;margin:0">Vragen? Stuur een e-mail naar <a href="mailto:hallo@trusttapz.nl" style="color:#2563eb;font-weight:600">hallo@trusttapz.nl</a></p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "TrustTapz Bestellingen <bestellingen@trusttapz.nl>",
      to: "hallo@trusttapz.nl",
      subject: `Nieuwe bestelling: ${data.bedrijfsnaam}, ${data.aantalKaarten}× kaart`,
      html: `
        <h2>Nieuwe bestelling</h2>
        <p><strong>Bedrijf:</strong> ${data.bedrijfsnaam}</p>
        <p><strong>Contactpersoon:</strong> ${data.contactpersoon}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefoon:</strong> ${data.telefoon}</p>
        <p><strong>Google Maps URL:</strong> <a href="${data.googleMapsUrl}">${data.googleMapsUrl}</a></p>
        <p><strong>Aantal kaarten:</strong> ${data.aantalKaarten}×</p>
        <p><strong>Totaal:</strong> ${totaal}</p>
        ${data.opmerking ? `<p><strong>Opmerking:</strong> ${data.opmerking}</p>` : ""}
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Er is iets misgegaan." }, { status: 500 });
  }
}
