const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transporter = require('../middleware/email');

router.post('/send-email', auth, async (req, res) => {
    let mailOptions = {
        from: '"Sender Name" <your-email@example.com>', // sender address
        to: 'recipient@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
}); 

// Add other user routes

module.exports = router;