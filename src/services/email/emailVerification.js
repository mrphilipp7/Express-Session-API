const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const verificationEmail = async (email, id) => {
  try {
    const confirmationLink = `http://localhost:3007/api/user/verify/${id}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirm Your Email Address",
      html: `Please click <a href="${confirmationLink}">here</a> to confirm your email address.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification Email Sent...");
  } catch (err) {
    console.error(err);
  }
};

module.exports = verificationEmail;
