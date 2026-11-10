import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gang Yang — Embodied AI Researcher",
  description:
    "Academic portfolio of Gang Yang, researching embodied AI, spatial intelligence, vision-language navigation, and robot learning.",
  alternates: {
    canonical: "https://lalayang123456-ctrl.github.io/",
  },
  openGraph: {
    siteName: "Gang Yang",
    url: "https://lalayang123456-ctrl.github.io/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
