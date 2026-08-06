// Sends the customer a confirmation email for their Order Portal (RFQ)
// submission, listing everything they entered plus their reference number.
// Invoked from the client right after the row is inserted into
// rfq_submissions (see OrderPortalSection.tsx).
import { corsHeaders } from '../_shared/cors.ts';

type RfqPayload = {
  reference: string;
  products: string[];
  volume: string;
  incoterm: string;
  port: string;
  company: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

function renderEmailHtml(data: RfqPayload): string {
  const rows: [string, string][] = [
    ['Products', data.products.join(', ') || 'N/A'],
    ['Volume Range', data.volume || 'N/A'],
    ['Incoterm', data.incoterm || 'N/A'],
    ['Destination Port', data.port || 'N/A'],
    ['Company', data.company || 'N/A'],
    ['Country', data.country || 'N/A'],
    ['Contact Name', data.contactName || 'N/A'],
    ['Email', data.email || 'N/A'],
    ['Phone / WhatsApp', data.phone || 'N/A'],
    ['Notes', data.notes || 'N/A'],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e0dbd2;color:#8a8a82;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e0dbd2;color:#1a1a18;font-size:13px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#fafaf8;padding:32px 20px;">
      <div style="background:#1c3d2d;border-radius:8px 8px 0 0;padding:24px 28px;">
        <p style="margin:0;color:#e0b055;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">AvantSpecs</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;">Your enquiry has been received</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #e0dbd2;border-top:none;padding:24px 28px;">
        <p style="margin:0 0 16px;color:#4a4a44;font-size:14px;line-height:1.6;">
          Thank you for your request for quote. Our trade desk will respond within 48 hours.
          Please quote the reference number below in any follow-up communication.
        </p>
        <div style="background:#fdf5e4;border:2px solid #c9943e;border-radius:6px;padding:16px 20px;text-align:center;margin-bottom:20px;">
          <p style="margin:0;color:#8a8a82;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Your Reference Number</p>
          <p style="margin:6px 0 0;color:#1c3d2d;font-size:22px;font-weight:bold;font-family:'Courier New',monospace;">${escapeHtml(data.reference)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e0dbd2;border-radius:6px;overflow:hidden;">
          ${rowsHtml}
        </table>
        <p style="margin:20px 0 0;color:#8a8a82;font-size:12px;line-height:1.6;">
          AvantSpecs &middot; Rohtak, India &middot; param@avantspecs.com &middot; aadi.singh@avantspecs.com
        </p>
      </div>
    </div>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RfqPayload = await req.json();

    if (!data.email || !data.email.includes('@')) {
      return new Response(JSON.stringify({ error: 'A valid email is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: Deno.env.get('RESEND_FROM_EMAIL') || 'AvantSpecs <onboarding@resend.dev>',
        to: [data.email],
        subject: `Your AvantSpecs enquiry: ${data.reference}`,
        html: renderEmailHtml(data),
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      return new Response(JSON.stringify({ error: `Email send failed: ${errText}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
