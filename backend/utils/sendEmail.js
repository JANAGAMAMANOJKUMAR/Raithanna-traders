import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',        // or your SMTP host
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,   // must be set and valid
    pass: process.env.EMAIL_PASS,   // must be set and valid
  },
});

export async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"Raithanna Traders" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
