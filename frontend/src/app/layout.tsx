import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'remixicon/fonts/remixicon.css'
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ming | Building distributed system for Open Source Cloud.',
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed top-0 left-0 w-full z-30">
          <NavigationBar />
        </div>
        <div className="mt-14">{children}</div>
        <Footer/>
        <Toaster />
      </body>
    </html>
  );
}
