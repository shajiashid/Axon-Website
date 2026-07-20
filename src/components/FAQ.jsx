'use client'
import { useEffect, useRef, useState } from 'react'
import FloatingHeading from './FloatingHeading.jsx'

const FAQS = [
  {
    q: 'What does Axon Careers help with?',
    a: 'We guide nurses through the entire journey to New Zealand and Australia — registration (NCNZ / AHPRA / ANMAC), exam training (IQN, OSCE, OET, IELTS, NCLEX), job placement, visa & relocation, and permanent residency.',
  },
  {
    q: 'Which countries do you focus on?',
    a: 'Our core focus is New Zealand and Australia, where demand for internationally qualified nurses is consistently strong. We also support Ireland nursing registration and student-visa pathways for the UK, New Zealand, and France.',
  },
  {
    q: 'What are the English language requirements?',
    a: 'For NCNZ registration you generally need IELTS Academic 7.0 in reading, listening and speaking with 6.5 in writing, or OET 350 in reading, listening and speaking with 300 in writing. The NCNZ does not accept PTE, and scores can be combined across more than one sitting within three years.',
  },
  {
    q: 'What is TruMerit (formerly CGFNS)?',
    a: 'TruMerit is the external organisation authorised by the NCNZ to verify and authenticate your documents. You must complete TruMerit verification first — you cannot apply directly to the Nursing Council until your credentials are verified.',
  },
  {
    q: 'Which exams will I need to pass?',
    a: 'Typically an English test (OET or IELTS) plus a competency exam such as IQN, NCLEX, or OSCE — depending on your destination and pathway.',
  },
  {
    q: 'Do I have to sit the OSCE, and where is it held?',
    a: 'Some nurses must complete a competence assessment — a theoretical exam at a Pearson VUE centre, plus a two-day OPC and the OSCE. The OPC and OSCE are held in person at the Nurse Maude Simulation & Assessment Centre in Christchurch: 10 stations for Registered Nurses, 8 for Enrolled Nurses, with up to three attempts.',
  },
  {
    q: 'Can I apply from overseas?',
    a: 'Yes. The theoretical exam can be taken at Pearson VUE centres overseas or in New Zealand, but the OPC and OSCE must be completed in person in Christchurch. You do not need a job offer to apply.',
  },
  {
    q: 'What if I am already registered in Australia?',
    a: 'Nurses currently registered in Australia apply to New Zealand through the separate Trans-Tasman Mutual Recognition (TTMR) pathway, which has different requirements. We support both the standard overseas route and the TTMR pathway.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'It varies per person, but with structured guidance most nurses move from registration to placement within 6–12 months. Nursing is on New Zealand’s Green List, so you can apply for residence after two years of work.',
  },
  {
    q: 'Do you guarantee a job placement?',
    a: 'We can’t guarantee outcomes, but we connect you with verified employers and prepare you thoroughly so you interview with confidence.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free consultation through the contact form and our advisors will map out a personalised, step-by-step roadmap for you.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(-1)
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
    <section id="faq" className="section faq" ref={ref}>
      <div className="container faq__grid">
        <div className="faq__head">
          <FloatingHeading
            text="Frequently asked questions"
            className="faq__title"
            accent
            playful
          />
        </div>

        <div className={`faq__list ${inView ? 'faq__list--in' : ''}`}>
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  type="button"
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div className="faq-item__panel">
                  <div className="faq-item__panel-inner">
                    <p className="faq-item__a">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}