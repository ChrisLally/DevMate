import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Breadcrumbs } from "@/components/client/Breadcrumbs";

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
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <Link 
              href="/" 
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              DevMate
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
