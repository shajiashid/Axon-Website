import BlogPost from '../../../views/BlogPost.jsx'
import { BLOGS, getBlog } from '../../../data/blogs.js'

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }))
}

export function generateMetadata({ params }) {
  const post = getBlog(params.slug)
  return { title: post ? `${post.title} — Axon Careers` : 'Article — Axon Careers' }
}

export default function Page({ params }) {
  return <BlogPost slug={params.slug} />
}
