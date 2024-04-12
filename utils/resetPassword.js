const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
    }

    user.password = password; // Hash this password if you're storing hashed passwords
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send('Your password has been updated.');
});

module.exports = router;