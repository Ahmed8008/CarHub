import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best car in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
      <SessionProviderWrapper>
        <Navbar />
        {children}
        <Footer/>
        </SessionProviderWrapper>
        </body>
    </html>
  );
}
