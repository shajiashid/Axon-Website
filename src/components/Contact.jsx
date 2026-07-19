import { useEffect, useRef, useState } from 'react'
import FloatingHeading from './FloatingHeading.jsx'

const EMPTY = { name: '', email: '', phone: '', destination: 'New Zealand', message: '' }

// Where enquiry submissions are sent.
const ENQUIRY_EMAILS = ['osceapplication@gmail.com', 'info@axoncareers.co.nz']

// Compose a pre-filled email (recipients + all answers) for the mailto scheme.
function buildMailto(values) {
  const lines = [
    'New nursing enquiry',
    '',
    `Full name: ${values.name.trim() || '—'}`,
    `Email: ${values.email.trim() || '—'}`,
    `Phone: ${values.phone.trim() || '—'}`,
    `Preferred destination: ${values.destination || '—'}`,
    '',
    'Goals:',
    values.message.trim() || '—',
  ]
  const subject = `Nursing enquiry — ${values.name.trim() || 'Website'}`
  return `mailto:${ENQUIRY_EMAILS.join(',')}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join('\n'))}`
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (values.phone && !/^[+()\d\s-]{7,}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number'
  }
  if (!values.message.trim()) errors.message = 'Tell us a little about your goals'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [mailtoUrl, setMailtoUrl] = useState('')
  const sectionRef = useRef(null)

  // Self-contained reveal so the section shows on every page (Home, About,
  // Blogs, post pages) without depending on the global useReveal hook.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const reveals = el.querySelectorAll('.reveal')
    const show = () => reveals.forEach((r) => r.classList.add('is-visible'))

    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show()
            io.disconnect()
          }
        },
        { threshold: 0.12 },
      )
      io.observe(el)
    } else {
      show()
    }

    // Safety net: never leave the section invisible if the observer
    // hasn't fired (e.g. it's already on-screen on a short page).
    const fallback = setTimeout(show, 1400)
    return () => {
      if (io) io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      // Static site (no backend): send the enquiry as a pre-filled email
      // to our advisors' inboxes via the visitor's mail app.
      const mailto = buildMailto(values)
      setMailtoUrl(mailto)
      setSent(true)
      setValues(EMPTY)
      window.location.href = mailto
    }
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container contact__grid">
        <div className="contact__intro reveal">
          <FloatingHeading
            className="section-title contact__title"
            text="Start your nursing journey today"
            accent
            playful
          />
          <p className="contact__lead">
            Share a few details and our advisors will get back to you within one
            business day with a personalised roadmap.
          </p>
          <ul className="contact__info">
            <li>
              <span aria-hidden="true">✉️</span>
              <a href="mailto:info@axoncareers.co.nz">info@axoncareers.co.nz</a>
            </li>
            <li>
              <span aria-hidden="true">🇮🇳</span>
              <a href="tel:+919947082800">+91 99470 82800</a>
            </li>
            <li>
              <span aria-hidden="true">🇦🇪</span>
              <a href="tel:+971558104647">+971 55 810 4647</a>
            </li>
            <li>
              <span aria-hidden="true">🇳🇿</span>
              <a href="tel:+64226822322">+64 22 682 2322</a>
            </li>
            <li>
              <span aria-hidden="true">📍</span> Focused on New Zealand &amp; Australia
            </li>
          </ul>
        </div>

        <form className="contact__form reveal" onSubmit={onSubmit} noValidate>
          {sent && (
            <div className="contact__success" role="status">
              ✓ Thank you! We&apos;ve prepared an email with your details —
              please review it in your mail app and press <strong>Send</strong>{' '}
              to reach our advisors.
              {mailtoUrl && (
                <a className="contact__success-link" href={mailtoUrl}>
                  Open the email &amp; send
                </a>
              )}
            </div>
          )}

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={update}
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="field__error">{errors.name}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={update}
                placeholder="jane@email.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                value={values.phone}
                onChange={update}
                placeholder="+91 ..."
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="field__error">{errors.phone}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="destination">Preferred destination</label>
            <select
              id="destination"
              name="destination"
              value={values.destination}
              onChange={update}
            >
              <option>New Zealand</option>
              <option>Australia</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Your goals</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={update}
              placeholder="Tell us about your nursing background and where you'd like to go..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <span className="field__error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary contact__submit">
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  )
}
