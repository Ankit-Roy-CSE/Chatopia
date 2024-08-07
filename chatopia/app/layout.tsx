import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import { ThemeProvider } from "@/app/context/ThemeContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whatsapp Clone",
  description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body >
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </body>
      </ThemeProvider>
    </html>
  );
}
