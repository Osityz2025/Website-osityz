import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About | Osityz",
  description:
    "Meet the team behind Osityz — building the operating system for maritime commercial workflows.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050816] text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/12 blur-3xl blob-float" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl blob-float-b" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="max-w-4xl">
            <p className="section-label">About Us</p>
            <h1 className="section-title mt-5 max-w-3xl">
              The people building{" "}
              <span className="text-gradient">Osityz</span>
            </h1>
            <p className="section-copy mt-6 max-w-2xl text-lg">
              Founded by two people passionate about fixing how maritime
              commercial teams work — combining industry insight with modern
              software to replace the fragmented tools shipping professionals
              rely on today.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
              >
                Join the waitlist
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="section-label">The Team</p>
              <h2 className="section-title">The people building Osityz</h2>
              <p className="section-copy">
                Founded by two people passionate about fixing how maritime
                commercial teams work.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
            {[
              {
                name: "Salim Mahmoodi",
                role: "Co-Founder & CEO",
                photo: "/salim photo.jpg",
                photoPos: "object-[center_15%]",
                linkedin: "https://www.linkedin.com/in/salim-mahmoodi-ba23b3231",
              },
              {
                name: "Asher Qureshi",
                role: "Co-Founder & COO",
                photo: "/Asher Photo.png",
                photoPos: "object-[center_10%]",
                linkedin:
                  "https://www.linkedin.com/in/asher-qureshi8/?originalSubdomain=ca",
              },
            ].map((member, i) => (
              <FadeIn key={member.name} delay={i * 120}>
                <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1829] transition-all duration-300 hover:border-blue-400/25">
                  {/* Photo container */}
                  <div className="relative h-[22rem] w-full overflow-hidden bg-[#0d1829]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className={`h-full w-full object-cover ${member.photoPos} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1829] via-[#0d1829]/10 to-[#0d1829]/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1829]/30 via-transparent to-[#0d1829]/30" />
                  </div>

                  {/* Info */}
                  <div className="px-6 pb-6">
                    <h3 className="text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-300">
                      {member.role}
                    </p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/30 hover:text-white"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <p className="section-label">Our Story</p>
                <h2 className="section-title">Where it started</h2>
              </div>
              <div className="space-y-6 text-base leading-8 text-slate-400">
                <p>
                  Salim grew up watching his father work as a shipbroker,
                  navigating the daily grind of fragmented inboxes, manual data
                  entry, and commercial information scattered across
                  spreadsheets and email threads. It wasn&apos;t just something
                  he observed from a distance. He worked alongside him in the
                  industry and saw first-hand how much time and energy was lost
                  to tooling that simply wasn&apos;t built for how maritime
                  teams actually operate.
                </p>
                <p>
                  Both Salim and Asher had always wanted to build something of
                  their own. When they looked at the maritime industry and saw
                  the same problems showing up everywhere, the opportunity was
                  clear. They knew what needed to be solved, they had the
                  drive to solve it, and they started Osityz to do exactly that.
                </p>
                <p>
                  The goal is straightforward: bring the commercial side of
                  shipping into a single, modern platform built around how
                  maritime teams actually work.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT WE'RE BUILDING ── */}
      <section className="bg-[#050816]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-500/8 via-white/[0.03] to-violet-500/8 p-8 md:p-14">
            <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="section-label">What we&apos;re building</p>
              <h2 className="section-title mt-5">
                A platform for cargoes, vessels, ports, and maritime
                communication
              </h2>
              <p className="section-copy mt-5">
                Osityz is being shaped to become a central commercial workspace
                for modern shipping teams — combining structured maritime
                intelligence with AI-powered tools that reduce manual effort and
                improve execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/vision"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
                >
                  Read our Vision
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
