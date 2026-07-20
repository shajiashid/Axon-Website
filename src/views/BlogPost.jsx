import Link from 'next/link'
import Contact from '../components/Contact.jsx'
import { BLOGS, getBlog } from '../data/blogs.js'

function Block({ block }) {
  if (block.h2) return <h2 className="post__h2">{block.h2}</h2>
  if (block.ul)
    return (
      <ul className="post__list">
        {block.ul.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  return <p className="post__p">{block.p}</p>
}

export default function BlogPost({ slug }) {
  const post = getBlog(slug)

  if (!post) {
    return (
      <main className="post post--missing">
        <div className="container">
          <p className="post__notfound">
            Sorry, we couldn&apos;t find that article.
          </p>
          <Link href="/blogs" className="btn btn-outline">
            ← Back to all articles
          </Link>
        </div>
      </main>
    )
  }

  // Up to 3 other posts for the "Keep reading" strip.
  const related = BLOGS.filter((b) => b.slug !== post.slug).slice(0, 3)

  return (
    <main className="post">
      <article>
        <header className="container post__head">
          <Link href="/blogs" className="post__back">
            <span aria-hidden="true">←</span> All articles
          </Link>
          <div className="post__meta">
            <span>{post.date}</span>
            <span className="post__dot" aria-hidden="true">
              •
            </span>
            <span>{post.read}</span>
          </div>
          <h1 className="post__title">{post.title}</h1>
          <p className="post__lead">{post.excerpt}</p>
        </header>

        <div className="container post__mediawrap">
          <div className="post__media">
            <img src={post.img} alt="" />
          </div>
        </div>

        <div className="container post__bodywrap">
          <div className="post__body">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      <section className="container post__more">
        <div className="post__more-head">
          <h2 className="post__more-title">Keep reading</h2>
          <Link href="/blogs" className="post__more-link">
            All articles <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="post__more-grid">
          {related.map((p) => (
            <Link key={p.slug} href={`/blogs/${p.slug}`} className="blogcard">
              <div className="blogcard__media">
                <img src={p.img} alt="" loading="lazy" />
              </div>
              <span className="blogcard__date">{p.date}</span>
              <h3 className="blogcard__title">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  )
}
