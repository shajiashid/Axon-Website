import RotatingGreeting from './RotatingGreeting.jsx'
import FloatingHeading from './FloatingHeading.jsx'

const SERVICES = [
  'OSCE Training',
  'IQN Training',
  'OET Training',
  'New Zealand Nursing Registration',
  'Australia Nursing Registration',
  'Australia PR Services',
  'Job Support for Nurses',
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__card">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__overlay" />
        </div>

        <div className="container hero__inner">
          <div className="hero__content">
            <RotatingGreeting />
            <FloatingHeading
              as="h1"
              text={'Your Nursing Career in\nNew Zealand & Australia\nStarts with Axon Careers'}
              className="hero__title"
              playful
            />
            <ul className="hero__services" aria-label="Our core services">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <a href="#contact" className="btn btn-light hero__cta">
              Start your nursing Journey
            </a>
          </div>

          <div className="hero__art" aria-hidden="true">
            <img
              src="/assets/nurse-hero.png"
              alt=""
              className="hero__art-img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
