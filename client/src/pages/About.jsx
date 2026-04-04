// ============================================================
// pages/About.jsx
// ============================================================
export default function About() {
  return (
    <div className="tab-page">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'center', marginBottom:'56px' }}>
        <div>
          <h2 className="section-title">About SAFAR</h2>
          <p style={pStyle}>SAFAR is more than just an event booking platform — it's a journey to explore experiences that make life exciting and meaningful.</p>
          <p style={pStyle}>We help people discover adventures, treks, nature escapes, and unique events across India, all in one place.</p>
          <p style={pStyle}>Our goal is to make planning simple, fun, and accessible for everyone who loves travel and exploration.</p>

          {/* Unordered list — <ul> */}
          <h3 style={subHead}>Why Choose SAFAR?</h3>
          <ul style={listStyle}>
            <li>✅ 50+ curated events across India</li>
            <li>✅ Easy OTP-based mobile login</li>
            <li>✅ Expert local guides on every trip</li>
            <li>✅ 100% verified and safe bookings</li>
          </ul>

          {/* Ordered list — <ol> */}
          <h3 style={subHead}>How to Book:</h3>
          <ol style={listStyle}>
            <li>Browse events and pick your adventure</li>
            <li>Login with your mobile OTP</li>
            <li>Select date and number of tickets</li>
            <li>Confirm and get WhatsApp confirmation</li>
          </ol>
        </div>

        <div style={{ textAlign:'center' }}>
          <img
            src="https://placehold.co/480x340/1D9E75/ffffff?text=Our+Story"
            alt="About SAFAR"
            style={{ maxWidth:'100%', borderRadius:'20px', boxShadow:'0 0 40px rgba(29,158,117,0.15)' }}
          />
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'24px' }}>
        {[
          { icon:'🎯', title:'Our Mission', text:'Make adventure accessible for every Indian traveler.'         },
          { icon:'👁️', title:'Our Vision',  text:'Be India\'s most trusted adventure experience platform.'    },
          { icon:'💎', title:'Our Values',  text:'Safety, authenticity, and unforgettable memories.'           },
        ].map(card => (
          <div key={card.title} style={{ background:'var(--dark-3)', border:'1px solid var(--dark-4)', borderRadius:'12px', padding:'28px', textAlign:'center' }}>
            <div style={{ fontSize:'36px', marginBottom:'14px' }}>{card.icon}</div>
            <h3 style={{ fontSize:'17px', fontWeight:700, color:'var(--white)', marginBottom:'10px' }}>{card.title}</h3>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', lineHeight:1.6 }}>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const pStyle    = { color:'rgba(255,255,255,0.7)', lineHeight:1.8, marginBottom:'14px', fontSize:'15px' }
const subHead   = { fontSize:'15px', fontWeight:700, color:'var(--white)', margin:'20px 0 8px' }
const listStyle = { color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:2, paddingLeft:'20px' }