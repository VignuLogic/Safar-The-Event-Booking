// pages/Explore.jsx — Fetches from real MongoDB API
// MODULE 6: useState + useEffect
// MODULE 7+8: Connects to Node.js + MongoDB

import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard.jsx'

export default function Explore() {
  const [events,       setEvents]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(e => ({
          id:       e._id,
          name:     e.name,
          location: e.location,
          category: e.category,
          date:     new Date(e.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
          price:    e.price,
          seats:    e.seats,
          img:      e.image,
        }))
        setEvents(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load events. Is the server running on port 5000?')
        setLoading(false)
      })
  }, [])

  const filtered = activeFilter === 'all' ? events : events.filter(e => e.category === activeFilter)

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Explore Events</h2>
        <p className="section-subtitle">{loading ? 'Loading...' : filtered.length + ' events found from database'}</p>
      </div>

      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'32px' }}>
        {['all','snow','adventure','trekking','nature'].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding:'8px 20px', borderRadius:'20px', cursor:'pointer', fontSize:'13px',
            fontFamily:'var(--font-body)', textTransform:'capitalize', transition:'var(--transition)',
            border: activeFilter===f ? '1px solid var(--coral)' : '1px solid var(--dark-4)',
            background: activeFilter===f ? 'var(--coral)' : 'rgba(255,255,255,0.05)',
            color: activeFilter===f ? 'var(--white)' : 'var(--text-muted)',
          }}>{f}</button>
        ))}
      </div>

      {loading && <div style={{textAlign:'center',padding:'60px',color:'var(--text-muted)'}}>🧭 Loading from MongoDB...</div>}
      {error   && <div style={{background:'rgba(255,100,100,0.1)',border:'1px solid rgba(255,100,100,0.3)',color:'#ff6b6b',padding:'16px',borderRadius:'12px'}}>⚠️ {error}</div>}

      {!loading && !error && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'24px'}}>
          {filtered.map(evt => <EventCard key={evt.id} event={evt} />)}
        </div>
      )}
    </div>
  )
}