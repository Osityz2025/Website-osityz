import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Osityz",
  description: "Terms and conditions for using the Osityz platform and website.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the Osityz website and services, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, please do not use our website or services.",
    ],
  },
  {
    title: "2. Platform Status",
    content: [
      "Osityz is currently in pre-launch / early access development. Features, availability, and pricing are subject to change.",
      "Joining the waitlist does not guarantee access to any specific product, feature, or pricing tier.",
      "We reserve the right to modify, suspend, or discontinue any part of the platform at any time.",
    ],
  },
  {
    title: "3. Use of the Website",
    content: [
      "You may use this website for lawful purposes only.",
      "You may not use the website to transmit harmful, offensive, or unlawful content.",
      "You may not attempt to gain unauthorized access to any part of the website or its systems.",
      "You may not use automated tools to scrape or crawl the website without prior written consent.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content on this website — including text, design, logos, and code — is the property of Osityz and is protected by applicable copyright and trademark laws.",
      "You may not reproduce, distribute, or use our content without prior written permission.",
    ],
  },
  {
    title: "5. Disclaimer of Warranties",
    content: [
      "The website and any information provided are offered 'as is' without warranty of any kind.",
      "Osityz makes no representations about the accuracy, completeness, or suitability of the information on this website.",
      "We do not warrant that the website will be uninterrupted, error-free, or free of viruses.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Osityz shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website.",
      "Our total liability for any claim shall not exceed the amount you paid to us in the 12 months prior to the claim.",
    ],
  },
  {
    title: "7. Governing Law",
    content: [
      "These terms are governed by the laws of the Province of Ontario, Canada.",
      "Any disputes shall be resolved in the courts of Ontario, Canada.",
    ],
  },
  {
    title: "8. Changes to Terms",
    content: [
      "We may update these Terms of Service from time to time. Updates will be posted on this page.",
      "Continued use of the website after changes constitutes your acceptance of the updated terms.",
    ],
  },
  {
    title: "9. Contact",
    content: [
      "For any questions about these terms, contact us at info@osityz.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="animate-page-in bg-[#050816] text-white">
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 pb-16 lg:px-8">
          <p className="section-label">Legal</p>
          <h1 className="section-title">Terms of Service</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: March 2026</p>
          <p className="section-copy mt-4">
            Please read these terms carefully before using the Osityz website
            or joining the waitlist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 md:p-8"
            >
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 leading-7">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
