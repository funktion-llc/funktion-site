import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://funktion.work"),
  title: "funktion: make your business AI native",
  description:
    "funktion is a business and tech consulting studio. We find where AI fits, build the software and workflows that use it, and train your people to run it themselves.",
  openGraph: {
    title: "funktion: make your business AI native",
    description: "Consulting plus custom software and workflow builds. Got a messy process? Good.",
    url: "https://funktion.work",
    siteName: "funktion",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1a22",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/dm-mono-latin-500-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
