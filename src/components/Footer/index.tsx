import Link from "next/link";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="flex h-16 w-screen flex-col items-center justify-center bg-neutral-800">
      <span className="text-neutral-400">Made by Tiago Araujo &copy; 2023</span>
      <span className="flex items-center gap-2">
        <Link target="_blank" href="https://github.com/TiagoAraujoDev">
          <AiFillGithub />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/tiago-muniz-de-araujo-2b5b8a89/"
        >
          <AiFillLinkedin />
        </Link>
        <Link target="_blank" href="https://technewsblog.vercel.app/">
          <FaBloggerB />
        </Link>
      </span>
    </footer>
  );
}
