// ============================================================
// utils/eventsData.js — Shared Data File
//
// WHY THIS FILE EXISTS:
// In Phase 1 (plain HTML), we had eventsData array inside script.js
// In React, we keep data SEPARATE from components.
// Any component that needs events just imports from here.
//
// This is a JavaScript MODULE.
// export keyword = makes this available to other files
// import keyword = brings it into another file
//
// Example usage in any component:
//   import { eventsData } from '../utils/eventsData'
// ============================================================

// export = makes this variable available to other files
// Without export, other files can't import it
export const eventsData = [
  {
    id:       1,
    name:     "Manali Snow Trek",
    location: "Manali, Himachal Pradesh",
    // category is used for filtering in Explore page
    category: "snow",
    date:     "15 Dec 2025",
    price:    4999,
    seats:    20,
    img:      "https://placehold.co/400x220/0f3460/ffffff?text=Manali"
  },
  {
    id:       2,
    name:     "Kutch Desert Camp",
    location: "Kutch, Gujarat",
    category: "adventure",
    date:     "20 Jan 2026",
    price:    3499,
    seats:    15,
    img:      "https://placehold.co/400x220/993C1D/ffffff?text=Kutch"
  },
  {
    id:       3,
    name:     "Valley of Flowers Trek",
    location: "Uttarakhand",
    category: "nature",
    date:     "10 Jun 2026",
    price:    6999,
    seats:    8,
    img:      "https://placehold.co/400x220/0F6E56/ffffff?text=Valley"
  },
  {
    id:       4,
    name:     "Dalhousie Snow Camp",
    location: "Dalhousie, Himachal Pradesh",
    category: "snow",
    date:     "25 Dec 2025",
    price:    5499,
    seats:    12,
    img:      "https://placehold.co/400x220/1a1a2e/E8593C?text=Dalhousie"
  },
  {
    id:       5,
    name:     "Bangalore City Trek",
    location: "Bangalore, Karnataka",
    category: "adventure",
    date:     "5 Feb 2026",
    price:    1999,
    seats:    30,
    img:      "https://placehold.co/400x220/534AB7/ffffff?text=Bangalore"
  },
  {
    id:       6,
    name:     "Coorg Nature Trail",
    location: "Coorg, Karnataka",
    category: "trekking",
    date:     "15 Mar 2026",
    price:    4299,
    seats:    18,
    img:      "https://placehold.co/400x220/27500A/ffffff?text=Coorg"
  }
]