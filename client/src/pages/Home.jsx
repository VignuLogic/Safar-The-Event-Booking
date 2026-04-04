// ============================================================
// pages/Home.jsx — Home Page Component
// ============================================================
//
// CONCEPTS IN THIS FILE:
//   • Functional component returning JSX
//   • useNavigate for button clicks
//   • Importing and using another component (EventCard)
//   • .slice() to show only first 3 events
//   • .map() to render a list of components
// ============================================================

import { useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import { eventsData } from '../utils/eventsData.js'

export default function Home() {

  // useNavigate = navigate programmatically on button click
  const navigate = useNavigate()

  return (
    <div>

      {/* ── HERO SECTION ── */}
      <div style={styles.hero}>
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.heroInner}>
          <div style={styles.heroLeft}>

            <span style={styles.heroTag}>🧭 Explore India's Best Experiences</span>

            {/*
              JSX RULE: className instead of class
              Because "class" is a reserved word in JavaScript
              (used for: class Animal { ... })
              React uses className to avoid confusion
            */}
            <h1 style={styles.heroTitle}>
              Adventure,<br />
              <span style={{ color: 'var(--coral)' }}>Rediscovered.</span>
            </h1>

            <p style={styles.heroSub}>
              Trekking, Snow Escapes, Nature Trails &amp; Cultural
              Experiences — all in one place. Book your next SAFAR today.
            </p>

            {/*
              onClick={() => navigate('/explore')}
              Arrow function in JSX event handler
              () => navigate('/explore') = when clicked, go to /explore

              WHY arrow function?
              onClick={navigate('/explore')}  ← WRONG: runs immediately on render
              onClick={() => navigate('/explore')} ← CORRECT: runs only on click
            */}
            <div style={styles.heroBtns}>
              <button
                className="btn-primary-custom"
                onClick={() => navigate('/explore')}
              >
                Explore Events
              </button>
              <button
                className="btn-secondary-custom"
                onClick={() => navigate('/about')}
              >
                Learn More
              </button>
            </div>

            <div style={styles.pills}>
              {/*
                Array.map() in JSX
                ['item1', 'item2'].map(item => <span>{item}</span>)
                Renders one <span> per array item

                key={cat} is REQUIRED for list items
                React uses key to efficiently update the DOM
                Keys must be UNIQUE within the list
              */}
              {['🏔️ Trekking', '❄️ Snow', '🌿 Nature', '🏕️ Adventure'].map(cat => (
                <span key={cat} style={styles.pill}>{cat}</span>
              ))}
            </div>

          </div>

          <div style={styles.heroRight}>
            <img
              src="https://placehold.co/480x380/1D9E75/ffffff?text=SAFAR"
              alt="SAFAR Adventure Events"
              style={styles.heroImg}
            />
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={styles.stats}>
        {/*
          Array of objects — .map() renders each stat
          Cleaner than writing 4 identical <div> blocks manually
        */}
        {[
          { number: '50+',   label: 'Events'          },
          { number: '20+',   label: 'Destinations'    },
          { number: '5000+', label: 'Happy Travelers' },
          { number: '4.9⭐', label: 'Rating'          },
        ].map(stat => (
          <div key={stat.label} style={styles.statItem}>
            <strong style={styles.statNum}>{stat.number}</strong>
            <p style={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── FEATURED EVENTS ── */}
      <div style={styles.eventsSection}>
        <div style={styles.sectionHead}>
          <div>
            <h2 className="section-title">Featured Events</h2>
            <p className="section-subtitle">Hand-picked adventures for you</p>
          </div>
          <button
            className="btn-outline-custom"
            onClick={() => navigate('/explore')}
          >
            View All →
          </button>
        </div>

        {/*
          eventsData.slice(0, 3) → first 3 items only
          slice(start, end) → returns items from index 0 to 2

          Bootstrap-style grid using CSS grid
          repeat(auto-fill, minmax(280px, 1fr)) =
            as many columns as fit, each at least 280px
        */}
        <div style={styles.grid}>
          {eventsData.slice(0, 3).map(evt => (
            /*
              <EventCard /> is our reusable component
              key={evt.id}   → required for lists
              event={evt}    → passing evt as a prop named "event"
                               EventCard receives it as { event }
            */
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '28px' }}>
          <div>
            <h5 className="footer-brand">🧭 SAFAR</h5>
            <p className="footer-text">Explore. Experience. Enjoy the Journey.</p>
            <p className="footer-text"><em>"Every journey tells a story."</em></p>
          </div>
          <div>
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              {[
                { to: '/',             label: 'Home'         },
                { to: '/explore',      label: 'Explore'      },
                { to: '/destinations', label: 'Destinations' },
                { to: '/about',        label: 'About'        },
                { to: '/contact',      label: 'Contact'      },
              ].map(link => (
                <li key={link.to}>
                  <a href="#" onClick={e => { e.preventDefault(); navigate(link.to) }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="footer-heading">Categories</h6>
            <ol className="footer-links">
              <li><a href="#">❄️ Snow Events</a></li>
              <li><a href="#">🏕️ Adventure</a></li>
              <li><a href="#">🏔️ Trekking</a></li>
              <li><a href="#">🌿 Nature</a></li>
            </ol>
          </div>
        </div>
        <hr className="footer-divider" />
        <p className="footer-copy" style={{ textAlign: 'center' }}>
          &copy; 2025 SAFAR &nbsp;|&nbsp; Made by <strong>Vigneshwari</strong> (23SE02CS110) &nbsp;|&nbsp; Savani University
        </p>
      </footer>

    </div>
  )
}

// ── Styles Object ──────────────────────────────────────────
// In React we can write CSS as JS objects
// camelCase property names: backgroundColor NOT background-color
// Values are strings: '20px', 'flex', 'var(--coral)'
const styles = {
  hero: {
    minHeight:  '80vh',
    display:    'flex',
    alignItems: 'center',
    padding:    '60px 48px',
    background: 'linear-gradient(135deg, var(--dark-1) 0%, #1e1b4b 100%)',
    position:   'relative',
    overflow:   'hidden',
  },
  blob1: {
    position:     'absolute', top: '-100px', right: '-100px',
    width:        '500px',    height: '500px',
    background:   'radial-gradient(circle, rgba(232,89,60,0.12), transparent 70%)',
    borderRadius: '50%',      pointerEvents: 'none',
  },
  blob2: {
    position:     'absolute', bottom: '-60px', left: '30%',
    width:        '300px',    height: '300px',
    background:   'radial-gradient(circle, rgba(29,158,117,0.08), transparent 70%)',
    borderRadius: '50%',      pointerEvents: 'none',
  },
  heroInner: {
    display:        'flex',
    alignItems:     'center',
    gap:            '48px',
    flexWrap:       'wrap',
    position:       'relative',
    zIndex:         2,
    width:          '100%',
  },
  heroLeft:  { flex: '1', minWidth: '280px' },
  heroRight: { flex: '1', minWidth: '280px', textAlign: 'center' },
  heroTag: {
    display:       'inline-block',
    background:    'rgba(232,89,60,0.15)',
    border:        '1px solid rgba(232,89,60,0.3)',
    color:         '#F0997B',
    fontSize:      '12px',
    padding:       '6px 16px',
    borderRadius:  '20px',
    marginBottom:  '20px',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontFamily:   'var(--font-heading)',
    fontSize:     'clamp(36px, 5vw, 64px)',
    fontWeight:   900,
    color:        'var(--white)',
    lineHeight:   1.1,
    marginBottom: '20px',
  },
  heroSub: {
    fontSize:     '15px',
    color:        'var(--text-muted)',
    lineHeight:   1.8,
    maxWidth:     '460px',
    marginBottom: '32px',
  },
  heroBtns:  { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' },
  pills:     { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  pill: {
    display:       'inline-block',
    background:    'rgba(255,255,255,0.07)',
    border:        '1px solid rgba(255,255,255,0.12)',
    color:         'var(--text-light)',
    padding:       '6px 14px',
    borderRadius:  '16px',
    fontSize:      '13px',
  },
  heroImg: { borderRadius: '20px', maxWidth: '100%', boxShadow: '0 0 60px rgba(29,158,117,0.2)' },
  stats: {
    display:         'flex',
    justifyContent:  'space-around',
    flexWrap:        'wrap',
    gap:             '16px',
    padding:         '36px 48px',
    background:      'var(--dark-2)',
    borderTop:       '1px solid var(--dark-4)',
    borderBottom:    '1px solid var(--dark-4)',
  },
  statItem: { textAlign: 'center', padding: '12px' },
  statNum: {
    display:    'block',
    fontSize:   '32px',
    fontWeight: 900,
    color:      'var(--coral)',
    fontFamily: 'var(--font-heading)',
  },
  statLabel: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '4px' },
  eventsSection: { padding: '56px 48px', background: 'var(--dark-1)' },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
}