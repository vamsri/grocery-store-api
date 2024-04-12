const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user'); // Assuming you have a User model
const transporter = require('../middleware/email');

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found.');
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');

    // Set token and expiration on user model
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with token
    const resetUrl = `http://yourdomain.com/reset-password/${token}`;
    // ... (send email logic using Nodemailer)

    let mailOptions = {
        from: 'your-email@example.com',
        to: user.email,
        subject: 'Password Reset',
        html: `Please click on the following link, or paste this into your browser to complete the process: <a href="${resetUrl}">${resetUrl}</a>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.send('Email sent.');
    });

    res.send('Password reset link has been sent to your email.');
});

module.exports = router;