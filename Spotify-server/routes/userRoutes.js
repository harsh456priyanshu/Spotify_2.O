const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({msg: 'All fields required'});
    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({msg: 'User already exists'});
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ msg: 'User created' });
  } catch ( err) {
    res.status(500).json({ error : err.message})
  }
  
});

router.post('/login', async (req, res) => {
  try {
     const { email, password } = req.body;
      const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email } });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;