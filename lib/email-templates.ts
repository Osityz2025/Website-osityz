interface ContactSubmissionEmailProps {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  submissionDate: string;
}

export function createConfirmationEmail({
  firstName,
  lastName,
  companyName,
  phone,
  email,
  location,
  message,
  submissionDate
}: ContactSubmissionEmailProps) {
  return {
    subject: `Thank you for contacting Osityz, ${firstName}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Osityz</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .content { padding: 30px; }
          .greeting { font-size: 18px; color: #2d3748; margin-bottom: 20px; }
          .info-box { background: #f7fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
          .info-title { font-weight: bold; color: #2d3748; margin-bottom: 15px; font-size: 16px; }
          .info-item { margin: 8px 0; display: flex; }
          .info-label { font-weight: 600; color: #4a5568; width: 120px; }
          .info-value { color: #2d3748; flex: 1; }
          .footer { background: #2d3748; color: white; padding: 30px; text-align: center; }
          .next-steps { background: #e6fffa; border: 1px solid #38b2ac; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .cta { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚢 Osityz</div>
            <p>Maritime Technology Solutions</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hi ${firstName},
            </div>
            
            <p>Thank you for reaching out to Osityz! We've successfully received your contact submission and our team will get back to you within 24 hours.</p>
            
            <div class="next-steps">
              <strong>📋 What happens next?</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your inquiry</li>
                <li>We'll prepare a personalized response based on your needs</li>
                <li>You'll hear back from us within 24 hours</li>
                <li>We'll schedule a call if needed to discuss your requirements</li>
              </ul>
            </div>
            
            <div class="info-box">
              <div class="info-title">📝 Your Submission Details:</div>
              <div class="info-item">
                <span class="info-label">Name:</span>
                <span class="info-value">${firstName} ${lastName}</span>
              </div>
              ${companyName ? `<div class="info-item">
                <span class="info-label">Company:</span>
                <span class="info-value">${companyName}</span>
              </div>` : ''}
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              ${phone ? `<div class="info-item">
                <span class="info-label">Phone:</span>
                <span class="info-value">${phone}</span>
              </div>` : ''}
              ${location ? `<div class="info-item">
                <span class="info-label">Location:</span>
                <span class="info-value">${location}</span>
              </div>` : ''}
              ${message ? `<div class="info-item">
                <span class="info-label">Message:</span>
                <span class="info-value">${message}</span>
              </div>` : ''}
              <div class="info-item">
                <span class="info-label">Submitted:</span>
                <span class="info-value">${submissionDate}</span>
              </div>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul style="color: #4a5568;">
              <li>Explore our <a href="https://yourwebsite.com" style="color: #3b82f6;">website</a> to learn more about our services</li>
              <li>Follow us on social media for the latest updates</li>
              <li>Prepare any additional questions or documents you'd like to discuss</li>
            </ul>
            
            <p>If you have any urgent questions, don't hesitate to reach out directly at <a href="mailto:info@osityz.com" style="color: #3b82f6;">info@osityz.com</a>.</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The Osityz Team</strong><br>
              <span style="color: #666;">Maritime Technology Solutions</span>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Osityz Inc.</strong></p>
            <p>Toronto, Ontario, Canada</p>
            <p>info@osityz.com | www.osityz.com</p>
            <p style="margin-top: 20px; font-size: 12px; color: #a0aec0;">
              This email was sent because you submitted a contact form on our website.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${firstName},

      Thank you for reaching out to Osityz! We've successfully received your contact submission and our team will get back to you within 24 hours.

      Your Submission Details:
      - Name: ${firstName} ${lastName}
      ${companyName ? `- Company: ${companyName}` : ''}
      - Email: ${email}
      ${phone ? `- Phone: ${phone}` : ''}
      ${location ? `- Location: ${location}` : ''}
      ${message ? `- Message: ${message}` : ''}
      - Submitted: ${submissionDate}

      What happens next?
      • Our team will review your inquiry
      • We'll prepare a personalized response based on your needs  
      • You'll hear back from us within 24 hours
      • We'll schedule a call if needed to discuss your requirements

      If you have any urgent questions, don't hesitate to reach out directly at info@osityz.com.

      Best regards,
      The Osityz Team
      Maritime Technology Solutions
      
      Osityz Inc.
      Toronto, Ontario, Canada
      info@osityz.com | www.osityz.com
    `
  };
}