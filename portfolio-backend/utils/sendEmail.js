const nodemailer = require('nodemailer');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asynceHandler');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // for self-signed certificates
  }
});

/**
 * Send email utility
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email message (HTML supported)
 * @param {String} [options.from] - Sender email (defaults to ADMIN_EMAIL)
 * @returns {Promise}
 */
const sendEmail = asyncHandler(async (options) => {
  // 1) Set default from address
  const from = options.from || `Portfolio Admin <${process.env.ADMIN_EMAIL}>`;

  // 2) Define email options
  const mailOptions = {
    from,
    to: options.email,
    subject: options.subject,
    text: options.message, // plain text version
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
             <h2 style="color: #2563eb;">${options.subject}</h2>
             <p>${options.message.replace(/\n/g, '<br>')}</p>
             <hr>
             <p style="font-size: 0.9em; color: #6b7280;">
               Sent from your portfolio contact form
             </p>
           </div>`
  };

  // 3) Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw new ErrorResponse('Email could not be sent', 500);
  }
});

module.exports = sendEmail;