// server/index.js — SAFAR Backend

const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const dotenv   = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/events',   require('./routes/events'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/contact',  require('./routes/contact'))

app.get('/', (req, res) => {
  res.json({ message: 'SAFAR API is running! 🧭' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server running on http://localhost:5000')
    })
  })
  .catch(err => console.error('❌ MongoDB error:', err.message))