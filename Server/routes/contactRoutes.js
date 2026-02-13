const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const sgMail = require('@sendgrid/mail');

// SendGrid API Key Configure karein
// Yaad rahe Render Dashboard mein SENDGRID_API_KEY set hona chahiye
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
    const { name, email, phone, service, date, message } = req.body;

    try {
        // Step 1: Database mein data save karein
        const newAppointment = new Appointment({ name, email, phone, service, date, message });
        await newAppointment.save();

        // Step 2: Email Messages Taiyar Karein
        const messages = [
            {
                // ADMIN NOTIFICATION (Aapke liye)
                to: process.env.RECEIVER_EMAIL,
                from: process.env.EMAIL_USER, // Yeh SendGrid par verified hona chahiye
                subject: `Urgent: New Appointment Lead - ${name}`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #0A1628; padding: 20px; text-align: center;">
                        <h2 style="color: #D4AF37; margin: 0; font-size: 24px; letter-spacing: 1px;">DELHI DENTAL CLINIC</h2>
                        <p style="color: #ffffff; margin: 5px 0 0; font-size: 12px; text-transform: uppercase;">New Appointment Lead</p>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <p style="color: #333; font-size: 16px;">Hello Team,</p>
                        <p style="color: #666; font-size: 14px; margin-bottom: 25px;">You have received a new appointment request. Below are the details:</p>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 30%;">Patient Name</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628; font-weight: bold;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Service</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628; font-weight: bold;">${service}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Preferred Date</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #D4AF37; font-weight: bold;">${date || 'Not specified'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Phone</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Email</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628;">${email}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 25px;">
                            <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Patient Message:</p>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #444; font-style: italic;">
                                "${message || 'No additional message provided.'}"
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #999; font-size: 11px;">
                        This is an automated notification from your website system. <br/>
                        © ${new Date().getFullYear()} Delhi Dental Clinic | All Rights Reserved.
                    </div>
                </div>`
            },
            {
                // PATIENT AUTO-REPLY (Patient ke liye)
                to: email,
                from: process.env.EMAIL_USER,
                subject: `Appointment Request Received - Delhi Dental Clinic`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #0A1628; padding: 20px; text-align: center;">
                        <h2 style="color: #D4AF37; margin: 0;">DELHI DENTAL CLINIC</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear <strong>${name}</strong>,</p>
                        <p>Thank you for reaching out. We have received your request for <strong>${service}</strong>.</p>
                        <p>Our team will review your details and contact you shortly to confirm the available time slot.</p>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                            <strong>Clinic Location:</strong><br/>
                            R-241, Ground Floor, G.K-1, Opp. GK-1 Police Station, New Delhi
                        </div>
                        <p>Regards,<br/>Team DDC</p>
                    </div>
                </div>`
            }
        ];

        // Step 3: SendGrid API se Parallel bhejhein
        try {
            await sgMail.send(messages);
            return res.status(200).json({ success: true, message: "Appointment saved and notifications sent via SendGrid!" });
        } catch (emailErr) {
            console.error("SendGrid API Error:", emailErr.response ? emailErr.response.body : emailErr);
            // Partial Success: Data save ho gaya par email fail hui
            return res.status(200).json({ 
                success: true, 
                message: "Appointment saved but email notification failed. Our team will contact you manually." 
            });
        }

    } catch (dbErr) {
        console.error("Database Error:", dbErr);
        return res.status(500).json({ success: false, message: "Server Error: Could not save data." });
    }
});

// GET Route Appointments dekhne ke liye
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/Appointment');
// const nodemailer = require('nodemailer');

// router.post('/', async (req, res) => {
//     const { name, email, phone, service, date, message } = req.body;

//     try {
//         // 1. Database mein save karein
//         const newAppointment = new Appointment({ name, email, phone, service, date, message });
//         await newAppointment.save();

//         // 2. Email setup (Nodemailer)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER, 
//                 pass: process.env.EMAIL_PASS  
//             }
//         });

//         const mailOptions = {
//             from: email,
//             to: process.env.RECEIVER_EMAIL, 
//             subject: `New Appointment Request from ${name}`,
//             html: `
// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
//     <div style="background-color: #0A1628; padding: 20px; text-align: center;">
//         <h2 style="color: #D4AF37; margin: 0; font-size: 24px; letter-spacing: 1px;">DELHI DENTAL CLINIC</h2>
//         <p style="color: #ffffff; margin: 5px 0 0; font-size: 12px; text-transform: uppercase;">New Appointment Lead</p>
//     </div>

//     <div style="padding: 30px; background-color: #ffffff;">
//         <p style="color: #333; font-size: 16px;">Hello Team,</p>
//         <p style="color: #666; font-size: 14px; margin-bottom: 25px;">You have received a new appointment request. Below are the details:</p>
        
//         <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 30%;">Patient Name</td>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628; font-weight: bold;">${name}</td>
//             </tr>
//             <tr>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Service</td>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628; font-weight: bold;">${service}</td>
//             </tr>
//             <tr>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Preferred Date</td>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #D4AF37; font-weight: bold;">${date || 'Not specified'}</td>
//             </tr>
//             <tr>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Phone</td>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628;">${phone}</td>
//             </tr>
//             <tr>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Email</td>
//                 <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628;">${email}</td>
//             </tr>
//         </table>

//         <div style="margin-top: 25px;">
//             <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Patient Message:</p>
//             <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #444; font-style: italic;">
//                 "${message || 'No additional message provided.'}"
//             </div>
//         </div>
//     </div>

//     <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #999; font-size: 11px;">
//         This is an automated notification from your website system. <br/>
//         © ${new Date().getFullYear()} Delhi Dental Clinic | All Rights Reserved.
//     </div>
// </div>
// `
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ success: true, message: "Appointment Saved & Email Sent!" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// });

// // routes/contactRoutes.js mein add karein
// router.get('/', async (req, res) => {
//     try {
//         const appointments = await Appointment.find().sort({ createdAt: -1 });
//         res.json(appointments);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching data" });
//     }
// });

// module.exports = router;