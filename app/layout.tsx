import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wealth Snapshot",
  description: "My Wealth Snapshot",
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
