import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BowlProvider } from "@/components/BowlContext";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wayora — Premium Food for Happy Pets",
  description:
    "Choose the purr-fect meal for your best friend. Fresh, natural pet food made with love at Wayora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#E2E1DF] text-[#1A1A1A] font-sans antialiased selection:bg-[#E76F51] selection:text-white">
        <BowlProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </BowlProvider>
      </body>
    </html>
  );
}
