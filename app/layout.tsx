import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fractr — Wealth Intelligence Platform",
  description: "Track assets, liabilities, and net worth with Fractr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
