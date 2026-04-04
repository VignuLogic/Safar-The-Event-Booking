// ============================================================
// components/EventCard.jsx — Reusable Event Card
// ============================================================
//
// WHAT IS A REUSABLE COMPONENT?
// In Phase 1, we had this function in script.js:
//   function createEventCard(event) { return `<div>...</div>` }
// It returned an HTML STRING that we injected via innerHTML.
//
// In React, EventCard is a COMPONENT that returns JSX.
// It's used in both Home.jsx and Explore.jsx like this:
//   <EventCard event={eventObject} />
//
// KEY CONCEPT — PROPS:
// Props = data passed FROM parent TO child component
// Like function arguments, but for components.
// Parent passes:  <EventCard event={evt} />
// Child receives: function EventCard({ event }) { ... }
// ============================================================

// useNavigate = hook to programmatically navigate to a URL
// e.g. navigate('/explore') takes user to the explore page
import { useNavigate } from 'react-router-dom'

// ── EventCard Component ────────────────────────────────────
// { event } = destructuring the props object
// Same as: function EventCard(props) { const event = props.event }
export default function EventCard({ event }) {

  // useNavigate returns a function we call to change the URL
  const navigate = useNavigate()

  // Format price: 4999 → "4,999"
  // toLocaleString('en-IN') = Indian number format
  const formattedPrice = event.price.toLocaleString('en-IN')

  return (
    /*
      onClick on the card div
      Arrow function: () => navigate('/contact')
      When card is clicked → go to contact page (book now)

      In Phase 1 we used: element.addEventListener('click', fn)
      In React we use:    onClick={fn} directly in JSX
    */
    <div
      className="event-card"
      onClick={() => navigate('/contact')}
    >

      {/* Image + badge wrapper */}
      <div className="event-img-wrap">
        {/*
          src={event.img}  → JSX uses {} for JS expressions
          In HTML:  src="..."  (always a string)
          In JSX:   src={variable}  (JS variable)
                    src="literal string"  (still works)
        */}
        <img
          src={event.img}
          alt={event.name}
          className="event-img"
        />
        {/*
          Template literal for multiple class names:
          `event-badge ${event.category}`
          → "event-badge snow" or "event-badge adventure" etc.
          CSS has .event-badge.snow { } for each colour
        */}
        <span className={`event-badge ${event.category}`}>
          {event.category.toUpperCase()}
        </span>
      </div>

      {/* Card body */}
      <div className="event-body">
        <h3 className="event-name">{event.name}</h3>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-date">📅 {event.date}</p>
        <div className="event-footer">
          <span className="event-price">₹{formattedPrice}</span>
          <span className="event-seats">{event.seats} seats left</span>
        </div>
      </div>

    </div>
  )
}

// ── COMPARE WITH PHASE 1 ───────────────────────────────────
// Phase 1 (script.js):
//   function createEventCard(event) {
//     return `<article class="event-card">
//       <img src="${event.img}" />
//       ...
//     </article>`
//   }
//   container.innerHTML = events.map(createEventCard).join('')
//
// Phase 2 (React):
//   function EventCard({ event }) {
//     return <article className="event-card">...</article>
//   }
//   {events.map(evt => <EventCard key={evt.id} event={evt} />)}
//
// Key differences:
//   • JSX instead of template literal strings
//   • className instead of class
//   • Props instead of function arguments
//   • React manages DOM updates automatically