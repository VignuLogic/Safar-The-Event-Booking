// middleware/authMiddleware.js — Simple error handler
// MODULE 7: Middleware

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ message: err.message || 'Server error' })
}

module.exports = errorHandler