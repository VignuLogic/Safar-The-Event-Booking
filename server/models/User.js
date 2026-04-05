// ============================================================
// models/User.js — MongoDB User Schema
// MODULE 8 — MongoDB
// ============================================================

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: true,
      trim:     true,
    },

    mobile: {
      type:     String,
      required: true,
      unique:   true,   // no two users can have same mobile
      trim:     true,
    },

    email: {
      type:    String,
      trim:    true,
      default: '',
    },

    // OTP fields for mobile login
    otp: {
      type:    String,
      default: null,
    },

    otpExpiry: {
      type:    Date,
      default: null,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)