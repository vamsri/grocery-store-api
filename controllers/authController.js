const User = require('../models/userSchema');
const Role = require('../models/roleSchema');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // This should be stored in an environment variable.

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    const defaultRole = await Role.findOne({ isDefault: true });
    if (!defaultRole) {
      throw new Error("Default role not found");
    }
    user.roles = [defaultRole._id]; // Assuming the user schema can hold multiple roles
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).send({ user, token });   
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Login failed!' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};


// Add methods for updating and deleting users if needed
