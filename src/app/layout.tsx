import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Osityz | Maritime Software",
  description: "Osityz is an AI-powered web-based maritime software platform that streamlines communication, automates tasks, and connects shipping professionals worldwide.",
  keywords: "maritime software, shipping, AI-powered, communication platform, maritime technology",
  authors: [{ name: "Osityz" }],
  creator: "Osityz",
  publisher: "Osityz",
  robots: "index, follow",
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "Osityz | Maritime Software",
    description: "Osityz is an AI-powered web-based maritime software platform that streamlines communication, automates tasks, and connects shipping professionals worldwide.",
    url: "https://www.osityz.com",
    siteName: "Osityz",
    images: [
      {
        url: "/osityz-logo.png",
        width: 800,
        height: 600,
        alt: "Osityz Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Osityz | Maritime Software",
    description: "Osityz is an AI-powered web-based maritime software platform that streamlines communication, automates tasks, and connects shipping professionals worldwide.",
    images: ["/osityz-logo.png"],
  },
  
  // Icons and favicons
  icons: {
    icon: "/osityz-logo.png",
    shortcut: "/osityz-logo.png",
    apple: "/osityz-logo.png",
  },
  
  // Additional metadata
  metadataBase: new URL("https://www.osityz.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Osityz",
    "description": "AI-powered web-based maritime software platform that streamlines communication, automates tasks, and connects shipping professionals worldwide.",
    "url": "https://www.osityz.com",
    "logo": "https://www.osityz.com/osityz-logo.png",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.osityz.com/contact"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
