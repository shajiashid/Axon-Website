'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FloatingHeading from './FloatingHeading.jsx'
import { BLOGS } from '../data/blogs.js'

const POSTS = BLOGS.slice(0, 4)

export default function Blogs() {
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
      { threshold: 0.1 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="blogs" className="section blogs" ref={ref}>
      <div className="container">
        <div className="blogs__head">
          <FloatingHeading
            text="Explore the Blog"
            className="blogs__title"
            accent
            playful
          />
        </div>

        <div className={`blog-list ${inView ? 'blog-list--in' : ''}`}>
          {POSTS.map((p, i) => (
            <article
              key={p.slug}
              className="blog-row"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="blog-row__body">
                <h3 className="blog-row__title">{p.title}</h3>
                <p className="blog-row__excerpt">{p.excerpt}</p>
                <Link href={`/blogs/${p.slug}`} className="blog-row__link">
                  Read more
                  <span className="blog-row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
              <Link
                href={`/blogs/${p.slug}`}
                className="blog-row__media"
                aria-label={p.title}
              >
                <img src={p.img} alt="" loading="lazy" />
              </Link>
            </article>
          ))}
        </div>

        <div className="blogs__more">
          <Link href="/blogs" className="btn btn-outline blogs__more-btn">
            View more articles
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
