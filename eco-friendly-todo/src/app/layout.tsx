import type { Metadata } from "next";
import { Poppins, Bitter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});

export const metadata: Metadata = {
  title: "Eco-Recycle Challenge",
  description: "Learn how to recycle items properly and earn points!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${bitter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
