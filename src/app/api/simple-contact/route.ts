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
        from: 'Osityz <onboarding@resend.dev>',
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
        from: 'Osityz Contact Form <onboarding@resend.dev>',
        to: 'info@osityz.com',
        replyTo: email,
        subject: `New contact form submission from ${firstName} ${lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f1f5f9; margin: 0; padding: 24px; }
            .wrap { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: #0f172a; padding: 24px 32px; }
            .header h1 { color: #fff; font-size: 18px; font-weight: 600; margin: 0; }
            .header p { color: #64748b; font-size: 13px; margin: 4px 0 0; }
            .body { padding: 32px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; }
            .card-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
            .card-row:last-child { border-bottom: none; }
            .card-label { font-weight: 600; color: #64748b; width: 110px; flex-shrink: 0; }
            .card-value { color: #0f172a; flex: 1; }
            .reply-btn { display: inline-block; margin-top: 24px; background: linear-gradient(135deg, #2563eb, #7c3aed); color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; }
          </style>
          </head>
          <body>
            <div class="wrap">
              <div class="header">
                <h1>New Contact Form Submission</h1>
                <p>${submittedAt} ET</p>
              </div>
              <div class="body">
                <div class="card">
                  <div class="card-row"><span class="card-label">Name</span><span class="card-value">${firstName} ${lastName}</span></div>
                  ${companyName ? `<div class="card-row"><span class="card-label">Company</span><span class="card-value">${companyName}</span></div>` : ''}
                  <div class="card-row"><span class="card-label">Email</span><span class="card-value"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></span></div>
                  <div class="card-row"><span class="card-label">Message</span><span class="card-value">${message}</span></div>
                </div>
                <a href="mailto:${email}?subject=Re: Your Osityz enquiry" class="reply-btn">Reply to ${firstName}</a>
              </div>
            </div>
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
