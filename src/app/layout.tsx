import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osityz | Maritime AI Platform",
  description:
    "AI-powered maritime workflow platform for shipbrokers, charterers, traders, and operators.",
  icons: {
    icon: "/osityz_logo_transparent.png",
    shortcut: "/osityz_logo_transparent.png",
    apple: "/osityz_logo_transparent.png",
  },
  openGraph: {
    title: "Osityz | Maritime AI Platform",
    description:
      "AI-powered workflows for shipbrokers, charterers, traders, and operators.",
    url: "https://osityz.com",
    siteName: "Osityz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osityz | Maritime AI Platform",
    description:
      "AI-powered workflows for shipbrokers, charterers, traders, and operators.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        {children}

        <footer className="border-t border-white/10 bg-[#040712]">
          <div className="mx-auto max-w-[1300px] px-6 pt-16 pb-12 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.8fr_1fr]">
              {/* LEFT — BRAND */}
              <div>
                <div>
                  <img
                    src="/osityz_logo_transparent.png"
                    alt="Osityz"
                    className="h-12 w-auto object-contain"
                  />
                  <p className="mt-2 text-sm text-slate-400">
                    Maritime AI Platform
                  </p>
                </div>

                <p className="mt-6 max-w-sm text-[15px] leading-8 text-slate-200">
                  AI-powered maritime software helping brokers, charterers,
                  traders, and operators manage cargoes, vessels, and workflow
                  in one modern platform.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/osityz.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-white"
                  >
                    <Instagram size={16} />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/osityz/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                  >
                    <Linkedin size={16} />
                  </a>

                  <a
                    href="mailto:info@osityz.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/30 hover:text-white"
                  >
                    <Mail size={14} />
                    <span>info@osityz.com</span>
                  </a>
                </div>
              </div>

              {/* MIDDLE — LINKS */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Navigation
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-base text-slate-300 transition hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    href="/vision"
                    className="text-base text-slate-300 transition hover:text-white"
                  >
                    Vision
                  </Link>
                  <Link
                    href="/faq"
                    className="text-base text-slate-300 transition hover:text-white"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/contact"
                    className="text-base text-slate-300 transition hover:text-white"
                  >
                    Contact
                  </Link>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Location
                  </p>

                  <p className="mt-3 text-base font-medium text-white">
                    Toronto, Ontario
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-7 text-slate-400">
                    Built in Canada for the global maritime industry.
                  </p>
                </div>
              </div>

              {/* RIGHT — NEWSLETTER */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Stay Updated
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Follow the Osityz journey
                </h3>

                <p className="mt-4 max-w-md text-[15px] leading-8 text-slate-200">
                  Get product updates, feature launches, and early access
                  announcements as we build the future of maritime software.
                </p>

                <div className="mt-6">
                  <a
                    href="/#waitlist"
                    className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
                  >
                    Join Waitlist
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Product updates
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Early access
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    No spam
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
              <p>© 2026 Osityz. All rights reserved.</p>

              <div className="flex gap-6">
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
