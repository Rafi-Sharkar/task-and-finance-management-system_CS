import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "smartsolutiobs",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.className} max-w-screen overflow-x-hidden antialiased`}
      >
        <Providers>
          <Toaster position="top-center" richColors theme="light" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
