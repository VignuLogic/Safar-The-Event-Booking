// ============================================================
// models/Event.js — MongoDB Event Schema
// ============================================================
//
// MODULE 8 — MongoDB with Mongoose
//
// WHAT IS A SCHEMA?
// MongoDB stores data as documents (like JSON objects).
// A Schema defines the STRUCTURE of those documents:
//   - What fields exist
//   - What type each field is (String, Number, Date...)
//   - Which fields are required
//   - Default values
//
// WHAT IS A MODEL?
// A Model is a class built from the Schema.
// It gives us methods to interact with MongoDB:
//   Event.find()       → get all events
//   Event.findById()   → get one event by id
//   Event.create()     → add a new event
//   Event.findByIdAndUpdate() → update an event
//   Event.findByIdAndDelete() → delete an event
// ============================================================

const mongoose = require('mongoose')

// ── Define the Schema ──────────────────────────────────────
// mongoose.Schema() takes an object describing the structure
const eventSchema = new mongoose.Schema(
  {
    // Each field: fieldName: { type, required, default... }

    name: {
      type:     String,   // data type
      required: true,     // cannot be empty
      trim:     true,     // removes extra spaces
    },

    location: {
      type:     String,
      required: true,
      trim:     true,
    },

    category: {
      type:   String,
      // enum = only these values are allowed
      enum:   ['snow', 'adventure', 'trekking', 'nature'],
      required: true,
    },

    date: {
      type:     Date,
      required: true,
    },

    price: {
      type:     Number,
      required: true,
      min:      0,        // price cannot be negative
    },

    seats: {
      type:    Number,
      required: true,
      min:     0,
    },

    image: {
      type:    String,    // URL of the event image
      default: '',
    },

    description: {
      type:    String,
      default: '',
    },
  },
  {
    // timestamps: true automatically adds:
    //   createdAt → when document was created
    //   updatedAt → when document was last updated
    timestamps: true,
  }
)

// ── Create and Export the Model ───────────────────────────
// mongoose.model('Event', eventSchema)
// 'Event' = model name (MongoDB creates collection called 'events')
// eventSchema = the schema we defined above
//
// module.exports = makes this available to other files via require()
module.exports = mongoose.model('Event', eventSchema)