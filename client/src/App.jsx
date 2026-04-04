// ============================================================
// App.jsx — ROOT COMPONENT + ROUTING
// ============================================================
//
// WHAT IS A COMPONENT?
// A component is just a JavaScript FUNCTION that returns JSX.
// JSX = HTML-like syntax written inside JavaScript.
//
// Example of the simplest component:
//   function Hello() {
//     return <h1>Hello World</h1>
//   }
//
// COMPARE WITH PHASE 1:
// Phase 1: one big index.html with ALL sections inside it
//          JavaScript showed/hid sections using classList
//
// Phase 2: each "tab" is its own COMPONENT (its own file)
//          React Router shows/hides components based on the URL
//          /         → shows <Home />
//          /explore  → shows <Explore />
//          etc.
//
// This is cleaner, more organised, and easier to maintain.
// ============================================================

// React import — needed for JSX to work
import React from 'react'

// Routes and Route — from React Router
// Routes  = container that holds all route definitions
// Route   = maps a URL path to a component
import { Routes, Route } from 'react-router-dom'

// Sidebar component — appears on EVERY page
// It's OUTSIDE <Routes> so it always shows
import Sidebar from './components/Sidebar.jsx'

// Page components — one for each "tab"
// Each is in its own file inside pages/
import Home         from './pages/Home.jsx'
import Explore      from './pages/Explore.jsx'
import Destinations from './pages/Destinations.jsx'
import Packages     from './pages/Packages.jsx'
import About        from './pages/About.jsx'
import Contact      from './pages/Contact.jsx'

// ── App Component ──────────────────────────────────────────
// This is a FUNCTIONAL COMPONENT
// "export default" = other files can import this as App
//
// What it returns (JSX):
//   <>...</>  = React Fragment = invisible wrapper
//               (React needs ONE parent element,
//               Fragment lets us avoid adding a useless <div>)
export default function App() {
  return (
    <>
      {/*
        Sidebar is OUTSIDE Routes
        → it shows on ALL pages, always visible on the left

        In Phase 1: sidebar was always in the HTML, JS toggled content
        In Phase 2: Sidebar component renders once, Routes change right side
      */}
      <Sidebar />

      {/*
        <main> = the right side content area
        style is inline CSS — same as style="" in HTML
        marginLeft pushes content right so sidebar doesn't cover it
      */}
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh' }}>
        {/*
          Routes = only ONE child Route renders at a time
          Based on the current URL:
            URL is "/"         → render <Home />
            URL is "/explore"  → render <Explore />
            etc.

          This replaces Phase 1's tab switching system!
          Phase 1: JavaScript added/removed "active" class
          Phase 2: React Router changes the URL → renders new component
        */}
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/explore"      element={<Explore />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages"     element={<Packages />} />
          <Route path="/about"        element={<About />} />
          <Route path="/contact"      element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

// ── HOW REACT ROUTER WORKS ─────────────────────────────────
// When user clicks a nav link in Sidebar:
//   → URL changes to e.g. /explore
//   → React Router reads the URL
//   → Finds the matching <Route path="/explore">
//   → Renders <Explore /> component in <main>
//   → NO PAGE RELOAD — happens instantly in JavaScript
//
// This is called a Single Page Application (SPA)
// The HTML page never reloads — React swaps components