import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

function getLogoBase64(): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'osityz-logo.jpeg');
    const data = fs.readFileSync(logoPath);
    return `data:image/jpeg;base64,${data.toString('base64')}`;
  } catch {
    return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: 'Missing Supabase configuration' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Check for duplicate
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existing) {
      return NextResponse.json({ success: false, duplicate: true });
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email }]);

    if (insertError) throw insertError;

    // Send confirmation email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      const resend = new Resend(resendApiKey);
      const logoSrc = getLogoBase64();

      await resend.emails.send({
        from: 'Osityz <noreply@osityz.com>',
        to: email,
        replyTo: 'info@osityz.com',
        subject: "You're on the Osityz waitlist",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
          </head>
          <body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

                    <!-- LOGO -->
                    <tr>
                      <td align="center" style="padding:32px 40px 24px;">
                        ${logoSrc ? `<img src="${logoSrc}" alt="Osityz" width="120" style="display:block;border-radius:6px;" />` : '<span style="font-size:20px;font-weight:700;color:#0f172a;">Osityz</span>'}
                      </td>
                    </tr>

                    <!-- DIVIDER -->
                    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" /></td></tr>

                    <!-- BODY -->
                    <tr>
                      <td style="padding:32px 40px;">

                        <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#0f172a;">You're on the waitlist</h2>

                        <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
                          Thanks for signing up. We've added you to the Osityz waitlist and you'll be among the first to know when we launch.
                        </p>

                        <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.7;">
                          We're building a maritime AI platform for shipbrokers, charterers, traders, and operators — rebuilding workflows for speed and clarity.
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-left:3px solid #3b82f6;border-radius:0 6px 6px 0;margin:0 0 28px;">
                          <tr>
                            <td style="padding:16px 20px;">
                              <p style="margin:0 0 8px;font-size:14px;color:#334155;line-height:1.6;">What to expect:</p>
                              <p style="margin:0 0 4px;font-size:14px;color:#475569;">· Early access before public launch</p>
                              <p style="margin:0 0 4px;font-size:14px;color:#475569;">· Product updates and feature previews</p>
                              <p style="margin:0;font-size:14px;color:#475569;">· No spam — only what matters</p>
                            </td>
                          </tr>
                        </table>

                        <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.7;">
                          Questions? Reply to this email or reach us at <a href="mailto:info@osityz.com" style="color:#2563eb;text-decoration:none;font-weight:500;">info@osityz.com</a>.
                        </p>

                        <p style="margin:0;font-size:15px;color:#0f172a;">
                          The Osityz Team
                        </p>

                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                        <p style="margin:0;font-size:12px;color:#94a3b8;">
                          Osityz · Toronto, Ontario, Canada<br>
                          You received this because you joined the waitlist at <a href="https://osityz.com" style="color:#94a3b8;">osityz.com</a>.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        text: `
You're on the Osityz waitlist!

Thanks for signing up — you'll hear from us first.

We're building Osityz — a maritime AI platform designed to rebuild how shipbrokers, charterers, traders, and operators work.

What you'll get:
→ Early access before public launch
→ Product updates & feature previews
→ No spam — only what matters

Have questions? Reach us at info@osityz.com

— The Osityz Team
Toronto, Ontario, Canada
osityz.com
        `,
      }).catch((err) => console.error('Waitlist confirmation email failed:', err));
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Waitlist API error:', error);
    const message =
      error instanceof Error
        ? error.message
        : (typeof error === 'object' && error !== null && 'message' in error)
          ? String((error as { message: unknown }).message)
          : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
