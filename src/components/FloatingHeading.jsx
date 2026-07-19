// Renders a heading where each letter floats up on hover — a playful,
// per-character micro-interaction. Words stay intact (inline-block) so the
// heading still wraps normally; real spaces between words allow line breaks.
// A "\n" in `text` forces an explicit line break.
//   as     — the tag to render (default 'h2')
//   accent — when true, letters also turn blue on hover
//   muted  — optional trailing text rendered in a muted colour (keeps the
//            same float interaction), e.g. a de-emphasised second half.
export default function FloatingHeading({
  text,
  muted = '',
  as: Tag = 'h2',
  className = '',
  accent = false,
  playful = false,
}) {
  // Build inline content for one string; each word's letters float on hover.
  // "\n" forces a line break. `isMuted` tags the words for muted styling.
  const buildSegment = (str, keyBase, isMuted) =>
    str.split('\n').flatMap((line, li) => {
      const words = line
        .split(' ')
        .filter((w) => w.length)
        .map((word, wi) => (
          <span
            className={`float-word${isMuted ? ' float-word--muted' : ''}`}
            key={`${keyBase}-${li}-${wi}`}
          >
            {Array.from(word).map((ch, ci) => (
              <span className="float-letter" key={ci}>
                {ch}
              </span>
            ))}
          </span>
        ))
        // insert a real space text node between words so the line can wrap
        .flatMap((el, i) => (i === 0 ? [el] : [' ', el]))
      // separate lines with an explicit <br>
      return li === 0 ? words : [<br key={`br-${keyBase}-${li}`} />, ...words]
    })

  const content = [
    ...buildSegment(text, 'm', false),
    ...(muted ? [' ', ...buildSegment(muted, 'mu', true)] : []),
  ]

  const classes = [
    'float-text',
    accent && 'float-text--accent',
    playful && 'float-text--playful',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const ariaLabel = `${text} ${muted}`.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()

  return (
    <Tag className={classes} aria-label={ariaLabel}>
      <span aria-hidden="true">{content}</span>
    </Tag>
  )
}
