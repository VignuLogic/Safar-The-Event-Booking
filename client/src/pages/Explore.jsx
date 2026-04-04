// ============================================================
// pages/Explore.jsx — Events with Filter
// KEY CONCEPT: useState for filter state
// ============================================================
import { useState } from 'react'
import EventCard from '../components/EventCard.jsx'
import { eventsData } from '../utils/eventsData.js'

const FILTERS = ['all', 'snow', 'adventure', 'trekking', 'nature']

export default function Explore() {
  // useState stores which filter is active
  // When setActiveFilter is called, React re-renders the component
  const [activeFilter, setActiveFilter] = useState('all')

  // Derived state — recalculates every render based on activeFilter
  const filtered = activeFilter === 'all'
    ? eventsData
    : eventsData.filter(e => e.category === activeFilter)

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Explore Events</h2>
        <p className="section-subtitle">Find your next adventure</p>
      </div>

      {/* Filter Buttons — active style applied with ternary */}
      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'32px' }}>
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding:      '8px 20px',
              borderRadius: '20px',
              border:       activeFilter === filter ? '1px solid var(--coral)' : '1px solid var(--dark-4)',
              background:   activeFilter === filter ? 'var(--coral)'           : 'rgba(255,255,255,0.05)',
              color:        activeFilter === filter ? 'var(--white)'            : 'var(--text-muted)',
              cursor:       'pointer',
              fontSize:     '13px',
              fontFamily:   'var(--font-body)',
              textTransform:'capitalize',
              transition:   'var(--transition)',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'24px' }}>
        {filtered.map(evt => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  )
}