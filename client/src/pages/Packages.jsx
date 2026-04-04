// ============================================================
// pages/Packages.jsx — HTML5 Table + Pricing Cards
// ============================================================
import { useNavigate } from 'react-router-dom'

export default function Packages() {
  const navigate = useNavigate()

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Package Comparison</h2>
        <p className="section-subtitle">Pick the right plan for your adventure</p>
      </div>

      {/* HTML5 Table — MODULE 2 */}
      <div style={{ overflowX:'auto', marginBottom:'48px' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', color:'var(--text-light)' }}>
          <thead>
            <tr>
              {['Feature','Basic','Adventure ⭐','Premium'].map((h, i) => (
                <th key={h} style={{ ...thStyle, background: i === 2 ? 'rgba(232,89,60,0.15)' : 'var(--dark-2)', color: i === 2 ? 'var(--coral)' : 'var(--white)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Duration',      '1 Day',  '3 Days',      '7 Days'      ],
              ['Accommodation', '—',      'Tent Camp',   'Hotel'       ],
              ['Meals',         '—',      '✅ Included', '✅ Included' ],
              ['Expert Guide',  '—',      '✅ Yes',      '✅ Yes'      ],
              ['Transport',     '—',      '—',           '✅ Yes'      ],
              ['Price',         '₹999',   '₹3,499',      '₹8,999'     ],
            ].map(row => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} style={{ ...tdStyle, background: i === 2 ? 'rgba(232,89,60,0.06)' : 'var(--dark-3)', color: i === 2 ? 'var(--coral)' : 'var(--text-light)', fontWeight: i === 0 ? 700 : 400 }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'24px' }}>
        {[
          { name:'Basic',     price:'₹999',   featured:false, features:['✅ 1 Day event','✅ Entry ticket','❌ No accommodation','❌ No meals'] },
          { name:'Adventure', price:'₹3,499', featured:true,  features:['✅ 3 Days event','✅ Tent camp','✅ All meals','✅ Expert guide'] },
          { name:'Premium',   price:'₹8,999', featured:false, features:['✅ 7 Days event','✅ Hotel stay','✅ All meals','✅ Transport'] },
        ].map(pkg => (
          <div key={pkg.name} style={{ ...pkgCard, border: pkg.featured ? '1px solid var(--coral)' : '1px solid var(--dark-4)', background: pkg.featured ? 'rgba(232,89,60,0.05)' : 'var(--dark-3)' }}>
            {pkg.featured && <div style={badge}>Most Popular</div>}
            <div style={{ fontSize:'22px', fontWeight:700, color:'var(--white)', marginBottom:'8px' }}>{pkg.name}</div>
            <div style={{ fontSize:'36px', fontWeight:900, color:'var(--coral)', fontFamily:'var(--font-heading)', marginBottom:'20px' }}>{pkg.price}</div>
            <ul style={{ listStyle:'none', padding:0, marginBottom:'24px', textAlign:'left' }}>
              {pkg.features.map(f => (
                <li key={f} style={{ fontSize:'14px', color:'var(--text-muted)', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>{f}</li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/contact')}
              className={pkg.featured ? 'btn-primary-custom' : 'btn-outline-custom'}
              style={{ width:'100%' }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const thStyle = { padding:'16px', textAlign:'center', border:'1px solid var(--dark-4)', fontSize:'14px' }
const tdStyle = { padding:'14px 16px', textAlign:'center', border:'1px solid var(--dark-4)', verticalAlign:'middle' }
const pkgCard = { borderRadius:'12px', padding:'28px 24px', textAlign:'center' }
const badge   = { display:'inline-block', background:'var(--coral)', color:'var(--white)', fontSize:'11px', fontWeight:700, padding:'4px 12px', borderRadius:'10px', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'0.5px' }