// ============================================================
// pages/Contact.jsx — Form with React Validation
// KEY CONCEPT: useState for form fields + error messages
//
// COMPARE WITH PHASE 1:
// Phase 1: JavaScript grabbed values with document.getElementById()
//          then changed DOM manually (element.textContent = 'error')
//
// Phase 2: React stores every field value in STATE
//          When state changes → React re-renders → UI updates
//          No manual DOM manipulation needed at all!
// ============================================================
import { useState } from 'react'

export default function Contact() {

  // One state object for all form fields
  // This is a common React pattern: one useState for the whole form
  const [form, setForm] = useState({
    name:     '',
    email:    '',
    mobile:   '',
    category: '',
    message:  '',
    group:    'solo',
    terms:    false,
  })

  // Separate state for error messages
  const [errors, setErrors] = useState({})

  // State for success message visibility
  const [submitted, setSubmitted] = useState(false)

  // ── Handle input changes ────────────────────────────────
  // ONE handler for ALL inputs (instead of one per field)
  // e.target.name  = the name="" attribute of the input
  // e.target.value = what the user typed
  // e.target.type  = 'checkbox', 'text', etc.
  // e.target.checked = for checkboxes (true/false)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      // Spread operator: copies all previous form values
      // Then overwrites just the changed field
      ...prev,
      [name]: type === 'checkbox' ? checked : value
      // [name] = computed property name
      // If name is "email", this sets form.email = value
    }))
  }

  // ── Validate form ───────────────────────────────────────
  const validate = () => {
    // Start with empty errors object
    const newErrors = {}

    if (!form.name.trim())
      newErrors.name = 'Please enter your full name.'
    else if (form.name.trim().length < 3)
      newErrors.name = 'Name must be at least 3 characters.'

    if (!form.email.trim())
      newErrors.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email.'

    if (!form.mobile.trim())
      newErrors.mobile = 'Please enter your mobile number.'
    else if (!/^[0-9]{10}$/.test(form.mobile))
      newErrors.mobile = 'Enter a valid 10-digit number.'

    if (!form.terms)
      newErrors.terms = 'Please agree to the Terms & Conditions.'

    // setErrors updates the errors state → React re-renders
    // Error messages appear below each field automatically
    setErrors(newErrors)

    // Object.keys(newErrors).length === 0 means no errors
    return Object.keys(newErrors).length === 0
  }

  // ── Handle form submit ──────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault() // prevent page reload

    if (validate()) {
      setSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setForm({ name:'', email:'', mobile:'', category:'', message:'', group:'solo', terms:false })
        setSubmitted(false)
        setErrors({})
      }, 3000)
    }
  }

  return (
    <div className="tab-page">
      <div className="section-header">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">Book your adventure or send a message</p>
      </div>

      <div style={{ maxWidth:'700px', margin:'0 auto' }}>
        <form onSubmit={handleSubmit} noValidate className="safar-form">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>

            {/* Name */}
            <div style={{ gridColumn:'1' }}>
              <label htmlFor="name" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              {/*
                value={form.name}           → React controls the input value
                onChange={handleChange}     → updates form state on each keystroke
                This is called a CONTROLLED INPUT
                React holds the value in state, not the browser
              */}
              <input
                type="text" id="name" name="name"
                className="form-control"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
              {/* Conditional rendering: only show if error exists */}
              {errors.name && <div className="error-msg">{errors.name}</div>}
            </div>

            {/* Email */}
            <div style={{ gridColumn:'2' }}>
              <label htmlFor="email" className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email" id="email" name="email"
                className="form-control"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-msg">{errors.email}</div>}
            </div>

            {/* Mobile */}
            <div style={{ gridColumn:'1' }}>
              <label htmlFor="mobile" className="form-label">
                Mobile <span className="required">*</span>
              </label>
              <input
                type="tel" id="mobile" name="mobile"
                className="form-control"
                placeholder="10-digit number"
                maxLength="10"
                value={form.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <div className="error-msg">{errors.mobile}</div>}
            </div>

            {/* Category Select */}
            <div style={{ gridColumn:'2' }}>
              <label htmlFor="category" className="form-label">Interested In</label>
              <select
                id="category" name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">-- Select category --</option>
                <option value="snow">❄️ Snow Events</option>
                <option value="adventure">🏕️ Adventure</option>
                <option value="trekking">🏔️ Trekking</option>
                <option value="nature">🌿 Nature Escapes</option>
              </select>
            </div>

            {/* Textarea */}
            <div style={{ gridColumn:'1 / -1' }}>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message" name="message"
                className="form-control"
                rows="4"
                placeholder="Tell us about your dream adventure..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {/* Radio Buttons */}
            <div style={{ gridColumn:'1 / -1' }}>
              <label className="form-label">Group Size</label>
              <div style={{ display:'flex', gap:'24px', flexWrap:'wrap' }}>
                {['solo', 'couple', 'group'].map(g => (
                  <label key={g} style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.7)', cursor:'pointer' }}>
                    <input
                      type="radio" name="group"
                      value={g}
                      checked={form.group === g}
                      onChange={handleChange}
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                    {g === 'group' ? ' (4+)' : ''}
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox */}
            <div style={{ gridColumn:'1 / -1' }}>
              <label style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.7)', cursor:'pointer' }}>
                <input
                  type="checkbox" name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
                I agree to the <a href="#" style={{ color:'var(--coral)' }}>Terms &amp; Conditions</a>
              </label>
              {errors.terms && <div className="error-msg">{errors.terms}</div>}
            </div>

            {/* Submit */}
            <div style={{ gridColumn:'1 / -1' }}>
              <button type="submit" className="btn-submit">
                Send Message 🚀
              </button>
            </div>

            {/* Success message — only renders when submitted is true */}
            {submitted && (
              <div style={{ gridColumn:'1 / -1' }}>
                <div className="success-msg">
                  ✅ Message sent! We'll contact you soon.
                </div>
              </div>
            )}

          </div>
        </form>
      </div>
    </div>
  )
}