import Link from 'next/link'
import { BlogSVG, GithubSVG, LinkedInSVG } from '../Icons'

export function Footer() {
  return (
    <footer className="w-screen h-16 bg-neutral-800 flex flex-col items-center justify-center">
      <span className="text-neutral-400">Made by Tiago Araujo &copy; 2023</span>
      <span className="flex items-center gap-2">
        <Link target="_blank" href="https://github.com/TiagoAraujoDev">
          <GithubSVG />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/tiago-muniz-de-araujo-2b5b8a89/"
        >
          <LinkedInSVG />
        </Link>
        <Link target="_blank" href="https://technewsblog.vercel.app/">
          <BlogSVG />
        </Link>
      </span>
    </footer>
  )
}
