import { useState } from 'react'
import FloatingHeading from '../components/FloatingHeading.jsx'
import Contact from '../components/Contact.jsx'

const VIDEO_ID = '_WYadyXW5Ug'

const WHY = [
  {
    title: 'Deep, specialist expertise',
    desc: 'We focus exclusively on nursing registration, immigration, and placement — and stay current with every NCNZ, AHPRA, and TruMerit update so you don’t have to.',
  },
  {
    title: 'End-to-end guidance',
    desc: 'From eligibility and document verification to exams, jobs, visas, and PR, you have one team and a single point of contact for the whole journey.',
  },
  {
    title: 'Total transparency',
    desc: 'Clear, honest communication at every stage — fees, timelines, and pathways explained upfront, with no hidden surprises.',
  },
  {
    title: 'Dedicated support',
    desc: 'We keep you informed of your status, remind you of deadlines, and answer your questions promptly — treating your goals as our own.',
  },
]

const STATS = [
  { value: '1,200–3,000', label: 'Nurses guided to NZ & Australia' },
  { value: '100%', label: 'IQN theory exam success rate' },
  { value: '95%', label: 'OSCE cohort success rate' },
]

const TEAM = [
  {
    name: 'Rochelle Clark',
    role: 'Head of OSCE Education',
    img: '/assets/team/rochelle.jpg',
  },
  { name: 'Ness Brewster', role: 'OSCE Educator', img: '/assets/team/ness.jpg' },
  { name: 'Gemma Taylor', role: 'OSCE Educator', img: '/assets/team/gemma.jpg' },
  { name: 'Anna Grace Doak', role: 'Clinical Educator', img: '/assets/team/anna.jpg' },
  { name: 'Bichu Benny', role: 'Nurse Educator', img: '/assets/team/bichu.jpg' },
  { name: 'Anagha Sebastian', role: 'IQN Trainer', img: '/assets/team/anagha.jpg' },
  { name: 'Sandra Prince', role: 'IQN Trainer', img: '/assets/team/sandra.jpg' },
  { name: 'Surya Nair', role: 'OET Trainer', img: '/assets/team/surya.jpg' },
]

export default function AboutPage() {
  const [playing, setPlaying] = useState(false)

  return (
    <main className="about-page">
      <section className="container ap-hero">
        <div className="ap-hero__head">
          <FloatingHeading
            as="h1"
            text={'Guiding nurses to confident careers\nin New Zealand & Australia'}
            className="ap-hero__title"
            accent
            playful
          />
          <div className="ap-hero__intro">
            <p>
              We&apos;re Axon Careers — a dedicated team helping internationally
              trained nurses navigate registration, exams, jobs, and PR, with a
              focus on New Zealand &amp; Australia.
            </p>
          </div>
        </div>

        <div className="ap-video">
          {playing ? (
            <iframe
              className="ap-video__frame"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Axon Careers"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="ap-video__facade"
              aria-label="Play video"
              onClick={() => setPlaying(true)}
            >
              <img
                className="ap-video__thumb"
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`
                }}
                alt=""
                loading="lazy"
              />
              <span className="ap-video__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </section>

      <section className="container ap-block">
        <span className="ap-label">Who we are</span>
        <div className="ap-block__body">
          <p className="ap-about__lead">
            Axon Careers is your trusted partner for IQN &amp; OSCE training,
            helping nurses build successful careers in New Zealand &amp;
            Australia.
          </p>
          <p className="ap-about__text">
            We walk with each nurse through every step — from licensing and exam
            preparation to landing the right role and securing permanent
            residency. Focused on New Zealand, Australia, and Ireland, we guide
            internationally qualified nurses from exam preparation through to
            registration, employment, and permanent residency. We move with
            care, communicate clearly, and treat your goals as our own — from
            first enquiry to settling into your new hospital, you&apos;re never
            doing it alone.
          </p>

          <div className="ap-stats">
            {STATS.map((s) => (
              <div className="ap-stat" key={s.label}>
                <span className="ap-stat__value">{s.value}</span>
                <span className="ap-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container ap-block">
        <span className="ap-label">Why Axon Careers</span>
        <div className="ap-block__body">
          <h2 className="ap-why__title">
            Guidance you can trust, from first enquiry to your first shift.
          </h2>
          <div className="ap-why__grid">
            {WHY.map((w) => (
              <div className="ap-why__card" key={w.title}>
                <h3 className="ap-why__card-title">{w.title}</h3>
                <p className="ap-why__card-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container ap-team">
        <div className="ap-team__head">
          <span className="ap-label">Our team</span>
          <h2 className="ap-team__title">
            Meet the educators behind your success.
          </h2>
          <p className="ap-team__intro">
            Experienced clinical and OSCE educators who guide every nurse
            through registration, exam preparation, and the move to New Zealand
            &amp; Australia.
          </p>
        </div>

        <figure className="ap-team__banner">
          <img
            src="/assets/team/group.jpg"
            alt="The Axon Careers team with a recent nursing cohort"
            loading="lazy"
          />
        </figure>

        <div className="ap-team__grid">
          {TEAM.map((m) => (
            <figure className="tm-card" key={m.name}>
              <div className="tm-card__photo">
                <img src={m.img} alt={m.name} loading="lazy" />
              </div>
              <figcaption>
                <h3 className="tm-card__name">{m.name}</h3>
                <p className="tm-card__role">{m.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  )
}
