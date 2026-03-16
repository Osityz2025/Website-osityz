import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: 'Missing Supabase configuration' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();

    const { firstName, lastName, email, companyName, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email,
        company_name: companyName || '',
        phone: '',
        location: '',
        message,
      }]);

    if (dbError) {
      console.error('DB insert error:', dbError);
      return NextResponse.json({ success: false, error: 'Database error', details: dbError }, { status: 500 });
    }

    // Send emails via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      const resend = new Resend(resendApiKey);
      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/Toronto',
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });

      // 1. Confirmation email to the person who submitted
      await resend.emails.send({
        from: 'Osityz <noreply@osityz.com>',
        to: email,
        replyTo: 'info@osityz.com',
        subject: `We received your message, ${firstName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
            .wrap { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 40px 32px; text-align: center; }
            .header h1 { color: #fff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
            .body { padding: 40px 32px; }
            .body h2 { font-size: 22px; font-weight: 600; margin: 0 0 12px; color: #0f172a; }
            .body p { color: #475569; line-height: 1.7; margin: 0 0 20px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
            .card-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .card-row:last-child { border-bottom: none; }
            .card-label { font-weight: 600; color: #64748b; width: 110px; flex-shrink: 0; }
            .card-value { color: #0f172a; flex: 1; }
            .footer { background: #0f172a; padding: 24px 32px; text-align: center; }
            .footer p { color: #64748b; font-size: 13px; margin: 4px 0; }
            .footer a { color: #3b82f6; text-decoration: none; }
          </style>
          </head>
          <body>
            <div class="wrap">
              <div class="header">
                <h1>Osityz</h1>
                <p>Maritime AI Platform</p>
              </div>
              <div class="body">
                <h2>Thanks for reaching out, ${firstName}!</h2>
                <p>We've received your message and will get back to you within <strong>24 hours</strong>. Here's a summary of what you sent:</p>
                <div class="card">
                  <div class="card-row"><span class="card-label">Name</span><span class="card-value">${firstName} ${lastName}</span></div>
                  ${companyName ? `<div class="card-row"><span class="card-label">Company</span><span class="card-value">${companyName}</span></div>` : ''}
                  <div class="card-row"><span class="card-label">Email</span><span class="card-value">${email}</span></div>
                  <div class="card-row"><span class="card-label">Message</span><span class="card-value">${message}</span></div>
                  <div class="card-row"><span class="card-label">Sent</span><span class="card-value">${submittedAt} ET</span></div>
                </div>
                <p>In the meantime, feel free to email us directly at <a href="mailto:info@osityz.com" style="color:#2563eb;font-weight:600;">info@osityz.com</a>.</p>
                <p style="margin:0;">Best regards,<br><strong>The Osityz Team</strong></p>
              </div>
              <div class="footer">
                <p><strong style="color:#fff;">Osityz</strong></p>
                <p>Toronto, Ontario, Canada</p>
                <p><a href="mailto:info@osityz.com">info@osityz.com</a></p>
              </div>
            </div>
          </body>
          </html>
        `,
      }).catch((err) => console.error('Confirmation email failed:', err));

      // 2. Internal notification to Osityz team
      await resend.emails.send({
        from: 'Osityz Contact Form <noreply@osityz.com>',
        to: 'info@osityz.com',
        replyTo: email,
        subject: `New enquiry from ${firstName} ${lastName}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
          <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
              <tr><td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">

                  <!-- HEADER -->
                  <tr>
                    <td style="background:#0f172a;border-radius:12px 12px 0 0;padding:24px 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#475569;">Osityz</p>
                            <h1 style="margin:6px 0 0;font-size:18px;font-weight:600;color:#ffffff;">New Contact Enquiry</h1>
                          </td>
                          <td align="right" style="vertical-align:top;">
                            <p style="margin:0;font-size:12px;color:#64748b;white-space:nowrap;">${submittedAt} ET</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="background:#ffffff;padding:32px;">

                      <!-- NAME + COMPANY -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="padding-bottom:4px;">
                            <p style="margin:0;font-size:22px;font-weight:700;color:#0f172a;">${firstName} ${lastName}</p>
                            ${companyName ? `<p style="margin:4px 0 0;font-size:14px;color:#64748b;">${companyName}</p>` : ''}
                            <p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></p>
                          </td>
                        </tr>
                      </table>

                      <!-- DIVIDER -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr><td style="border-top:1px solid #e2e8f0;font-size:0;">&nbsp;</td></tr>
                      </table>

                      <!-- MESSAGE -->
                      <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;">Message</p>
                      <p style="margin:0 0 28px;font-size:15px;color:#334155;line-height:1.7;background:#f8fafc;border-left:3px solid #3b82f6;padding:16px 20px;border-radius:0 6px 6px 0;">${message}</p>

                      <!-- REPLY BUTTON -->
                      <a href="mailto:${email}?subject=Re: Your Osityz enquiry" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">Reply to ${firstName}</a>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#94a3b8;">This notification was sent to info@osityz.com · <a href="https://osityz.com" style="color:#94a3b8;text-decoration:none;">osityz.com</a></p>
                    </td>
                  </tr>

                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      }).catch((err) => console.error('Internal notification failed:', err));
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Server error',
    }, { status: 500 });
  }
}
