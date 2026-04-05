// routes/bookings.js — Simple Booking Routes
// MODULE 7: Node.js Routing

const express = require('express')
const router  = express.Router()
const Booking = require('../models/Booking')
const Event   = require('../models/Event')

// POST /api/bookings — Create a booking
router.post('/', async (req, res) => {
  try {
    const { name, mobile, eventId, tickets } = req.body

    const event = await Event.findById(eventId)
    if (!event) return res.status(404).json({ message: 'Event not found.' })

    if (event.seats < tickets) {
      return res.status(400).json({ message: 'Not enough seats.' })
    }

    const totalPrice = event.price * tickets
    const booking = new Booking({ name, mobile, eventId, tickets, totalPrice })
    await booking.save()

    event.seats -= tickets
    await event.save()

    res.status(201).json({ message: 'Booking confirmed!', booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/bookings — Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId', 'name location date')
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router