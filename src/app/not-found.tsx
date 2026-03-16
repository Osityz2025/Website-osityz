import Link from "next/link";
import { ArrowLeft, Ship } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      <div className="absolute inset-0 hero-grid opacity-15" />
      <div className="absolute left-1/4 top-1/4 h-[360px] w-[360px] rounded-full bg-blue-600/12 blur-3xl blob-float" />
      <div className="absolute bottom-1/4 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl blob-float-b" />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/10">
          <Ship size={36} className="text-blue-300" />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
          404 — Not Found
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Off the charted course
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-400">
          This page doesn&apos;t exist. It may have been moved, renamed, or
          removed. Navigate back to find what you&apos;re looking for.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
