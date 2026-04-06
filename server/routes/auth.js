// routes/auth.js — Simple Login Route

const express = require('express')
const router  = express.Router()
const User    = require('../models/User')

// POST /api/auth/login — Simple login with name + mobile
router.post('/login', async (req, res) => {
  try {
    const { name, mobile } = req.body

    if (!name || !mobile) {
      return res.status(400).json({ message: 'Name and mobile are required.' })
    }

    // Find or create user
    let user = await User.findOne({ mobile })
    if (!user) {
      user = await User.create({ name, mobile })
    }

    res.json({ message: 'Login successful!', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router