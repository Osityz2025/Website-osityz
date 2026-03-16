"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Osityz?",
    answer:
      "Osityz is an AI-powered maritime workflow platform designed for shipbrokers, charterers, traders, and operators. It helps teams organize cargoes, vessels, port intelligence, and communication in one connected system.",
  },
  {
    question: "Who is Osityz built for?",
    answer:
      "Osityz is built for commercial shipping professionals, especially teams involved in chartering, brokerage, trading, and vessel operations.",
  },
  {
    question: "What problems does Osityz solve?",
    answer:
      "It addresses fragmented workflows, manual email parsing, disconnected spreadsheets, limited team visibility, and slow commercial decision-making.",
  },
  {
    question: "Does Osityz use AI?",
    answer:
      "Yes. Osityz is designed to use AI for practical workflow support such as parsing emails, extracting structured shipping information, surfacing matches, and helping draft responses faster.",
  },
  {
    question: "Is Osityz live yet?",
    answer:
      "Osityz is currently evolving, and early access is focused on product development, workflow refinement, and user feedback.",
  },
  {
    question: "How can I stay updated?",
    answer:
      "You can join the waitlist through the homepage to receive updates and follow the platform as it develops.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-[#050816] text-white">
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="section-label">FAQ</p>
            <h1 className="section-title">Frequently asked questions</h1>
            <p className="section-copy max-w-3xl">
              A clearer overview of what Osityz is, who it is for, and where the
              platform is heading.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07101f]">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-blue-400/20 bg-white/[0.05]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-white/10 px-6 py-5">
                      <p className="leading-8 text-slate-300">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 text-center">
            <p className="text-lg font-semibold text-white">
              Still have questions?
            </p>
            <p className="mt-3 text-slate-400">
              Reach out and we'll be happy to help.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
              >
                Contact Us
              </a>
              <a
                href="/#waitlist"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
