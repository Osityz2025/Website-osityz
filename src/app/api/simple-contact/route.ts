import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Simple Contact Submission ===');
    
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing Supabase configuration'
      }, { status: 500 });
    }

    // Create client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the request body
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Prepare data for insertion
    const submissionData = {
      first_name: body.firstName || '',
      last_name: body.lastName || '',
      company_name: body.companyName || '',
      phone: body.phone || '',
      email: body.email || '',
      location: body.location || '',
      message: body.message || ''
    };

    console.log('Prepared submission data:', submissionData);

    // Direct insert without any connection testing
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Insert failed:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Database insertion failed',
        details: error 
      }, { status: 500 });
    }

    console.log('Insert successful:', data);

    // Send confirmation email
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
        console.log('Sending confirmation email...');
        
        const resend = new Resend(resendApiKey);
        
        // Clean, modern email design
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                margin: 0; 
                padding: 20px;
                background: #f8fafc; 
                color: #334155;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); 
                padding: 48px 32px; 
                text-align: center;
              }
              .company-name { 
                color: white;
                font-size: 48px; 
                font-weight: 800; 
                margin: 0 0 16px 0;
                letter-spacing: -1px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .tagline { 
                color: rgba(255, 255, 255, 0.95);
                font-size: 20px; 
                margin: 0;
                font-weight: 500;
                letter-spacing: 0.25px;
              }
              .content { 
                padding: 48px 32px;
              }
              .greeting { 
                font-size: 28px; 
                color: #111827; 
                margin: 0 0 24px 0;
                font-weight: 600;
              }
              .intro-text { 
                font-size: 18px; 
                color: #4b5563; 
                margin: 0 0 32px 0;
                line-height: 1.6;
              }
              .highlight {
                color: #2563eb;
                font-weight: 600;
              }
              .card { 
                background: #f9fafb; 
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 24px; 
                margin: 32px 0;
              }
              .card-title { 
                font-size: 20px;
                font-weight: 600; 
                color: #111827; 
                margin: 0 0 16px 0;
              }
              .info-grid {
                display: grid;
                gap: 12px;
              }
              .info-row { 
                display: flex;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .info-label { 
                font-weight: 600; 
                color: #6b7280; 
                width: 120px; 
                flex-shrink: 0;
                font-size: 14px;
              }
              .info-value { 
                color: #111827; 
                flex: 1;
                font-size: 14px;
              }
              .footer-text {
                font-size: 16px;
                color: #4b5563;
                margin: 32px 0;
                line-height: 1.6;
              }
              .signature {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #e5e7eb;
              }
              .signature-text {
                color: #6b7280;
                font-size: 16px;
                line-height: 1.5;
              }
              .footer { 
                background: #111827;
                padding: 32px; 
                text-align: center;
              }
              .footer-company {
                color: white;
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 8px 0;
              }
              .footer-info {
                color: #9ca3af;
                font-size: 14px;
                margin: 0;
              }
              .contact-link {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 600;
              }
              .contact-link:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="company-name">Osityz</div>
                <div class="tagline">Maritime Technology</div>
              </div>
              
              <div class="content">
                <div class="greeting">Hello ${body.firstName}!</div>
                
                <div class="intro-text">
                  Thank you for contacting Osityz. We've received your message and our team will respond <span class="highlight">within 24 hours</span>.
                </div>
                
                <div class="card">
                  <div class="card-title">Your Message Details</div>
                  <div class="info-grid">
                    <div class="info-row">
                      <span class="info-label">Name</span>
                      <span class="info-value">${body.firstName} ${body.lastName}</span>
                    </div>
                    ${body.companyName ? `
                    <div class="info-row">
                      <span class="info-label">Company</span>
                      <span class="info-value">${body.companyName}</span>
                    </div>` : ''}
                    <div class="info-row">
                      <span class="info-label">Email</span>
                      <span class="info-value">${body.email}</span>
                    </div>
                    ${body.phone ? `
                    <div class="info-row">
                      <span class="info-label">Phone</span>
                      <span class="info-value">${body.phone}</span>
                    </div>` : ''}
                    ${body.location ? `
                    <div class="info-row">
                      <span class="info-label">Location</span>
                      <span class="info-value">${body.location}</span>
                    </div>` : ''}
                    ${body.message ? `
                    <div class="info-row">
                      <span class="info-label">Message</span>
                      <span class="info-value">${body.message}</span>
                    </div>` : ''}
                    <div class="info-row">
                      <span class="info-label">Submitted</span>
                      <span class="info-value">${new Date().toLocaleString('en-US', {
                        timeZone: 'America/Toronto',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <div class="footer-text">
                  If you have any urgent questions, feel free to reach out directly at 
                  <a href="mailto:info@osityz.com" class="contact-link">info@osityz.com</a>.
                </div>
                
                <div class="signature">
                  <div class="signature-text">
                    Best regards,<br>
                    <strong>The Osityz Team</strong>
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-company">Osityz Inc.</div>
                <div class="footer-info">
                  Toronto, Ontario, Canada<br>
                  info@osityz.com
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        // Use your verified domain once DNS is set up
        const fromEmail = 'Osityz Team <info@osityz.com>'; // Will work after domain verification
        // const fromEmail = 'Osityz Team <delivered@resend.dev>'; // Fallback for testing
        
        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: body.email,
          subject: `Thank you for contacting Osityz, ${body.firstName}!`,
          html: emailHtml,
          replyTo: 'info@osityz.com'
        });

        if (emailResult.error) {
          console.error('Email sending failed:', emailResult.error);
          console.error('Full error details:', JSON.stringify(emailResult.error, null, 2));
          // Don't fail the whole request if email fails
        } else {
          console.log('Email sent successfully to:', body.email);
          console.log('Email ID:', emailResult.data?.id);
        }
      } else {
        console.log('Resend API key not configured, skipping email');
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the whole request if email fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact submission successful!',
      data: data 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}