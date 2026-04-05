// pages/Contact.jsx — Sends form data to MongoDB via Node.js API
// MODULE 6: useState, controlled form
// MODULE 7+8: POST to Node.js → saves to MongoDB

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', category: '', message: '', group: 'solo',
  })
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim())   newErrors.name   = 'Please enter your name.'
    if (!form.email.trim())  newErrors.email  = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email.'
    if (!form.mobile.trim()) newErrors.mobile = 'Please enter your mobile.'
    else if (!/^[0-9]{10}$/.test(form.mobile)) newErrors.mobile = 'Enter valid 10-digit number.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      // POST to Node.js backend → saves to MongoDB
      const res = await fetch('http://localhost:5000/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setForm({ name:'', email:'', mobile:'', category:'', message:'', group:'solo' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        alert('Error: ' + data.message)
      }
    } catch (err) {
      alert('Server not running! Start the backend first.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Your message will be saved to our database</p>
      </div>

      <div style={{ maxWidth:'700px', margin:'0 auto' }}>
        <form onSubmit={handleSubmit} noValidate className="safar-form">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>

            <div>
              <label className="form-label">Full Name <span className="required">*</span></label>
              <input type="text" name="name" className="form-control" placeholder="Your full name" value={form.name} onChange={handleChange} />
              {errors.name && <div className="error-msg">{errors.name}</div>}
            </div>

            <div>
              <label className="form-label">Email <span className="required">*</span></label>
              <input type="email" name="email" className="form-control" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              {errors.email && <div className="error-msg">{errors.email}</div>}
            </div>

            <div>
              <label className="form-label">Mobile <span className="required">*</span></label>
              <input type="tel" name="mobile" className="form-control" placeholder="10-digit number" maxLength="10" value={form.mobile} onChange={handleChange} />
              {errors.mobile && <div className="error-msg">{errors.mobile}</div>}
            </div>

            <div>
              <label className="form-label">Interested In</label>
              <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                <option value="">-- Select category --</option>
                <option value="snow">❄️ Snow Events</option>
                <option value="adventure">🏕️ Adventure</option>
                <option value="trekking">🏔️ Trekking</option>
                <option value="nature">🌿 Nature Escapes</option>
              </select>
            </div>

            <div style={{ gridColumn:'1 / -1' }}>
              <label className="form-label">Message</label>
              <textarea name="message" className="form-control" rows="4" placeholder="Tell us about your dream adventure..." value={form.message} onChange={handleChange} />
            </div>

            <div style={{ gridColumn:'1 / -1' }}>
              <label className="form-label">Group Size</label>
              <div style={{ display:'flex', gap:'24px' }}>
                {['solo','couple','group'].map(g => (
                  <label key={g} style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.7)', cursor:'pointer' }}>
                    <input type="radio" name="group" value={g} checked={form.group===g} onChange={handleChange} />
                    {g.charAt(0).toUpperCase()+g.slice(1)}{g==='group'?' (4+)':''}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ gridColumn:'1 / -1' }}>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message 🚀'}
              </button>
            </div>

            {submitted && (
              <div style={{ gridColumn:'1 / -1' }}>
                <div className="success-msg">
                  ✅ Message saved to database! We'll contact you soon.
                </div>
              </div>
            )}

          </div>
        </form>

        <div style={{ marginTop:'32px', padding:'20px', background:'var(--dark-3)', borderRadius:'12px', border:'1px solid var(--dark-4)' }}>
          <p style={{ color:'var(--text-muted)', fontSize:'13px', marginBottom:'8px' }}>📊 To see all submitted messages, visit:</p>
          <a href="http://localhost:5000/api/contact" target="_blank" rel="noreferrer" style={{ color:'var(--coral)', fontSize:'13px' }}>
            http://localhost:5000/api/contact
          </a>
        </div>
      </div>
    </div>
  )
}