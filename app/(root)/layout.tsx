import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/lib/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Now Brewing Online Store",
  description: "Online store for Organic and High Quality Coffee Beans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <ToastProvider />
        <body className={`${inter.className} `}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
