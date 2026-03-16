import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Osityz",
  description: "How Osityz collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Email address — when you join our waitlist or submit a contact form.",
      "Name and company — when you reach out via our contact form.",
      "Usage data — basic analytics on how pages are accessed (no personally identifiable tracking).",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To send you product updates, early access announcements, and platform news you signed up for.",
      "To respond to your contact form enquiries.",
      "To improve the platform and understand what the maritime community needs.",
      "We will never sell, rent, or share your personal data with third parties for marketing purposes.",
    ],
  },
  {
    title: "3. Data Storage",
    content: [
      "Your data is stored securely using Supabase, a cloud database provider with industry-standard encryption.",
      "Email communications are handled via Resend, a transactional email service.",
      "Data is stored on servers located in the United States and/or Canada.",
    ],
  },
  {
    title: "4. Your Rights",
    content: [
      "You can request access to the personal data we hold about you at any time.",
      "You can request that we delete your data by emailing info@osityz.com.",
      "You can unsubscribe from communications at any time using the link in any email we send.",
    ],
  },
  {
    title: "5. Cookies",
    content: [
      "We use minimal cookies necessary for the website to function.",
      "We do not use third-party advertising cookies or cross-site tracking.",
    ],
  },
  {
    title: "6. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.",
      "Continued use of the website after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "7. Contact",
    content: [
      "For any privacy-related questions or requests, contact us at info@osityz.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="animate-page-in bg-[#050816] text-white">
      <section className="relative overflow-hidden border-b border-white/10 pt-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 pb-16 lg:px-8">
          <p className="section-label">Legal</p>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: March 2026</p>
          <p className="section-copy mt-4">
            Osityz is committed to protecting your personal information. This
            policy explains what we collect, how we use it, and your rights.
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
