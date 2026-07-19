import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import BlogPost from './pages/BlogPost.jsx'
import EnrollForm from './pages/EnrollForm.jsx'
import './styles/app.css'

// Scroll to top on route change (unless navigating to a specific section).
function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo(0, 0)
  }, [pathname, state])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/enroll/:type" element={<EnrollForm />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
