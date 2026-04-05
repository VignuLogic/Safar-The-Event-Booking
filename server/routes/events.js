// ============================================================
// routes/events.js — Event API Routes
// MODULE 7 — Node.js Routing
//
// ROUTES define what happens when a URL is called.
// This file handles all /api/events/* requests.
//
// REST API conventions:
//   GET    /api/events        → get all events
//   GET    /api/events/:id    → get one event
//   POST   /api/events        → create event
//   PUT    /api/events/:id    → update event
//   DELETE /api/events/:id    → delete event
// ============================================================

const express = require('express')

// express.Router() creates a mini app for just these routes
const router = express.Router()

// Import the Event model (to interact with MongoDB)
const Event = require('../models/Event')

// ── GET all events ─────────────────────────────────────────
// GET /api/events
// Optional: ?category=snow filters by category
router.get('/', async (req, res) => {
  try {
    // req.query = URL query parameters
    // e.g. /api/events?category=snow → req.query = { category: 'snow' }
    const filter = {}
    if (req.query.category) {
      filter.category = req.query.category
    }

    // Event.find(filter) → finds all documents matching filter
    // {} = no filter = all events
    // await = wait for MongoDB to respond before continuing
    const events = await Event.find(filter)

    // res.json() sends JSON response with 200 status (OK)
    res.json(events)

  } catch (error) {
    // 500 = Internal Server Error
    res.status(500).json({ message: error.message })
  }
})

// ── GET one event by ID ────────────────────────────────────
// GET /api/events/:id
// :id = URL parameter e.g. /api/events/64abc123
router.get('/:id', async (req, res) => {
  try {
    // req.params.id = the :id from the URL
    const event = await Event.findById(req.params.id)

    if (!event) {
      // 404 = Not Found
      return res.status(404).json({ message: 'Event not found.' })
    }

    res.json(event)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── POST create new event ──────────────────────────────────
// POST /api/events
// req.body = the JSON data sent from React
router.post('/', async (req, res) => {
  try {
    // Create a new Event document from req.body
    // req.body = { name, location, category, date, price, seats }
    const event = new Event(req.body)

    // .save() saves the document to MongoDB
    const saved = await event.save()

    // 201 = Created (success, new resource created)
    res.status(201).json(saved)

  } catch (error) {
    // 400 = Bad Request (e.g. missing required fields)
    res.status(400).json({ message: error.message })
  }
})

// ── PUT update event ───────────────────────────────────────
// PUT /api/events/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,  // which event to update
      req.body,       // new data
      { new: true }   // return the UPDATED document (not old)
    )

    if (!updated) return res.status(404).json({ message: 'Event not found.' })

    res.json(updated)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── DELETE event ───────────────────────────────────────────
// DELETE /api/events/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id)

    if (!deleted) return res.status(404).json({ message: 'Event not found.' })

    res.json({ message: 'Event deleted successfully.' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Export router so index.js can use it
module.exports = router