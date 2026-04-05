# 🧭 SAFAR — The Event Booking Platform

> *Explore. Experience. Enjoy the Journey.*

A full-stack web application for booking adventure events across India — built as a mini project for the Full Stack Development course (SEIT3241) at Savani University.

---

## 👩‍💻 Student Details

| Field | Details |
|-------|---------|
| **Name** | Vigneshwari |
| **Roll No** | 23SE02CS110 |
| **Course** | Full Stack Development — SEIT3241 |
| **University** | Savani University |

---

## 📋 Syllabus Coverage

| Module | Topic | Where Used |
|--------|-------|-----------|
| M1 | Web Design Principles | `index.html` — layout, typography, colour scheme |
| M2 | HTML5 | `index.html` — semantic tags, forms, tables, lists |
| M3 | CSS3 | `style.css` — flexbox, animations, media queries |
| M4 | JavaScript + jQuery | `script.js` — DOM, events, slider, form validation |
| M5 | Bootstrap | `index.html` — grid, navbar, table, CDN |
| M6 | ReactJS | `client/src/` — components, props, useState, routing |
| M7 | Node.js + Express | `server/` — REST API, routes, middleware |
| M8 | MongoDB | `server/models/` — schemas, CRUD operations |

---

## 🏗️ Project Structure

```
SAFAR/
│
├── 📄 index.html          # Phase 1 — Plain HTML website
├── 🎨 style.css           # Phase 1 — CSS3 styling
├── ⚡ script.js           # Phase 1 — JavaScript + jQuery
│
├── 📁 client/             # Phase 2 — React Application
│   └── src/
│       ├── App.jsx              # Routing setup
│       ├── main.jsx             # React entry point
│       ├── index.css            # Global styles
│       ├── components/
│       │   ├── Sidebar.jsx      # Left navigation
│       │   └── EventCard.jsx    # Reusable card component
│       ├── pages/
│       │   ├── Home.jsx         # Landing page
│       │   ├── Explore.jsx      # Events with filter + API fetch
│       │   ├── Destinations.jsx # Image slider
│       │   ├── Packages.jsx     # Comparison table
│       │   ├── About.jsx        # About page
│       │   └── Contact.jsx      # Form with validation
│       └── utils/
│           └── eventsData.js    # Static event data
│
└── 📁 server/             # Phase 3 — Node.js Backend
    ├── index.js                 # Express server entry point
    ├── .env                     # Environment variables
    ├── seed.js                  # Seed MongoDB with sample data
    ├── models/
    │   ├── Event.js             # MongoDB Event schema
    │   ├── User.js              # MongoDB User schema
    │   └── Booking.js           # MongoDB Booking schema
    ├── routes/
    │   ├── events.js            # GET/POST/PUT/DELETE events
    │   ├── bookings.js          # Create and view bookings
    │   └── auth.js              # User login
    └── middleware/
        └── authMiddleware.js    # Request middleware
```

---

## 🚀 How to Run

### Phase 1 — Plain HTML Website
Just open `index.html` directly in your browser. No setup needed!

---

### Phase 2 — React App

```bash
# Go into client folder
cd client

# Install dependencies
npm install

# Install React Router
npm install react-router-dom

# Start development server
npm run dev
```

Open **http://localhost:5173/** in your browser.

---

### Phase 3 — Node.js Backend

Make sure MongoDB is running first (`mongod` in terminal).

```bash
# Go into server folder
cd server

# Install dependencies
npm install

# Add sample events to database (run once)
node seed.js

# Start the server
npm run dev
```

API running at **http://localhost:5000/**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get one event |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | Get all bookings |
| POST | `/api/auth/login` | User login |

---

## 🗄️ MongoDB Collections

**events** — Stores all adventure events
```json
{
  "name": "Manali Snow Trek",
  "location": "Manali, Himachal Pradesh",
  "category": "snow",
  "date": "2025-12-15",
  "price": 4999,
  "seats": 20,
  "image": "...",
  "description": "..."
}
```

**users** — Stores registered users
```json
{
  "name": "Vigneshwari",
  "mobile": "9876543210",
  "email": "user@example.com"
}
```

**bookings** — Stores event bookings
```json
{
  "name": "Vigneshwari",
  "mobile": "9876543210",
  "eventId": "ObjectId",
  "tickets": 2,
  "totalPrice": 9998,
  "status": "confirmed"
}
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, flexbox, animations |
| JavaScript | DOM manipulation, form validation |
| jQuery | Image slider, AJAX, DOM shortcuts |
| Bootstrap 5 | Responsive grid, UI components |
| React 18 | Component-based frontend |
| React Router | Client-side navigation |
| Node.js | JavaScript runtime for backend |
| Express.js | Web framework for REST API |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modelling |

---

## ✨ Features

- 🧭 Left sidebar navigation with active link highlighting
- 🎨 Dark theme with coral accent colours
- 📱 Fully responsive — works on mobile and desktop
- 🎠 jQuery image slider for destinations
- 🔍 Category filter for events
- ✅ Form validation (client-side + server-side)
- 🗄️ Real data from MongoDB database
- 🔌 REST API with full CRUD operations
- ⚛️ React components with props and state

---

## 📸 Pages

| Page | Description |
|------|-------------|
| Home | Hero section, stats, featured events, footer |
| Explore Events | All events with category filter (fetches from MongoDB) |
| Destinations | Image slider with jQuery |
| Packages | Comparison table with pricing cards |
| About Us | Mission, vision, how to book |
| Contact | Full HTML5 form with JS validation |

---

*Made with ❤️ by Vigneshwari | Savani University | 2025*