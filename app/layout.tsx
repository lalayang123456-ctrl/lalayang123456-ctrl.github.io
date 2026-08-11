import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gang Yang — Embodied AI Researcher",
  description:
    "Academic portfolio of Gang Yang, researching embodied AI, spatial intelligence, vision-language navigation, and robot learning.",
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
