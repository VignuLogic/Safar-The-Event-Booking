// models/Contact.js — Contact Form Messages
// MODULE 8: MongoDB Schema

const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  mobile:   { type: String, required: true },
  category: { type: String, default: '' },
  message:  { type: String, default: '' },
  group:    { type: String, default: 'solo' },
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)
