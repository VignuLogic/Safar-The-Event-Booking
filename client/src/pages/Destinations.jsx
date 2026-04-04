// ============================================================
// pages/Destinations.jsx
// KEY CONCEPT: useState for slider position
// ============================================================
import { useState } from 'react'

const slides = [
  { name: 'Jammu',      img: 'https://placehold.co/300x200/1a1a2e/E8593C?text=Jammu'     },
  { name: 'Manali',     img: 'https://placehold.co/300x200/0f3460/ffffff?text=Manali'     },
  { name: 'Dalhousie',  img: 'https://placehold.co/300x200/993C1D/ffffff?text=Dalhousie'  },
  { name: 'Ahmedabad',  img: 'https://placehold.co/300x200/0F6E56/ffffff?text=Ahmedabad'  },
  { name: 'Bangalore',  img: 'https://placehold.co/300x200/534AB7/ffffff?text=Bangalore'  },
  { name: 'Kutch',      img: 'https://placehold.co/300x200/BA7517/ffffff?text=Kutch'      },
]

export default function Destinations() {
  // useState stores current slide index (0 = first slide)
  const [index, setIndex] = useState(0)

  // Show 3 slides at a time
  const visible = slides.slice(index, index + 3)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(slides.length - 3, i + 1))

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-subtitle">From snowy peaks to desert sands</p>
      </div>

      {/* Slider */}
      <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'48px' }}>
        <button onClick={prev} style={btnStyle} disabled={index === 0}>&#8592;</button>
        <div style={{ display:'flex', gap:'16px', flex:1, overflow:'hidden' }}>
          {/*
            In React we .slice() the array and render only visible slides
            No need for CSS transform translateX tricks from Phase 1
            State drives what renders — this is the React way
          */}
          {visible.map(slide => (
            <figure key={slide.name} style={{ flex:1, textAlign:'center', margin:0 }}>
              <img src={slide.img} alt={slide.name} style={{ width:'100%', height:'190px', objectFit:'cover', borderRadius:'12px', display:'block' }} />
              <figcaption style={{ color:'var(--text-muted)', fontSize:'13px', marginTop:'10px', letterSpacing:'1px' }}>
                {slide.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <button onClick={next} style={btnStyle} disabled={index >= slides.length - 3}>&#8594;</button>
      </div>

      {/* Destination Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'24px' }}>
        {[
          { icon:'❄️', name:'Snow Destinations', places:['Jammu & Kashmir','Manali, Himachal Pradesh','Dalhousie'], desc:'Pristine snow, frozen lakes and scenic mountain passes.' },
          { icon:'🏕️', name:'Adventure Spots',   places:['Kutch, Gujarat','Bangalore, Karnataka','Ahmedabad'],    desc:'Desert camps, city adventures and cultural explorations.' },
          { icon:'🌿', name:'Nature Escapes',    places:['Valley of Flowers','Coorg, Karnataka','Wayanad, Kerala'],desc:'Lush forests, waterfalls and peaceful nature trails.' },
        ].map(dest => (
          <div key={dest.name} style={cardStyle}>
            <h3 style={{ fontSize:'18px', fontWeight:700, color:'var(--white)', marginBottom:'14px' }}>{dest.icon} {dest.name}</h3>
            <ul style={{ paddingLeft:'18px', color:'var(--text-muted)', fontSize:'14px', lineHeight:2, marginBottom:'12px' }}>
              {dest.places.map(p => <li key={p}>{p}</li>)}
            </ul>
            <p style={{ fontSize:'13px', color:'var(--text-muted)', lineHeight:1.6 }}>{dest.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const btnStyle = {
  background:'rgba(255,255,255,0.06)', border:'1px solid var(--dark-4)',
  color:'var(--text-light)', width:'44px', height:'44px',
  borderRadius:'50%', cursor:'pointer', fontSize:'18px', flexShrink:0,
  display:'flex', alignItems:'center', justifyContent:'center',
  transition:'var(--transition)',
}

const cardStyle = {
  background:'var(--dark-3)', border:'1px solid var(--dark-4)',
  borderRadius:'12px', padding:'24px',
}