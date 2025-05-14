const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(toEmail, subject, message) {
  try {
    const info = await transporter.sendMail({
      from: `"Xenum.pvt.ltd" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      text: message,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendMail;
