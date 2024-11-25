// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {setUser,getUser} = require("../middleware/authMiddleware")

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email,password });
    if (user) {
      return res.status(400).json({ message: ' Invalid User name or password' });
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = setUser(newUser);

    res.status(201).json({ message: 'User created successfully',token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = getUser(user);

    res.status(200).json({ message: 'Login successful',token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
