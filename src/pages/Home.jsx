import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import ServiceCards from '../components/ServiceCards.jsx'
import Services from '../components/Services.jsx'
import Blogs from '../components/Blogs.jsx'
import Feature from '../components/Feature.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Home() {
  useReveal()
  const { state } = useLocation()

  // When arriving from another page with a target section, scroll to it.
  useEffect(() => {
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo)
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: 'smooth' }),
        )
      }
    }
  }, [state])

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
