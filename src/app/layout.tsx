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
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon-96x96.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-57x57.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-60x60.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-72x72.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-76x76.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-180x180.png",
    },
    {
      rel: "apple-icon",
      type: "image/png",
      sizes: "96x96",
      url: "/apple-icon-192x192.png",
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen flex flex-col`}
      >
        <header className="container mx-auto p-8 flex-none">
          <h1 className="text-4xl font-bold">Bloggin' with pandas</h1>
        </header>
          {children}
        <footer className="container mx-auto p-8 flex-none">
          <p>Hey there everybody</p>
        </footer>
      </body>
    </html>
  );
}
