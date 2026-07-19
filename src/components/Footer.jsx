import { useEffect, useRef, useState } from 'react'

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Nursing Registration', href: '#services' },
      { label: 'Exam Training', href: '#services' },
      { label: 'Job Assistance', href: '#services' },
      { label: 'PR Support', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Services', href: '#services' },
      { label: 'Blog', href: '#blogs' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Resources', href: '#blogs' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/legal/terms.html', external: true },
      { label: 'Privacy Policy', href: '/legal/privacy.html', external: true },
      { label: 'Cookie Policy', href: '/legal/cookies.html', external: true },
    ],
  },
]

const ICON = {
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  'aria-hidden': true,
}

const SOCIALS = [
  {
    name: 'Instagram',
    icon: (
      <svg {...ICON} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    icon: (
      <svg {...ICON} fill="currentColor">
        <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8.5v3h2v7h3v-7H16l.5-3h-3V9.6c0-.4.3-.6.6-.6z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg {...ICON} fill="currentColor">
        <path d="M21.6 7.2c-.2-1-.9-1.7-1.9-2C18 4.8 12 4.8 12 4.8s-6 0-7.7.4c-1 .3-1.7 1-1.9 2C2 8.9 2 12 2 12s0 3.1.4 4.8c.2 1 .9 1.7 1.9 2 1.7.4 7.7.4 7.7.4s6 0 7.7-.4c1-.3 1.7-1 1.9-2C22 15.1 22 12 22 12s0-3.1-.4-4.8zM10 15V9l5 3-5 3z" />
      </svg>
    ),
  },
  {
    name: 'X',
    icon: (
      <svg {...ICON} fill="currentColor">
        <path d="M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.7-6.1L5.7 21H2.6l7-8.1L2.5 3h6.1l4.3 5.6L17.5 3zm-1 16h1.7L7.6 4.8H5.8L16.5 19z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg {...ICON} fill="currentColor">
        <path d="M6.5 8.5v9h-3v-9h3zM5 4a1.8 1.8 0 1 1 0 3.6A1.8 1.8 0 0 1 5 4zm5 4.5h2.9v1.2c.4-.7 1.4-1.5 3-1.5 3.2 0 3.6 2 3.6 4.7v4.6h-3v-4c0-1-.2-2.2-1.5-2.2s-1.6 1-1.6 2.1v4.1h-3v-9z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    icon: (
      <svg {...ICON} fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3z" />
      </svg>
    ),
  },
]

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [lit, setLit] = useState(false)
  const wordmarkRef = useRef(null)

  // Sweep light through the wordmark once it scrolls into view.
  useEffect(() => {
    const el = wordmarkRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (isEmail(email)) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      <div className="footer__card">
        <div className="container footer__inner">
          {/* Newsletter */}
        <div className="footer__news">
          <span className="footer__eyebrow">Newsletter</span>
          <p className="footer__news-title">
            Get nursing-abroad tips and updates from Axon Careers
          </p>
          {subscribed ? (
            <p className="footer__news-done">✓ Thanks — you're subscribed.</p>
          ) : (
            <form className="footer__news-form" onSubmit={onSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
              />
              <button type="submit" className="footer__subscribe">
                Subscribe <span aria-hidden="true">›</span>
              </button>
            </form>
          )}
        </div>

        <div className="footer__divider" />

        {/* Socials */}
        <div className="footer__socials">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href="#home"
              className="footer__social"
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="footer__divider" />

        {/* Link columns */}
        <div className="footer__cols">
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer__col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations */}
        <div className="footer__locations">
          {['India', 'UAE', 'New Zealand'].map((loc) => (
            <span className="footer__region" key={loc}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {loc}
            </span>
          ))}
        </div>

        {/* Wordmark */}
        <div
          className={`footer__wordmark ${lit ? 'is-lit' : ''}`}
          ref={wordmarkRef}
          aria-hidden="true"
        >
          AXON CAREERS
        </div>

        <p className="footer__copy">© 2026 Axon Careers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
