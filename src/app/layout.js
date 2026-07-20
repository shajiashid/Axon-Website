import '../styles/global.css'
import '../styles/app.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'

export const metadata = {
  title: 'Axon Careers — Nursing Careers in New Zealand & Australia',
  description:
    'Axon Careers — Structured guidance for nursing registration, exam training, job assistance, and PR support, focused on New Zealand & Australia.',
  icons: { icon: '/assets/logo-a.svg' },
}

const FONTS =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Sans+Malayalam:wght@400;500&family=Noto+Sans+Tamil:wght@400;500&family=Noto+Sans+Telugu:wght@400;500&family=Noto+Sans+Kannada:wght@400;500&family=Noto+Sans+Gurmukhi:wght@400;500&family=Noto+Sans+Arabic:wght@400;500&display=swap'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS} rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
