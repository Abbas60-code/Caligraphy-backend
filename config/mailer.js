import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Gmailuser,
    pass: process.env.Gmailpassword,
  },
});

/**
 * Send order notification email to admin (amircreator09@gmail.com)
 */
export async function sendOrderNotification({ customer, email, phone, address, city, country, total, items, paymentMethod, orderRef }) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 16px; border-bottom: 1px solid #F0E8D8; font-family: Georgia, serif; font-size: 14px; color: #1A1A1A;">${item.title}</td>
      <td style="padding: 10px 16px; border-bottom: 1px solid #F0E8D8; text-align: center; font-family: Inter, sans-serif; font-size: 14px; color: #5A5050;">${item.quantity}</td>
      <td style="padding: 10px 16px; border-bottom: 1px solid #F0E8D8; text-align: right; font-family: Inter, sans-serif; font-size: 14px; font-weight: 700; color: #C9A84C;">$${(item.price * item.quantity).toFixed(0)}</td>
    </tr>
  `).join('');

  const paymentLabel = {
    whatsapp: '💬 WhatsApp Payment',
    payoneer: '💰 Payoneer Transfer',
    cod: '🚪 Cash on Delivery',
  }[paymentMethod] || paymentMethod;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Order — Amir Calligraphy</title>
</head>
<body style="margin:0; padding:0; background:#F5EFE0; font-family: Inter, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border: 1px solid #E8DFC8; border-top: 5px solid #C9A84C; border-radius: 2px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1A1A; padding: 32px 40px; text-align: center;">
              <p style="font-family:Inter,sans-serif; font-size:10px; letter-spacing:5px; text-transform:uppercase; color:#C9A84C; margin:0 0 8px;">بسم الله</p>
              <h1 style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:#ffffff; margin:0;">Amir Calligraphy</h1>
              <p style="font-family:Inter,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,0.5); margin:8px 0 0;">New Order Notification</p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background:#C9A84C; padding: 14px 40px; text-align:center;">
              <p style="font-family:Inter,sans-serif; font-size:13px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1A1A1A; margin:0;">
                🔔 New Order Received — ${orderRef}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px;">

              <!-- Customer Info -->
              <h2 style="font-family:Georgia,serif; font-size:18px; color:#1A1A1A; margin:0 0 16px; padding-bottom:10px; border-bottom:1px solid #E8DFC8;">
                👤 Customer Details
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:12px; color:#8A7A6A; width:130px; text-transform:uppercase; letter-spacing:1px;">Name</td>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:14px; color:#1A1A1A; font-weight:600;">${customer}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:12px; color:#8A7A6A; text-transform:uppercase; letter-spacing:1px;">Email</td>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:14px; color:#C9A84C;"><a href="mailto:${email}" style="color:#C9A84C;">${email}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:12px; color:#8A7A6A; text-transform:uppercase; letter-spacing:1px;">Phone</td>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:14px; color:#1A1A1A;">${phone}</td>
                </tr>` : ''}
                ${address ? `<tr>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:12px; color:#8A7A6A; text-transform:uppercase; letter-spacing:1px;">Address</td>
                  <td style="padding: 6px 0; font-family:Inter,sans-serif; font-size:14px; color:#1A1A1A;">${address}, ${city}, ${country}</td>
                </tr>` : ''}
              </table>

              <!-- Payment Method -->
              <h2 style="font-family:Georgia,serif; font-size:18px; color:#1A1A1A; margin:0 0 12px; padding-bottom:10px; border-bottom:1px solid #E8DFC8;">
                💳 Payment Method
              </h2>
              <p style="font-family:Inter,sans-serif; font-size:14px; color:#1A1A1A; font-weight:600; margin:0 0 28px;">${paymentLabel}</p>

              <!-- Order Items -->
              <h2 style="font-family:Georgia,serif; font-size:18px; color:#1A1A1A; margin:0 0 16px; padding-bottom:10px; border-bottom:1px solid #E8DFC8;">
                🖼️ Order Items
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E8DFC8; border-radius:2px; margin-bottom:24px;">
                <thead>
                  <tr style="background:#F5EFE0;">
                    <th style="padding: 10px 16px; font-family:Inter,sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#8A7A6A; text-align:left;">Artwork</th>
                    <th style="padding: 10px 16px; font-family:Inter,sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#8A7A6A; text-align:center;">Qty</th>
                    <th style="padding: 10px 16px; font-family:Inter,sans-serif; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#8A7A6A; text-align:right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A; padding:20px 24px; border-radius:2px;">
                <tr>
                  <td style="font-family:Inter,sans-serif; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.6);">Order Total</td>
                  <td style="text-align:right; font-family:Georgia,serif; font-size:32px; font-weight:700; color:#C9A84C;">$${total}</td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5EFE0; padding: 20px 40px; text-align:center; border-top: 1px solid #E8DFC8;">
              <p style="font-family:Inter,sans-serif; font-size:11px; color:#8A7A6A; margin:0;">
                This notification was sent to <strong>amircreator09@gmail.com</strong> from Amir Calligraphy Store.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Amir Calligraphy Store" <${process.env.Gmailuser}>`,
    to: 'amircreator09@gmail.com',
    subject: `🔔 New Order ${orderRef} — $${total} — ${customer}`,
    html,
  });
}

/**
 * Send password reset code to customer
 */
export async function sendResetCodeEmail(email, code) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password — Amir Calligraphy</title>
</head>
<body style="margin:0; padding:0; background:#F5EFE0; font-family: Inter, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border: 1px solid #E8DFC8; border-top: 5px solid #C9A84C; border-radius: 2px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1A1A; padding: 32px 40px; text-align: center;">
              <p style="font-family:Inter,sans-serif; font-size:10px; letter-spacing:5px; text-transform:uppercase; color:#C9A84C; margin:0 0 8px;">بسم الله</p>
              <h1 style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:#ffffff; margin:0;">Amir Calligraphy</h1>
              <p style="font-family:Inter,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,0.5); margin:8px 0 0;">Password Recovery</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px; text-align: center;">
              <h2 style="font-family:Georgia,serif; font-size:20px; color:#1A1A1A; margin:0 0 16px;">
                Verification Code
              </h2>
              <p style="font-family:Inter,sans-serif; font-size:14px; color:#5A5050; line-height:1.6; margin:0 0 24px;">
                You requested to reset your password. Please use the following 6-digit verification code to reset it. This code will expire in 15 minutes.
              </p>
              
              <!-- Code Box -->
              <div style="background:#F5EFE0; padding: 20px; border-radius: 4px; display: inline-block; letter-spacing: 4px; font-family: monospace; font-size: 32px; font-weight: bold; color: #1A1A1A; border: 1px dashed #C9A84C; margin-bottom: 24px;">
                ${code}
              </div>

              <p style="font-family:Inter,sans-serif; font-size:13px; color:#8A7A6A; margin:0;">
                If you did not request this, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5EFE0; padding: 20px 40px; text-align:center; border-top: 1px solid #E8DFC8;">
              <p style="font-family:Inter,sans-serif; font-size:11px; color:#8A7A6A; margin:0;">
                This email was sent to <strong>${email}</strong> from Amir Calligraphy Store.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Amir Calligraphy Store" <${process.env.Gmailuser}>`,
    to: email,
    subject: `🔑 Password Reset Verification Code: ${code}`,
    html,
  });
}

