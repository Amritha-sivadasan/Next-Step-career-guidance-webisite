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
    subject: "Otp created for your nextstep application",
    text: `Your OTP code is ${otp}`,
  };
  await transporter.sendMail(mailOptions);
}

export async function SentRejectMail(subject:string ,email: string, reason: string) {
  try {
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
      subject:subject,
      text: reason,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error occur on sending male ", error);
  }
}
