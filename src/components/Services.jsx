import FloatingHeading from './FloatingHeading.jsx'

const ICONS = {
  registration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  visa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  job: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  ),
  english: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  ),
  student: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
}

const SERVICES = [
  {
    n: '01',
    icon: 'registration',
    title: 'Nursing Registration Services',
    groups: [
      {
        name: 'New Zealand Nursing Registration',
        items: [
          'CGFNS / TruMerit Processing',
          'NCNZ Registration Support',
          'Documentation & Application Assistance',
        ],
      },
      {
        name: 'Australia Nursing Registration',
        items: [
          'AHPRA Registration',
          'OBA Pathway',
          'TTMR (Trans-Tasman Mutual Recognition) Pathway',
          'IQRN Fast Track Method',
          'Documentation & Application Support',
        ],
      },
      {
        name: 'Ireland Nursing Registration',
        items: [
          'Ireland Nursing Registration Process',
          'Documentation Support',
          'Registration Guidance',
          'Licensing Assistance',
        ],
      },
    ],
  },
  {
    n: '02',
    icon: 'visa',
    title: 'Immigration & Visa Services',
    groups: [
      {
        name: 'New Zealand Immigration',
        items: ['Visitor Visa', 'Resident Visa', 'Permanent Residency (PR)'],
      },
      {
        name: 'Australia Immigration',
        items: [
          'Permanent Residency (PR)',
          'MARA Registered Migration Lawyer Assistance',
        ],
      },
    ],
  },
  {
    n: '03',
    icon: 'job',
    accent: true,
    title: 'Australia Nurses Job Placement Services',
    desc: 'Dedicated job-placement support connecting internationally qualified nurses with trusted healthcare employers across Australia.',
  },
  {
    n: '04',
    icon: 'english',
    title: 'English Language Training',
    items: ['OET Coaching', 'IELTS Coaching', 'PTE Coaching'],
  },
  {
    n: '05',
    icon: 'student',
    title: 'Student Visa Services',
    items: [
      'United Kingdom (UK) Student Visa',
      'New Zealand Student Visa',
      'France Student Visa',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section services svc">
      <div className="container">
        <div className="svc__head">
          <FloatingHeading
            text="Our Services"
            className="svc__title"
            accent
            playful
          />
          <p className="svc__lead">
            End-to-end support across nursing registration, immigration, job
            placement, exam coaching, and student visas — for New Zealand,
            Australia, Ireland, and beyond.
          </p>
        </div>

        <div className="svc__bento">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className={`svc-card ${s.accent ? 'svc-card--accent' : ''}`}
            >
              <div className="svc-card__head">
                <span className="svc-card__icon" aria-hidden="true">
                  {ICONS[s.icon]}
                </span>
                <h3 className="svc-card__title">{s.title}</h3>
              </div>

              {s.groups && (
                <div className="svc-card__groups">
                  {s.groups.map((g) => (
                    <div className="svc-grp" key={g.name}>
                      <h4 className="svc-grp__name">{g.name}</h4>
                      <ul className="svc-grp__list">
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {s.items && (
                <ul className="svc-card__items">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}

              {s.desc && <p className="svc-card__desc">{s.desc}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
