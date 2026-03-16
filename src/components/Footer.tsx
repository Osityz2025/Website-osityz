import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040712]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Osityz</p>
          <p className="mt-1">
            AI-powered maritime workflow software for modern commercial teams.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/vision" className="hover:text-white transition">
            Vision
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}