const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 8);
    const user = new User({
      ...req.body,
      passwordHash
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('roles');
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 8);
      delete updates.password;
    }
    const user = await User.findOneAndUpdate({ userId: req.params.userId }, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
