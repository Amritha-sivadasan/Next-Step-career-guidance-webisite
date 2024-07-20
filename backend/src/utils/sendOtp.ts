import nodemailer from "nodemailer";
export async function sendOtpToUser(email: string, otp: String): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
};
await transporter.sendMail(mailOptions);
}
