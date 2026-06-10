import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      voornaam, achternaam, email, telefoon,
      straat, huisnummer, postcode, plaats, land,
      reviewUrl, items, subtotaal, verzending, totaal,
    } = body;

    if (!email || !items?.length) {
      return NextResponse.json({ error: "Ontbrekende gegevens" }, { status: 400 });
    }

    const itemsHtml = items
      .map(
        (item: { naam: string; aantal: number; prijs: number }) => `
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#374151">${item.naam}</td>
          <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:center">${item.aantal} st</td>
          <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:right">
            €${item.prijs.toFixed(2).replace(".", ",")}
          </td>
        </tr>`
      )
      .join("");

    const formatBedrag = (n: number) => `€${n.toFixed(2).replace(".", ",")}`;

    /* ── Bevestiging aan klant ── */
    await resend.emails.send({
      from: "TrustTapz <hallo@trusttapz.nl>",
      to: email,
      subject: "Bevestiging van je TrustTapz bestelling",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:28px 32px;border-radius:12px 12px 0 0">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Bedankt voor je bestelling!</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px">We zijn je kaarten aan het klaarmaken.</p>
          </div>
          <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="font-size:14px;color:#374151">Hoi ${voornaam},</p>
            <p style="font-size:14px;color:#374151">We hebben je bestelling ontvangen en programmeren je NFC-kaarten op de door jou opgegeven Google Review link. Levering binnen <strong>3 werkdagen</strong>.</p>

            <h3 style="font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 8px">Jouw bestelling</h3>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid #f3f4f6">
              ${itemsHtml}
            </table>
            <div style="border-top:1px solid #f3f4f6;margin-top:8px;padding-top:12px">
              <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:4px">
                <span>Subtotaal</span><span>${formatBedrag(subtotaal)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:8px">
                <span>Verzendkosten</span>
                <span style="color:${verzending === 0 ? "#1d4ed8" : "#374151"}">${verzending === 0 ? "Gratis" : formatBedrag(verzending)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:#111827">
                <span>Totaal</span><span style="color:#1d4ed8">${formatBedrag(totaal)}</span>
              </div>
            </div>

            <h3 style="font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:24px 0 8px">Bezorgadres</h3>
            <p style="font-size:13px;color:#374151;margin:0">${straat} ${huisnummer}<br>${postcode} ${plaats}<br>${land}</p>

            <p style="font-size:13px;color:#9ca3af;margin-top:24px">Vragen? Mail ons op <a href="mailto:hallo@trusttapz.nl" style="color:#1d4ed8">hallo@trusttapz.nl</a></p>
          </div>
        </div>`,
    });

    /* ── Interne notificatie ── */
    await resend.emails.send({
      from: "TrustTapz <hallo@trusttapz.nl>",
      to: "hallo@trusttapz.nl",
      replyTo: email,
      subject: `Nieuwe bestelling van ${voornaam} ${achternaam}, ${formatBedrag(totaal)}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#111827">Nieuwe bestelling 🎉</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:120px">Naam</td>
                <td style="padding:4px 0;color:#111827;font-size:13px;font-weight:600">${voornaam} ${achternaam}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;font-size:13px">E-mail</td>
                <td style="padding:4px 0;font-size:13px"><a href="mailto:${email}" style="color:#1d4ed8">${email}</a></td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;font-size:13px">Telefoon</td>
                <td style="padding:4px 0;color:#111827;font-size:13px">${telefoon}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;font-size:13px">Adres</td>
                <td style="padding:4px 0;color:#111827;font-size:13px">${straat} ${huisnummer}, ${postcode} ${plaats}, ${land}</td></tr>
            <tr><td style="padding:4px 0;color:#6b7280;font-size:13px">Review URL</td>
                <td style="padding:4px 0;font-size:13px"><a href="${reviewUrl}" style="color:#1d4ed8">${reviewUrl}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <h3 style="color:#111827;font-size:14px">Producten</h3>
          <table style="width:100%;border-collapse:collapse">
            ${itemsHtml}
          </table>
          <div style="margin-top:12px;font-size:15px;font-weight:700;color:#1d4ed8">
            Totaal: ${formatBedrag(totaal)}${verzending === 0 ? " (incl. gratis verzending)" : ""}
          </div>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[afrekenen] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
