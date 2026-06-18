import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface ContactMailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface QuoteMailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  products: string;
  quantity: string;
  message: string;
}

const generateHtmlTable = (data: Record<string, any>) => {
  const rows = Object.entries(data)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 30%; color: #555;">
          ${key.charAt(0).toUpperCase() + key.slice(1)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #111;">
          ${value || '-'}
        </td>
      </tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
      <div style="background-color: #0d1821; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="color: #c9a86a; margin: 0; letter-spacing: 2px;">2AE VENTURES</h2>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="color: #333; font-size: 16px;">You have received a new submission from your website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
        <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">
          This is an automated message sent from the 2AE VENTURES system.
        </p>
      </div>
    </div>
  `;
};

export const sendNotificationEmail = async (
  subject: string,
  data: ContactMailData | QuoteMailData
) => {
  // If SMTP is not configured, we gracefully skip sending to prevent breaking the API.
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP is not configured. Email notification skipped.');
    return;
  }

  const htmlContent = generateHtmlTable(data);
  const mailTo = process.env.MAIL_TO || 'contact@2aeventures.com';

  try {
    await transporter.sendMail({
      from: `"2AE Ventures System" <${process.env.SMTP_USER}>`,
      to: mailTo,
      subject: `[System] ${subject}`,
      html: htmlContent,
    });
    console.log(`Email sent to ${mailTo} regarding: ${subject}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    // We throw the error so the API route can choose how to handle it,
    // though usually we don't want to crash the user submission if mail fails.
    // In this case, we just log it and return false to let the caller know.
    return false;
  }
  return true;
};
