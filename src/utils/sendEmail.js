// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const fs = require("fs");
// const path = require("path");

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//     username: "api",
//     key: process.env.MAILGUN_API_KEY
// });

// const sendEmail = async (to, subject, html) => {
//     try {
//         await mg.messages.create(process.env.MAILGUN_DOMAIN, {
//             from: `FrostKontroll <support@odor.iotfiysolutions.com>`,
//             to,
//             subject,
//             html,

//             // Attach inline image similar to Nodemailer "cid"
//             inline: [
//                 {
//                     filename: "logo.png",
//                     data: fs.createReadStream(path.join(__dirname, "../assets/logo.png")),
//                     knownLength: fs.statSync(path.join(__dirname, "../assets/logo.png")).size
//                 }
//             ]
//         });

//         console.log("Email sent ✔");
//     } catch (err) {
//         console.error("Mailgun error:", err);
//     }
// };

// module.exports = sendEmail;


const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,      // e.g. smtp.gmail.com OR smtp.hostinger.com
    port: process.env.SMTP_PORT,      // 465 or 587
    secure: process.env.SMTP_PORT == 465, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,  // email address
        pass: process.env.SMTP_PASS   // email password or app password
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"PoleKit" <support@odor.iotfiysolutions.com>`,
            to,
            subject,
            html,
            attachments: [
                {
                    filename: "logo.png",
                    path: path.join(__dirname, "../assets/logo.png"),
                    cid: "logo" 
                }
            ]
        });

        console.log("Email sent ✔");
    } catch (err) {
        console.error("Email error:", err);
    }
};

module.exports = sendEmail;
