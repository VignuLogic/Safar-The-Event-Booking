// routes/contact.js — Save contact form to MongoDB
// MODULE 7: Node.js Route

const express = require('express')
const router  = express.Router()
const Contact = require('../models/Contact')

// POST /api/contact — Save message to MongoDB
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    console.log('📩 New message from:', req.body.name)
    res.status(201).json({ message: 'Message saved successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/contact — See all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router