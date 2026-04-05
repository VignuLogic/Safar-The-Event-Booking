// seed.js — Adds sample events to MongoDB
// Run once with: node seed.js

const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const Event    = require('./models/Event')

dotenv.config()

const events = [
  {
    name:        'Manali Snow Trek',
    location:    'Manali, Himachal Pradesh',
    category:    'snow',
    date:        new Date('2025-12-15'),
    price:       4999,
    seats:       20,
    image:       'https://placehold.co/400x220/0f3460/ffffff?text=Manali',
    description: 'Experience pristine snow and frozen lakes in Manali.',
  },
  {
    name:        'Kutch Desert Camp',
    location:    'Kutch, Gujarat',
    category:    'adventure',
    date:        new Date('2026-01-20'),
    price:       3499,
    seats:       15,
    image:       'https://placehold.co/400x220/993C1D/ffffff?text=Kutch',
    description: 'Camp under the stars in the white desert of Kutch.',
  },
  {
    name:        'Valley of Flowers Trek',
    location:    'Uttarakhand',
    category:    'nature',
    date:        new Date('2026-06-10'),
    price:       6999,
    seats:       8,
    image:       'https://placehold.co/400x220/0F6E56/ffffff?text=Valley',
    description: 'Trek through the UNESCO World Heritage valley.',
  },
  {
    name:        'Dalhousie Snow Camp',
    location:    'Dalhousie, Himachal Pradesh',
    category:    'snow',
    date:        new Date('2025-12-25'),
    price:       5499,
    seats:       12,
    image:       'https://placehold.co/400x220/1a1a2e/E8593C?text=Dalhousie',
    description: 'Christmas snow camp in beautiful Dalhousie.',
  },
  {
    name:        'Bangalore City Trek',
    location:    'Bangalore, Karnataka',
    category:    'adventure',
    date:        new Date('2026-02-05'),
    price:       1999,
    seats:       30,
    image:       'https://placehold.co/400x220/534AB7/ffffff?text=Bangalore',
    description: 'Explore hidden trails around the garden city.',
  },
  {
    name:        'Coorg Nature Trail',
    location:    'Coorg, Karnataka',
    category:    'trekking',
    date:        new Date('2026-03-15'),
    price:       4299,
    seats:       18,
    image:       'https://placehold.co/400x220/27500A/ffffff?text=Coorg',
    description: 'Walk through coffee plantations and waterfalls.',
  },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected!')

    // Delete existing events first
    await Event.deleteMany({})
    console.log('🗑️  Old events cleared')

    // Insert new events
    await Event.insertMany(events)
    console.log('✅ 6 events added to MongoDB!')

    mongoose.connection.close()
    console.log('👋 Done! You can now visit http://localhost:5000/api/events')
  })
  .catch(err => console.error('❌ Error:', err.message))