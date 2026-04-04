// ============================================================
// main.jsx — THE ENTRY POINT of the React App
// ============================================================
//
// WHAT IS AN ENTRY POINT?
// When Vite starts, it looks at index.html (in client/ folder)
// index.html has this line:
//   <script type="module" src="/src/main.jsx"></script>
// That tells Vite: "start the app from main.jsx"
//
// WHAT DOES main.jsx DO?
// It takes our React App and "mounts" it into the HTML page.
// index.html has: <div id="root"></div>  ← empty div
// main.jsx fills that empty div with our entire React app.
//
// COMPARE WITH PHASE 1:
// Phase 1: browser reads index.html top to bottom, shows content
// Phase 2: browser loads main.jsx → React builds the UI in JS
//           → injects it into <div id="root">
// ============================================================

// React — the core library
// Without this import, JSX (HTML-like syntax) won't work
import React from 'react'

// ReactDOM — connects React to the actual browser DOM
// DOM = Document Object Model = the HTML page as a JS object
import ReactDOM from 'react-dom/client'

// BrowserRouter — enables URL-based navigation (React Router)
// Wraps our whole app so any component can use navigation
import { BrowserRouter } from 'react-router-dom'

// Our main App component — the root of our component tree
import App from './App.jsx'

// Global CSS — applied to the entire app
// Same as <link rel="stylesheet"> in HTML, but imported in JS
import './index.css'

// ── Mount the App ──────────────────────────────────────────
// document.getElementById('root') finds <div id="root"> in index.html
// .createRoot()  tells React: this is where you live
// .render()      injects our App component inside that div
//
// <React.StrictMode> is a development helper:
//   → Shows extra warnings in the console
//   → Helps catch bugs early
//   → Has NO effect in production (when you deploy the site)
//
// <BrowserRouter> wraps App so React Router works everywhere
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// ── KEY DIFFERENCE FROM PHASE 1 ───────────────────────────
// Phase 1 script.js:  manually found elements, changed innerHTML
// Phase 2 main.jsx:   React manages the DOM automatically
//                     We just describe WHAT to show, React handles HOW