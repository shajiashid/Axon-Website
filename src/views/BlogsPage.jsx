'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FloatingHeading from '../components/FloatingHeading.jsx'
import Contact from '../components/Contact.jsx'
import { BLOGS } from '../data/blogs.js'

export default function BlogsPage() {
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
      { threshold: 0.05 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <main className="blogpage" ref={ref}>
      <div className="container">
        <div className="blogpage__head">
          <FloatingHeading
            as="h1"
            text="Explore the Blog"
            className="blogpage__title"
            accent
            playful
          />
        </div>

        <div className={`blogpage__grid ${inView ? 'blogpage__grid--in' : ''}`}>
          {BLOGS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blogs/${p.slug}`}
              className="blogcard"
              style={{ transitionDelay: `${Math.min(i, 8) * 55}ms` }}
            >
              <div className="blogcard__media">
                <img src={p.img} alt="" loading="lazy" />
              </div>
              <span className="blogcard__date">{p.date}</span>
              <h3 className="blogcard__title">{p.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      <Contact />
    </main>
  )
}
