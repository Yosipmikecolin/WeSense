import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layout/Layout";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

const interLight = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter-light",
});

const interBold = Inter({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-inter-bold",
});

export const metadata: Metadata = {
  title: "SGAMGC",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interLight.variable} ${interBold.variable} antialiased`}
      >
        <PrimeReactProvider>
          <Toaster />
          <Layout>{children}</Layout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
