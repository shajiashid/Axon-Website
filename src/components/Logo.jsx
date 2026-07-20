import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Axon Careers home">
      <span className="logo__mark">
        <img src="/assets/logo-ring.svg" alt="" className="logo__ring" />
        <img src="/assets/logo-a.svg" alt="" className="logo__a" />
      </span>
      <span className="logo__text">
        <span className="logo__name">AXON CAREERS</span>
        <span className="logo__tag">WHERE PRECISION MEETS COMPASSION</span>
      </span>
    </Link>
  )
}
