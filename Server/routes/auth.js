const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendLoginEmail } = require('../utils/email');

// Login endpoint
// auth.js
// auth.js (Modified Login Logic)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check environment variable loading
    if (!process.env.ADMIN_PASSWORD) {
       console.error("CRITICAL: ADMIN_PASSWORD is not set in environment variables");
    }

    // 1. Check Master Admin Credentials
    const isMasterAdmin = email === 'delhidentalclinicindia@gmail.com' && password === process.env.ADMIN_PASSWORD;

    if (!isMasterAdmin) {
      return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }

    // 2. Find or Create User (Taaki empty DB par bhi chale)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    // 3. Create JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // Since we're using JWT, logout is handled client-side by removing the token
  res.status(200).json({ success: true, message: 'Logout successful' });
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: { email: user.email }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;