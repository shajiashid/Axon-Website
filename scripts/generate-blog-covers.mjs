// Generates a consistent, on-brand SVG cover for each blog post (topic icon +
// category on the Axon blue gradient) and points blogs.js at them.
// Run:  node scripts/generate-blog-covers.mjs
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'

const OUT = 'public/assets/blog-covers'
mkdirSync(OUT, { recursive: true })

// Lucide-style line icons (24x24, stroke)
const ICONS = {
  clipboardCheck: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  lifeBuoy: '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
  files: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"/><path d="M4 2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M7 8h4"/><path d="M7 12h4"/>',
  listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  messageCircle: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  bookOpen: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  luggage: '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="8" cy="20" r="2"/><circle cx="16" cy="20" r="2"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  calendarCheck: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  map: '<path d="M14.1 5.5a2 2 0 0 0 1.8 0l3.6-1.8A1 1 0 0 1 21 4.6v12.8a1 1 0 0 1-.6.9l-4.5 2.3a2 2 0 0 1-1.8 0l-4.2-2.1a2 2 0 0 0-1.8 0l-3.6 1.8A1 1 0 0 1 3 19.4V6.6a1 1 0 0 1 .6-.9l4.5-2.3a2 2 0 0 1 1.8 0z"/><path d="M15 5.8v15"/><path d="M9 3.2v15"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
}

const CATS = {
  registration: { label: 'Nursing Registration', accent: '#6b8aff' },
  documentation: { label: 'Documentation', accent: '#9b8cff' },
  exam: { label: 'Exam Prep', accent: '#3fd0c6' },
  careers: { label: 'Careers', accent: '#ffbf7a' },
  pr: { label: 'Immigration & PR', accent: '#c08cff' },
  planning: { label: 'Planning', accent: '#66dfa6' },
  relocation: { label: 'Relocation', accent: '#5cbcff' },
  destinations: { label: 'Destinations', accent: '#ff9db0' },
}

// slug -> [category, icon]
const MAP = {
  'nz-nursing-registration-guide': ['registration', 'clipboardCheck'],
  'ncnz-registration-support': ['registration', 'lifeBuoy'],
  'documentation-application-assistance': ['documentation', 'files'],
  'ncnz-registration-checklist': ['registration', 'listChecks'],
  'oet-vs-ielts': ['exam', 'languages'],
  'placement-to-pr-australia': ['pr', 'plane'],
  'nz-nursing-interview': ['careers', 'messageCircle'],
  'nclex-vs-kba': ['exam', 'bookOpen'],
  'pre-departure-checklist': ['relocation', 'luggage'],
  'nursing-cv-tips': ['careers', 'fileText'],
  'ahpra-registration': ['registration', 'shieldCheck'],
  'budgeting-nursing-journey': ['planning', 'wallet'],
  'first-90-days-iqn': ['careers', 'calendarCheck'],
  'nz-or-australia': ['destinations', 'map'],
  'building-pr-points': ['pr', 'target'],
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function cover(accent, label, icon) {
  const CAT = esc(label.toUpperCase())
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
      <stop stop-color="#17299a"/><stop offset="1" stop-color="#070c36"/>
    </linearGradient>
    <radialGradient id="glow" cx="600" cy="330" r="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}" stop-opacity="0.4"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <g stroke="#ffffff" stroke-opacity="0.06">
    <circle cx="1085" cy="115" r="120"/><circle cx="1085" cy="115" r="195"/><circle cx="1085" cy="115" r="280"/>
  </g>
  <path d="M-20 648 H432 l38 -66 30 142 42 -200 34 154 40 -48 H1220" stroke="#ffffff" stroke-opacity="0.08" stroke-width="3"/>
  <circle cx="600" cy="330" r="118" fill="#ffffff" fill-opacity="0.07" stroke="${accent}" stroke-opacity="0.55" stroke-width="2"/>
  <g transform="translate(600 330) scale(3.9) translate(-12 -12)" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    ${icon}
  </g>
  <text x="600" y="542" text-anchor="middle" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" letter-spacing="5">${CAT}</text>
  <text x="600" y="702" text-anchor="middle" fill="#ffffff" fill-opacity="0.5" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" letter-spacing="4">AXON CAREERS</text>
</svg>`
}

for (const [slug, [catKey, iconKey]] of Object.entries(MAP)) {
  const { label, accent } = CATS[catKey]
  writeFileSync(`${OUT}/${slug}.svg`, cover(accent, label, ICONS[iconKey]))
}
console.log(`Generated ${Object.keys(MAP).length} covers -> ${OUT}`)

// point every blog's img at its cover
const path = 'src/data/blogs.js'
let s = readFileSync(path, 'utf8')
let cur = null
s = s.replace(/slug: '([^']+)'|img:\s*'[^']+'/g, (m, slug) => {
  if (slug) { cur = slug; return m }
  return `img: '/assets/blog-covers/${cur}.svg'`
})
writeFileSync(path, s)
console.log('Updated', path)
