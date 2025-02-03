import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CATCHR",
  description: "Can you catch the rhythm",
};

const customFont = localFont({
  src: "../../public/fonts/Hoover-Variable.ttf",
  display: "swap",
  variable: "--hoover-font",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={customFont.variable}>
      <body className="bg-[#0B0C0E] ">{children}</body>
    </html>
  );
}
