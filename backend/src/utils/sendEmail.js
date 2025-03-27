const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Admin Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: message,
    });

    console.log("✅ OTP Email Sent Successfully!");
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
};

module.exports = sendEmail;
