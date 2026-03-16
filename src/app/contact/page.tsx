"use client";

import { useState } from "react";
import { Mail, Building2, MapPin, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/simple-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          message: "",
        });
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="bg-[#050816] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="section-label">Contact</p>
            <h1 className="section-title">Get in touch with Osityz</h1>
            <p className="section-copy max-w-3xl">
              Whether you are a broker, charterer, operator, trader, or simply
              interested in following the platform, we&apos;d be glad to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07101f]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT — Contact info */}
            <div className="space-y-6">
              <div className="big-card">
                <h2 className="big-card-title">Contact details</h2>
                <p className="big-card-copy">
                  Reach out for product questions, partnership conversations, or
                  early access interest.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                      <Building2 size={16} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wide text-slate-400">
                        Company
                      </p>
                      <p className="mt-1 font-medium text-white">Osityz</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                      <Mail size={16} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wide text-slate-400">
                        Email
                      </p>
                      <a
                        href="mailto:info@osityz.com"
                        className="mt-1 font-medium text-white transition hover:text-blue-300"
                      >
                        info@osityz.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                      <MapPin size={16} className="text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 font-medium text-white">
                        Toronto, Ontario
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Built in Canada for the global maritime industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="big-card">
                <h2 className="big-card-title">Why people reach out</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Early access interest",
                    "Product questions",
                    "Partnership opportunities",
                    "Maritime workflow feedback",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 mini-card"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Contact form */}
            <div className="big-card">
              <h2 className="big-card-title">Send us a message</h2>
              <p className="big-card-copy">
                Fill in your details and we&apos;ll get back to you within 24
                hours.
              </p>

              {status === "success" ? (
                <div className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-xs text-slate-300">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                  <a
                    href="/#waitlist"
                    className="mt-6 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    Also join the waitlist
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        First name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="James"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Last name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Email address <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Company{" "}
                      <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="Your company or firm"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what you're working on or what questions you have..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07]"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle size={16} className="shrink-0" />
                      Something went wrong. Please try again or email us at
                      info@osityz.com.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Or email us directly at{" "}
                    <a
                      href="mailto:info@osityz.com"
                      className="text-slate-400 transition hover:text-white"
                    >
                      info@osityz.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
