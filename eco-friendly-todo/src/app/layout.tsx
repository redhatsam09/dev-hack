import type { Metadata } from "next";
import { Poppins, Bitter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
  title: "Eco-Todo App",
  description: "Manage your tasks and learn how to recycle items properly with our AI assistant.",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
