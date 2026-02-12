// utils/email.js
const sgMail = require('@sendgrid/mail');

// API key ko .env file se load karein
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * SendGrid ka istemaal karke login notification email bhejta hai.
 * @param {string} email - User ka email address.
 */
const sendLoginEmail = (email) => {
  // Check karein ki API key load hui hai ya nahi
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY not set. Email not sent.');
    return; // Function se bahar aa jayein
  }

  const msg = {
    to: email, // User ka email
    from: 'support@ciphererp.com', 
    subject: 'Login Successful - CipherERP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Login Successful!</h2>
        <p>Hello,</p>
        <p>You have successfully logged into your CipherERP account.</p>
        <p>If this was not you, please contact our support immediately.</p>
        <br>
        <p>Thanks,</p>
        <p>The CipherERP Team</p>
      </div>
    `,
  };

  // Email bhejein (bina await ke)
  sgMail.send(msg)
    .then(() => {
      console.log(`Login email sent successfully to ${email}`);
    })
    .catch((error) => {
      console.error('Error sending login email with SendGrid:');
      if (error.response) {
        console.error(error.response.body);
      } else {
        console.error(error);
      }
    });
};

module.exports = { sendLoginEmail };



// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// const sendLoginEmail = async (userEmail) => {
//   try {
//     const mailOptions = {
//       from: `"CipherERP Login Alert" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: 'New Login Notification',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #2a6496;">New Login Activity</h2>
//           <p>A user has logged into your CipherERP system:</p>
//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
//               <td style="padding: 8px; border: 1px solid #ddd;">${userEmail}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time:</td>
//               <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
//             </tr>
//           </table>
//           <p style="margin-top: 20px; font-size: 12px; color: #777;">
//             This is an automated notification from CipherERP.
//           </p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Login notification email sent');
//   } catch (error) {
//     console.error('Error sending login email:', error);
//   }
// };

// module.exports = { sendLoginEmail };