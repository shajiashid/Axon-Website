import FloatingHeading from './FloatingHeading.jsx'

export default function About() {
  return (
    <section id="about" className="section intro">
      <div className="container intro__inner">
        <div className="intro__media reveal">
          <img src="/assets/about-team.jpg" alt="The Axon Careers team" />
        </div>

        <div className="intro__main reveal">
          <FloatingHeading
            text="Where precision meets compassion in every career move"
            className="intro__title"
            accent
            playful
          />
          <p className="intro__text">
            Axon Careers is your trusted partner for international nursing
            success. We provide end-to-end support for OSCE Training, IQN
            Training, OET Preparation, New Zealand Nursing Registration,
            Australia Nursing Registration (OBA, TTMR, IQRN), Australia PR
            Services, and Job Support for Nurses — guiding internationally
            qualified nurses from exam preparation to registration, employment,
            and permanent residency in New Zealand and Australia.
          </p>
        </div>
      </div>
    </section>
  )
}
