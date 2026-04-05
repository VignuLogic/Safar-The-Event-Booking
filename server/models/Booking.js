// models/Booking.js — Simple Booking Schema
// MODULE 8: MongoDB Schema

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  mobile:     { type: String, required: true },
  eventId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  tickets:    { type: Number, required: true, min: 1, default: 1 },
  totalPrice: { type: Number, required: true },
  status:     { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)