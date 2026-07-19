import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { ENROLL_LINKS } from '../data/enrollForms.js'

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', to: '/about' },
  { label: 'Enrollment Forms', dropdown: ENROLL_LINKS },
  { label: 'Our Services', id: 'services' },
  { label: 'Blogs', to: '/blogs' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropOpen, setDropOpen] = useState(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeAll = () => {
    setOpen(false)
    setDropOpen(null)
  }

  // Scroll to a home-page section (navigate home first if elsewhere).
  const goToSection = (id) => (e) => {
    e.preventDefault()
    closeAll()
    if (isHome) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  // On non-home pages the nav always shows its solid floating style.
  const solid = scrolled || !isHome

  return (
    <header className={`nav ${solid ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Logo />

        <nav className={`nav__menu ${open ? 'nav__menu--open' : ''}`}>
          <ul className="nav__links">
            {LINKS.map((link) => {
              if (link.dropdown) {
                const isOpen = dropOpen === link.label
                return (
                  <li
                    key={link.label}
                    className={`nav__item nav__item--drop ${isOpen ? 'is-open' : ''}`}
                    onMouseEnter={() => setDropOpen(link.label)}
                    onMouseLeave={() => setDropOpen(null)}
                  >
                    <button
                      type="button"
                      className="nav__droptrigger"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setDropOpen((v) => (v === link.label ? null : link.label))
                      }
                    >
                      {link.label}
                      <span className="nav__caret" aria-hidden="true" />
                    </button>
                    <ul className="nav__submenu">
                      {link.dropdown.map((d) => (
                        <li key={d.type}>
                          <Link to={d.to} onClick={closeAll}>
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }
              return link.to ? (
                <li key={link.label} className="nav__item">
                  <Link to={link.to} onClick={closeAll}>
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label} className="nav__item">
                  <a href={`/#${link.id}`} onClick={goToSection(link.id)}>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href="/#contact"
            className="btn btn-light nav__cta nav__cta--mobile"
            onClick={goToSection('contact')}
          >
            Contact Us
          </a>
        </nav>

        <a
          href="/#contact"
          className="btn btn-light nav__cta nav__cta--desktop"
          onClick={goToSection('contact')}
        >
          Contact Us
        </a>

        <button
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && <div className="nav__backdrop" onClick={closeAll} />}
    </header>
  )
}
