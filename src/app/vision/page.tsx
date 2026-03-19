import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vision | Osityz",
  description:
    "Osityz is building the operating system for maritime commercial workflows — helping shipbrokers, charterers, traders, and operators work faster.",
};
import { AlertTriangle, Zap, Target, ArrowRight, Workflow, Globe, Users, Bot } from "lucide-react";

const problemCards = [
  {
    icon: AlertTriangle,
    iconColor: "text-rose-300",
    iconBg: "from-rose-500/15 to-rose-500/5",
    borderAccent: "hover:border-rose-400/25",
    label: "01",
    title: "The Problem",
    copy: "Commercial shipping teams deal with fragmented information, manual email parsing, repeated data entry, and poor visibility across cargoes, vessels, ports, and opportunities.",
  },
  {
    icon: Zap,
    iconColor: "text-amber-300",
    iconBg: "from-amber-500/15 to-amber-500/5",
    borderAccent: "hover:border-amber-400/25",
    label: "02",
    title: "The Shift",
    copy: "Maritime teams need software that understands chartering logic, operational restrictions, regional workflows, and the reality of broker-driven communication.",
  },
  {
    icon: Target,
    iconColor: "text-emerald-300",
    iconBg: "from-emerald-500/15 to-emerald-500/5",
    borderAccent: "hover:border-emerald-400/25",
    label: "03",
    title: "The Opportunity",
    copy: "By combining structured maritime data with AI-powered workflow tools, Osityz aims to help teams act faster, stay aligned, and reduce commercial friction.",
  },
];

const beliefs = [
  {
    icon: Workflow,
    num: "01",
    title: "Workflows matter",
    copy: "The value is not just in storing data. The value is in helping teams move from incoming information to commercial action faster.",
  },
  {
    icon: Globe,
    num: "02",
    title: "Context matters",
    copy: "Maritime decisions depend on routes, restrictions, vessel specs, laycans, cargo requirements, and market timing.",
  },
  {
    icon: Users,
    num: "03",
    title: "Teams matter",
    copy: "Information should not stay trapped with one broker, one inbox, or one spreadsheet. Visibility should scale with the business.",
  },
  {
    icon: Bot,
    num: "04",
    title: "AI should be practical",
    copy: "AI should help shipping teams parse, organize, match, and draft faster — not just add another dashboard with noise.",
  },
];

export default function VisionPage() {
  return (
    <main className="bg-[#050816] text-white">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/12 blur-3xl blob-float" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-3xl blob-float-b" />
        <div className="absolute right-0 top-1/2 h-[260px] w-[260px] rounded-full bg-cyan-500/8 blur-3xl blob-float-c" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="max-w-5xl">
            <p className="section-label">Vision</p>
            <h1 className="section-title mt-5 max-w-4xl">
              Building the operating system for{" "}
              <span className="text-gradient">maritime commercial workflows</span>
            </h1>
            <p className="section-copy mt-6 max-w-3xl text-lg">
              Osityz exists to modernize how shipping professionals manage
              information, communication, and decision-making. The industry runs
              on relationships and speed, but too much of the workflow is still
              buried in inboxes, spreadsheets, and disconnected tools.
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
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Meet the team
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

      {/* ── PROBLEM / SHIFT / OPPORTUNITY ── */}
      <section className="border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label">The big picture</p>
            <h2 className="section-title">
              Why maritime software needs to change
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className={`big-card ${card.borderAccent}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${card.iconBg}`}
                >
                  <card.icon size={20} className={card.iconColor} />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {card.label}
                </p>
                <h3 className="big-card-title">{card.title}</h3>
                <p className="big-card-copy">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BELIEVE ── */}
      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-label">What we believe</p>
            <h2 className="section-title">
              Shipping software should be maritime-first, not generic-first
            </h2>
            <p className="section-copy">
              The tools that commercial shipping teams use should be built around
              how maritime information actually flows — not adapted from generic
              SaaS templates.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {beliefs.map((item) => (
              <div key={item.num} className="feature-panel">
                <div className="mb-1 flex items-center gap-3">
                  <div className="feature-icon">
                    <item.icon size={20} />
                  </div>
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-copy">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONG TERM DIRECTION ── */}
      <section className="bg-[#07101f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-500/8 via-white/[0.03] to-violet-500/8 p-8 md:p-14">
            {/* Background blobs inside CTA */}
            <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-[200px] w-[200px] rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="section-label">Long term direction</p>
              <h2 className="section-title mt-5">
                A connected platform for cargoes, vessels, ports, communication,
                and maritime decision support
              </h2>
              <p className="section-copy mt-5">
                Osityz is being shaped to become a central commercial workspace for
                modern shipping teams, combining structured maritime intelligence
                with tools that reduce manual effort and improve execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
                >
                  Contact Us
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/#waitlist"
                  className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
