'use client'
import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import ServiceCards from '../components/ServiceCards.jsx'
import Services from '../components/Services.jsx'
import Blogs from '../components/Blogs.jsx'
import Feature from '../components/Feature.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'
import useReveal from '../hooks/useReveal.js'

export default function HomePage() {
  useReveal()

  // If arriving with a hash (e.g. /#services from another page), scroll to it.
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <ServiceCards />
      <Services />
      <Blogs />
      <Feature />
      <FAQ />
      <Contact />
    </main>
  )
}
