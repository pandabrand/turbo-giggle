import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloggin' with pandas",
  description: "Just little ol' me and my pandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="apple-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-192x192.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-192x192.png"
        />
        <link
          rel="mask-icon"
          type="image/png"
          sizes="96x96"
          href="/icons/apple-icon-192x192.png"
          color="#00000"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen flex flex-col`}
      >
        <header className="container mx-auto p-8 flex-none">
          <h1 className="text-4xl font-bold">Bloggin&apos; with pandas</h1>
        </header>
          {children}
        <footer className="container mx-auto p-8 flex-none">
          <p>Hey there everybody</p>
        </footer>
      </body>
    </html>
  );
}
