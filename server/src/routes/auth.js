const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && password === user.password) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;