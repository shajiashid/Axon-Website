// Renders a heading where each letter floats up on hover — a playful,
// per-character micro-interaction. Words stay intact (inline-block) so the
// heading still wraps normally; real spaces between words allow line breaks.
// A "\n" in `text` forces an explicit line break.
//   as      — the tag to render (default 'h2')
//   accent  — when true, letters also turn blue on hover
export default function FloatingHeading({
  text,
  as: Tag = 'h2',
  className = '',
  accent = false,
  playful = false,
}) {
  const content = text.split('\n').flatMap((line, li) => {
    const words = line
      .split(' ')
      .map((word, wi) => (
        <span className="float-word" key={`${li}-${wi}`}>
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
    return li === 0 ? words : [<br key={`br-${li}`} />, ...words]
  })

  const classes = [
    'float-text',
    accent && 'float-text--accent',
    playful && 'float-text--playful',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} aria-label={text.replace(/\n/g, ' ')}>
      <span aria-hidden="true">{content}</span>
    </Tag>
  )
}
