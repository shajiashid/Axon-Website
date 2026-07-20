'use client'
import { useEffect, useState } from 'react'

// Greetings in their original scripts. The browser renders each via the
// matching Noto font (see --font-greet). Kia ora & G'day nod to NZ/Australia.
const GREETINGS = [
  { text: 'നമസ്കാരം', lang: 'ml' }, // Malayalam
  { text: 'नमस्ते', lang: 'hi' }, // Hindi
  { text: 'வணக்கம்', lang: 'ta' }, // Tamil
  { text: 'నమస్కారం', lang: 'te' }, // Telugu
  { text: 'ನಮಸ್ಕಾರ', lang: 'kn' }, // Kannada
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'pa' }, // Punjabi
  { text: 'مرحبا', lang: 'ar' }, // Arabic
  { text: 'Hello', lang: 'en' },
  { text: 'Hola', lang: 'es' },
  { text: 'Kia ora', lang: 'mi' }, // Māori
  { text: "G'day", lang: 'en-AU' },
]

const TYPE_MS = 130
const ERASE_MS = 60
const HOLD_MS = 1600
const RESTART_MS = 350

// Split into grapheme clusters so Indic conjuncts/vowel-signs type as one unit
// instead of revealing broken half-characters.
function toGraphemes(str) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(seg.segment(str), (s) => s.segment)
  }
  return Array.from(str)
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function RotatingGreeting() {
  const reduced = prefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0) // graphemes currently shown
  const [deleting, setDeleting] = useState(false)

  const current = GREETINGS[index]
  const graphemes = toGraphemes(current.text)
  const shown = reduced ? current.text : graphemes.slice(0, count).join('')

  useEffect(() => {
    if (reduced) return // static greeting, no animation
    const atFull = !deleting && count === graphemes.length
    const atEmpty = deleting && count === 0

    let delay = deleting ? ERASE_MS : TYPE_MS
    if (atFull) delay = HOLD_MS
    else if (atEmpty) delay = RESTART_MS

    const timer = setTimeout(() => {
      if (atFull) {
        setDeleting(true)
      } else if (atEmpty) {
        setDeleting(false)
        setIndex((i) => (i + 1) % GREETINGS.length)
      } else {
        setCount((c) => c + (deleting ? -1 : 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [count, deleting, index, graphemes.length, reduced])

  return (
    <p className="hero__namaste" aria-label={`${current.text} :)`}>
      <span className="greet__word" lang={current.lang}>
        {shown}
      </span>
      {!reduced && <span className="greet__caret" aria-hidden="true" />}
      <span className="greet__smile"> :)</span>
    </p>
  )
}