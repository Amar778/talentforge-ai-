import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentForge AI - AI Talent Acquisition & Career Suite",
  description: "Empowering Job Seekers with AI Resume Optimization and AI Mock Interviews, and Recruiters with Semantic AI Candidate Screening and Job Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
