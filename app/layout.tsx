import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Rule: Use system fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Rule: Explicit types for metadata
export const metadata: Metadata = {
  title: "DevMate",
  description: "Create and manage your development rules files with ease",
};

// Rule: Functional components with TypeScript interfaces
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
