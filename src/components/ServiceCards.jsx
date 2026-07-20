'use client'
import { useEffect, useRef, useState } from 'react'
import FloatingHeading from './FloatingHeading.jsx'

const ICONS = {
  registration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4h6a1 1 0 0 1 1 1 1 1 0 0 1-1 1H9a1 1 0 0 1-1-1 1 1 0 0 1 1-1z" />
      <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  exam: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  job: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  ),
  transparency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
}

const CARDS = [
  {
    icon: 'registration',
    title: 'Registration Support',
    desc: 'End-to-end support for New Zealand Nursing Registration, Australia Nursing Registration, AHPRA, and ANMAC. We guide nurses through every step of the registration process, making their journey simple, smooth, and stress-free.',
  },
  {
    icon: 'exam',
    title: 'Exam Coaching',
    desc: 'Comprehensive coaching for IQN, OSCE, NCLEX, OET, and IELTS, with structured training, expert guidance, mock exams, and competency-based preparation to help you pass with confidence.',
  },
  {
    icon: 'job',
    title: 'Nurses Job Support',
    desc: 'Axon Careers provides strong employer access and dedicated job support, connecting nurses with trusted healthcare employers across New Zealand and Australia.',
  },
  {
    icon: 'transparency',
    title: 'Total Transparency',
    desc: 'At Axon Careers, we believe in complete transparency. From course fees and registration requirements to timelines and career pathways, we provide clear, honest guidance with no hidden costs or false promises.',
  },
]

export default function ServiceCards() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="support" className="section scards" ref={ref}>
      <div className="container">
        <FloatingHeading
          className="scards__title"
          text="End-to-end support,"
          muted="at every step of your nursing journey."
          accent
          playful
        />

        <div className={`scards__grid ${inView ? 'scards__grid--in' : ''}`}>
          {CARDS.map((c, i) => (
            <article
              key={c.title}
              className="scard"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="scard__icon" aria-hidden="true">
                {ICONS[c.icon]}
              </span>
              <div className="scard__body">
                <h3 className="scard__title">{c.title}</h3>
                <p className="scard__desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}