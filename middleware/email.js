const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your mail server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your-email@example.com', // your email address
        pass: 'your-password' // your email password
    }
});

module.exports = transporter;
