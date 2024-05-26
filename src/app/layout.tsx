import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ordinalsbot challenge",
  description: "Render basic Ordinalsbot data using SSR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="font-mono flex min-h-screen flex-col items-center justify-between p-24 bg-slate-300/80 ">
          <div className="flex flex-col justify-between p-8 space-y-12 bg-slate-100 border-slate-200 shadow-xl rounded-xl ">
            <div className="font-mono text-center font-bold text-lg">
              Ordinalsbot challenge
            </div>
            <Nav />
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
