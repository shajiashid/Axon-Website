'use client'
import { useEffect, useRef, useState } from 'react'
import FloatingHeading from './FloatingHeading.jsx'
import Counter from './Counter.jsx'

const STATS = [
  {
    label: 'IQN',
    target: 100,
    suffix: '%',
    desc: 'Success rate for the IQN theory exam.',
  },
  {
    label: 'OSCE',
    target: 95,
    suffix: '%',
    desc: 'Success rate across our OSCE cohorts.',
  },
  {
    label: 'Reach',
    value: '1,200–3,000',
    desc: 'Internationally trained nurses guided to successful careers in New Zealand and Australia.',
  },
]

export default function Feature() {
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
      { threshold: 0.15 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="feature" className="section feature" ref={ref}>
      <div
        className={`container feature__inner ${inView ? 'feature__inner--in' : ''}`}
      >
        <div className="feature__intro">
          <FloatingHeading
            text={'Nursing journey to New Zealand\n& Australia, handled with care'}
            className="feature__title"
            accent
            playful
          />
          <p className="feature__text">
            Your nursing journey to Australia or New Zealand doesn&apos;t have to
            be complicated. From language tests and licensing exams to nursing
            registration, job placement, visas, and permanent residency, Axon
            Careers provides end-to-end guidance at every stage. We simplify the
            entire process, so you can focus on achieving your dream of an
            international nursing career.
          </p>
        </div>

        <div className="feature__stats">
          {STATS.map((s) => (
            <div className="feature__stat" key={s.label}>
              <span className="feature__stat-label">{s.label}</span>
              <span
                className={`feature__stat-value ${s.value ? 'feature__stat-value--range' : ''}`}
              >
                {s.value ? (
                  s.value
                ) : (
                  <Counter target={s.target} suffix={s.suffix} />
                )}
              </span>
              <span className="feature__stat-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}