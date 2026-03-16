"use client";

import { useState, useEffect } from "react";
import {
  Ship,
  Database,
  Bot,
  Users,
  Inbox,
  ArrowLeftRight,
  MapPin,
  UsersRound,
  Briefcase,
  Package,
  TrendingUp,
  Settings,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";

const roadmap = [
  {
    quarter: "Q1 2026",
    status: "In Progress",
    statusStyle: "bg-blue-500/10 border-blue-400/20 text-blue-300",
    active: true,
    items: [
      "Core platform architecture & data model",
      "Cargo & vessel management workflow",
      "AI email parsing & structured extraction",
      "Early access waitlist & onboarding",
    ],
  },
  {
    quarter: "Q2 2026",
    status: "Coming Soon",
    statusStyle: "bg-violet-500/10 border-violet-400/20 text-violet-300",
    active: false,
    items: [
      "AI-powered cargo/vessel matching engine",
      "Smart broker reply drafting",
      "Port & route intelligence integration",
      "Team workspace & shared visibility",
    ],
  },
  {
    quarter: "Q3 2026",
    status: "Planned",
    statusStyle: "bg-white/5 border-white/10 text-slate-400",
    active: false,
    items: [
      "Multi-user collaboration features",
      "Real-time notifications & alerts",
      "Advanced analytics & reporting",
      "Mobile-optimised experience",
    ],
  },
  {
    quarter: "Beyond",
    status: "Future",
    statusStyle: "bg-white/[0.03] border-white/8 text-slate-500",
    active: false,
    items: [
      "Full commercial OS for shipping teams",
      "Third-party API integrations",
      "Custom workflow automation",
      "Enterprise-grade features",
    ],
  },
];


const workflowSteps = [
  {
    step: "01",
    title: "Capture maritime data",
    description:
      "Bring cargoes, vessel positions, broker messages, and shipping context into one connected workspace.",
  },
  {
    step: "02",
    title: "Structure the chaos",
    description:
      "Turn scattered emails and market messages into cleaner, more searchable commercial information.",
  },
  {
    step: "03",
    title: "Surface the right matches",
    description:
      "Help teams move faster on relevant opportunities with clearer filtering and workflow support.",
  },
  {
    step: "04",
    title: "Act with confidence",
    description:
      "Draft responses, keep teams aligned, and move from market intel to commercial action faster.",
  },
];

const featureCards = [
  {
    icon: Inbox,
    title: "AI Email Intelligence",
    copy:
      "Extract commercial details from emails, circulars, and broker messages so teams spend less time retyping and more time acting.",
    bullets: [
      "Structured extraction",
      "Commercial message analysis",
      "Faster reply drafting",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Cargo & Vessel Matching",
    copy:
      "Connect open positions and cargo requirements with clearer commercial context and less spreadsheet back-and-forth.",
    bullets: [
      "Commercial fit support",
      "Region-aware filtering",
      "Prompt opportunity review",
    ],
  },
  {
    icon: MapPin,
    title: "Port & Route Context",
    copy:
      "Give your team cleaner operational context with standardized port intelligence, region logic, and route visibility.",
    bullets: [
      "Port data structure",
      "Region suggestions",
      "Cleaner voyage screening",
    ],
  },
  {
    icon: UsersRound,
    title: "Team Workflow Workspace",
    copy:
      "Keep brokers, operators, and chartering teams aligned with a shared view of opportunities, communication, and progress.",
    bullets: [
      "Shared visibility",
      "Cleaner handoffs",
      "Scalable internal process",
    ],
  },
];

const audiences = [
  {
    icon: Briefcase,
    title: "Shipbrokers",
    copy:
      "Manage positions, parse market communication, and act faster on relevant commercial opportunities.",
  },
  {
    icon: Package,
    title: "Charterers",
    copy:
      "Bring cargo programs, vessel options, and decision support into one structured workflow.",
  },
  {
    icon: TrendingUp,
    title: "Traders",
    copy:
      "Reduce freight-related information loss and keep shipping communication easier to track.",
  },
  {
    icon: Settings,
    title: "Operators",
    copy:
      "Create better visibility between vessel movement, commercial updates, and internal coordination.",
  },
];

const trustItems = [
  { icon: Ship, label: "Built for commercial shipping workflows" },
  { icon: Database, label: "Structured cargo, vessel, and port data" },
  { icon: Bot, label: "AI-powered communication support" },
  { icon: Users, label: "One workspace for teams and brokers" },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "duplicate"
  >("idle");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist-count")
      .then((r) => r.json())
      .then((d) => setWaitlistCount(d.count))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.duplicate) {
        setStatus("duplicate");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      if (!data.success) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className="animate-page-in bg-[#050816] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 hero-grid opacity-25" />
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-3xl blob-float" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl blob-float-b" />
        <div className="absolute left-1/2 top-16 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl blob-float-c" />

        <div className="relative mx-auto max-w-[1300px] px-6 pt-28 pb-24 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Built for shipbrokers, charterers, traders, and operators
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl xl:text-7xl">
                Maritime workflows,{" "}
                <span className="text-gradient">rebuilt for speed</span> and
                clarity.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Osityz helps maritime teams centralize cargoes, vessels, port
                intelligence, and communication workflows in one connected
                platform — so valuable commercial information stops getting lost
                in inboxes and spreadsheets.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:opacity-90 hover:-translate-y-0.5"
                >
                  Join Early Access
                </a>

                <a
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Explore Platform
                  <ArrowRight size={15} />
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">AI</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Email parsing and workflow support
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">Ports</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Structured maritime intelligence
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">Teams</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    One workspace for commercial visibility
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Product Visual */}
            <div className="relative hidden lg:block">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08101f] shadow-2xl shadow-blue-950/40">

                {/* Dashboard header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-slate-500">
                      Osityz Platform
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-white">
                      Commercial Workflow
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </div>
                </div>

                <div className="space-y-3 p-4">

                  {/* Cargo Matching */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        Cargo / Vessel Matching
                      </span>
                      <span className="text-xs text-blue-400">Live suggestions</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Supramax | ECSA", sub: "Grain / petcoke — prompt position", badge: "92% fit", color: "bg-emerald-500/15 text-emerald-300" },
                        { name: "Handysize | Med / Black Sea", sub: "Steel products parcel", badge: "87% fit", color: "bg-emerald-500/15 text-emerald-300" },
                        { name: "Ultramax | SE Asia", sub: "Laycan overlap flagged", badge: "Review", color: "bg-amber-500/15 text-amber-300" },
                      ].map((row) => (
                        <div key={row.name} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">{row.name}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{row.sub}</p>
                          </div>
                          <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${row.color}`}>
                            {row.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Intelligence — compact */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Email Intelligence</span>
                      <span className="text-xs text-slate-500">Structured output</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] px-3 py-3">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Parsed</p>
                      <p className="mt-1 text-sm text-white">
                        "Open Supra prompt WCI / PG with grabs preferred"
                      </p>
                      <p className="mt-2 text-xs text-emerald-400">
                        → Match open positions &amp; draft broker reply
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Cargoes", value: 128 },
                      { label: "Vessels", value: 74 },
                      { label: "AI Drafts", value: 36 },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                        <p className="text-xl font-bold text-white"><CountUp to={stat.value} /></p>
                        <p className="mt-0.5 text-xs text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] space-y-3 p-4">
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-slate-400">Messages structured</span>
                        <span className="font-medium text-white">84%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-1.5 w-[84%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-xs">
                        <span className="text-slate-400">Opportunities reviewed faster</span>
                        <span className="font-medium text-white">67%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-1.5 w-[67%] rounded-full bg-gradient-to-r from-violet-500 to-blue-400" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto max-w-[1300px] px-6 py-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-3 md:grid-cols-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-300"
                >
                  <Icon size={16} className="shrink-0 text-blue-400" />
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PLATFORM WORKFLOW */}
      <section id="platform" className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="section-label">Platform workflow</p>
                <h2 className="section-title">
                  One connected workflow from inbox to commercial action
                </h2>
                <p className="section-copy">
                  Osityz is designed to reduce friction in the way maritime teams
                  capture information, structure communication, evaluate
                  opportunities, and coordinate on next steps.
                </p>
                <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
                  <p className="text-sm font-medium text-slate-300">Why this matters</p>
                  <p className="mt-3 text-base leading-8 text-slate-400">
                    Commercial shipping still relies heavily on fragmented inboxes,
                    spreadsheets, and manual follow-up. Osityz is being shaped to
                    bring that process into one cleaner, more usable system.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {workflowSteps.map((item) => (
                  <div key={item.step} className="feature-panel">
                    <div className="feature-icon">{item.step}</div>
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="feature-copy">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="section-label">Core capabilities</p>
              <h2 className="section-title">Built around how maritime teams actually work</h2>
              <p className="section-copy">
                Instead of generic business software, Osityz is being shaped around
                the real movement of maritime commercial information.
              </p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {featureCards.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 100}>
                <div className="big-card group h-full">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-500/10">
                    <feature.icon size={20} className="text-blue-300" />
                  </div>
                  <h3 className="big-card-title">{feature.title}</h3>
                  <p className="big-card-copy">{feature.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {feature.bullets.map((bullet) => (
                      <span key={bullet} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="section-label">Who it&apos;s for</p>
              <h2 className="section-title">Designed for the commercial side of shipping</h2>
              <p className="section-copy">
                Osityz is meant to support the people who keep maritime deals,
                communication, and execution moving.
              </p>
            </div>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((audience, i) => (
              <FadeIn key={audience.title} delay={i * 80}>
                <div className="audience-card h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/15 to-cyan-500/10">
                    <audience.icon size={18} className="text-blue-300" />
                  </div>
                  <h3>{audience.title}</h3>
                  <p>{audience.copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="section-label">Why Osityz</p>
                <h2 className="section-title">Maritime-first software instead of generic workflow tools</h2>
                <p className="section-copy">
                  Most teams still work across disconnected inboxes, scattered
                  spreadsheets, and manual communication threads. Osityz is being
                  developed specifically around maritime commercial structure and
                  decision flow.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="grid grid-cols-3 gap-3 border-b border-white/10 bg-white/[0.02] px-6 py-4 text-sm font-semibold text-slate-300">
                  <div>Capability</div>
                  <div>Osityz</div>
                  <div>Traditional setup</div>
                </div>
                {[
                  ["AI email extraction", "Built in", "Mostly manual"],
                  ["Cargo-vessel workflow support", "Connected", "Fragmented"],
                  ["Maritime workflow focus", "Yes", "Limited"],
                  ["Structured port intelligence", "Yes", "Scattered"],
                  ["Team visibility", "Shared", "Inbox + sheets"],
                ].map((row) => (
                  <div key={row[0]} className="grid grid-cols-3 gap-3 border-b border-white/10 px-6 py-4 text-sm text-slate-300 last:border-none hover:bg-white/[0.02] transition">
                    <div className="font-medium text-white">{row[0]}</div>
                    <div className="font-medium text-emerald-300">{row[1]}</div>
                    <div className="text-slate-400">{row[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-b border-white/10 bg-[#050816]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="section-label">Roadmap</p>
              <h2 className="section-title">What we&apos;re building and when</h2>
              <p className="section-copy">
                Osityz is in active development. Here&apos;s where we are and
                where we&apos;re heading.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {roadmap.map((phase, i) => (
              <FadeIn key={phase.quarter} delay={i * 100}>
                <div className={`relative h-full rounded-[24px] border p-6 transition-all duration-300 ${
                  phase.active
                    ? "border-blue-400/30 bg-gradient-to-b from-blue-500/10 to-blue-500/[0.03] shadow-lg shadow-blue-500/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15"
                }`}>
                  {phase.active && (
                    <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                  )}

                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-white">{phase.quarter}</p>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${phase.statusStyle}`}>
                      {phase.status}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${phase.active ? "bg-blue-400" : "bg-slate-600"}`} />
                        <span className={`text-sm leading-7 ${phase.active ? "text-slate-300" : "text-slate-500"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section id="waitlist" className="bg-[#050816]">
        <div className="mx-auto max-w-[1300px] px-6 py-24 lg:px-8">
          <FadeIn>
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 shadow-2xl shadow-blue-950/20 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="section-label">Early access</p>
                <h2 className="section-title max-w-2xl">Join the Osityz waitlist</h2>
                {waitlistCount !== null && waitlistCount > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {waitlistCount} people already joined
                  </div>
                )}
                <p className="section-copy max-w-2xl">
                  If you&apos;re building, broking, operating, or trading in the
                  maritime space, join the waitlist to follow the platform and
                  get early access updates.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Product updates", "Early access news", "No spam"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#0a1222] p-6 md:p-7">
                <h3 className="text-2xl font-semibold text-white">
                  Request updates
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Enter your email to join early access.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/50 focus:bg-white/[0.07]"
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? "Submitting..." : "Join Waitlist"}
                  </button>

                  {status === "success" && (
                    <p className="text-sm text-emerald-300">
                      You've been added to the waitlist.
                    </p>
                  )}
                  {status === "duplicate" && (
                    <p className="text-sm text-amber-300">
                      This email is already on the waitlist.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-300">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
