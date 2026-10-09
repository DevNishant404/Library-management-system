import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import AuthInitializer from "../components/AuthInitializer";
import Navbar from "../components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Library Management",
  description: "Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <StoreProvider>

          <AuthInitializer></AuthInitializer>
          {children}
          </StoreProvider>

        <ToastContainer />
      </body>
    </html>
  );
}