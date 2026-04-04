// ============================================================
// components/Sidebar.jsx — Left Navigation Bar
// ============================================================
//
// WHY IS THIS A COMPONENT?
// In Phase 1, the sidebar HTML was copy-pasted inside index.html.
// In React, we make it a REUSABLE COMPONENT.
// We write it ONCE here, use it in App.jsx.
// If we need to change the sidebar, we change it in ONE place.
//
// NEW CONCEPTS IN THIS FILE:
//   useState   → stores the open/closed state of mobile sidebar
//   useLocation → reads the current URL to highlight active link
//   NavLink     → like <a> but automatically adds "active" class
// ============================================================

// useState  = React hook for storing local state in a component
// useEffect = React hook for running side effects (not used here)
import { useState } from 'react'

// NavLink    = smart link that knows if it's the current page
// useLocation = hook that gives us the current URL info
import { NavLink, useLocation } from 'react-router-dom'

// ── Nav Links Data ─────────────────────────────────────────
// Instead of writing <li> for each link manually in JSX,
// we store link data in an array and .map() over it.
// This is cleaner and easier to update.
const navLinks = [
  { to: '/',             icon: '⌂', label: 'Home'         },
  { to: '/explore',      icon: '✦', label: 'Explore Events'},
  { to: '/destinations', icon: '❄', label: 'Destinations'  },
  { to: '/packages',     icon: '◈', label: 'Packages'      },
  { to: '/about',        icon: '◎', label: 'About Us'      },
  { to: '/contact',      icon: '✉', label: 'Contact'       },
]

// ── Sidebar Component ──────────────────────────────────────
export default function Sidebar() {

  // useState — stores whether mobile sidebar is open or closed
  // [value, setter] = useState(initialValue)
  // isOpen = current value (false = closed by default)
  // setIsOpen = function to update isOpen
  const [isOpen, setIsOpen] = useState(false)

  // useLocation — gives us the current URL
  // e.g. if URL is /explore, location.pathname = '/explore'
  // We use this to highlight the active nav link
  const location = useLocation()

  return (
    <>
      {/* ── MOBILE HAMBURGER BUTTON ──
        Only visible on small screens (CSS hides it on desktop)
        onClick toggles isOpen between true and false
        isOpen ? '✕' : '☰'  → ternary operator
          condition ? valueIfTrue : valueIfFalse
      */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* ── DARK OVERLAY (mobile only) ──
        Shows behind sidebar when mobile menu is open
        Clicking it closes the sidebar
        isOpen controls whether this div renders
      */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── SIDEBAR ──
        className = same as class="" in HTML
        (React uses className because "class" is a reserved JS word)

        isOpen ? 'sidebar open' : 'sidebar'
        → adds "open" class when mobile menu is toggled
      */}
      <nav className={isOpen ? 'sidebar open' : 'sidebar'}>

        {/* Brand / Logo */}
        <div className="sidebar-brand">
          <div className="brand-icon">🧭</div>
          <div>
            <div className="brand-name">SAFAR</div>
            <div className="brand-sub">The Event Booking</div>
          </div>
        </div>

        {/* Navigation Links
          .map() loops through navLinks array
          For each link object, returns a <li> with a <NavLink>

          NavLink is special — it automatically adds class="active"
          when its "to" path matches the current URL.
          This replaces Phase 1's manual classList.add('active')!

          end prop on "/" route:
            Without end: "/" would match ALL routes (/, /explore, etc.)
            With end:    "/" only matches exactly "/"
        */}
        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            // key is REQUIRED when rendering lists in React
            // React uses it to track which items changed
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  // NavLink passes { isActive } to className function
                  // isActive = true when URL matches this link's "to"
                  // We return the CSS class name as a string
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={() => setIsOpen(false)} // close mobile menu on click
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Login Button at bottom */}
        <div className="sidebar-footer">
          <NavLink
            to="/contact"
            className="sidebar-login-btn"
            onClick={() => setIsOpen(false)}
          >
            Login / Register
          </NavLink>
        </div>

      </nav>

      {/* ── SIDEBAR CSS ──
        Inline <style> inside JSX — valid in React
        In a bigger project you'd put this in a .css file
        or use CSS modules, but this keeps it simple
      */}
      <style>{`
        .sidebar {
          width:          240px;
          min-width:      240px;
          background:     var(--dark-2);
          position:       fixed;
          top:            0;
          left:           0;
          height:         100vh;
          overflow-y:     auto;
          z-index:        1000;
          display:        flex;
          flex-direction: column;
          border-right:   1px solid var(--dark-4);
          transition:     var(--transition);
        }
        .sidebar-brand {
          display:       flex;
          align-items:   center;
          gap:           12px;
          padding:       24px 20px;
          border-bottom: 1px solid var(--dark-4);
        }
        .brand-icon  { font-size: 26px; }
        .brand-name  {
          font-family:    var(--font-heading);
          font-size:      20px;
          font-weight:    900;
          color:          var(--coral);
          letter-spacing: 2px;
        }
        .brand-sub {
          font-size:      10px;
          color:          var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .sidebar-nav { list-style: none; padding: 12px 0; flex: 1; }
        .nav-link {
          display:         flex;
          align-items:     center;
          gap:             12px;
          padding:         12px 20px;
          color:           var(--text-muted);
          text-decoration: none;
          font-size:       14px;
          font-weight:     500;
          border-left:     3px solid transparent;
          transition:      var(--transition);
        }
        .nav-link:hover {
          color:             var(--white);
          background:        rgba(255,255,255,0.05);
          border-left-color: var(--coral);
        }
        .nav-link.active {
          color:             var(--coral);
          background:        rgba(232,89,60,0.1);
          border-left-color: var(--coral);
        }
        .nav-icon   { font-size: 15px; width: 20px; text-align: center; }
        .sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--dark-4); }
        .sidebar-login-btn {
          display:         block;
          text-align:      center;
          padding:         10px;
          background:      var(--coral);
          color:           var(--white);
          text-decoration: none;
          font-weight:     600;
          font-size:       13px;
          border-radius:   var(--radius-sm);
          transition:      var(--transition);
        }
        .sidebar-login-btn:hover { background: var(--coral-dark); color: var(--white); }
        .mobile-menu-btn {
          display:    none;
          position:   fixed;
          top:        14px;
          left:       14px;
          z-index:    1100;
          background: var(--dark-2);
          border:     1px solid var(--dark-4);
          color:      var(--white);
          width:      42px;
          height:     42px;
          border-radius: var(--radius-sm);
          cursor:     pointer;
          font-size:  20px;
        }
        .sidebar-overlay {
          display:    block;
          position:   fixed;
          inset:      0;
          background: rgba(0,0,0,0.6);
          z-index:    999;
        }
        @media (max-width: 992px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
        }
      `}</style>
    </>
  )
}