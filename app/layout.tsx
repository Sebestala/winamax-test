import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TopNavBar } from "@/components/ui/TopNavBar";
import { BottomNavBar } from "@/components/ui/BottomNavBar";

const archivoBold = localFont({
  src: "./fonts/ArchivoNarrow-Bold.ttf",
  variable: "--font-archivo-bold",
  weight: "100 900",
});

const archivoRegular = localFont({
  src: "./fonts/ArchivoNarrow-Regular.ttf",
  variable: "--font-archivo-regular",
  weight: "100 900",
});
const archivoMedium = localFont({
  src: "./fonts/ArchivoNarrow-Medium.ttf",
  variable: "--font-archivo-medium",
  weight: "100 900",
});
const archivoSemiBold = localFont({
  src: "./fonts/ArchivoNarrow-SemiBold.ttf",
  variable: "--font-archivo-semi-bold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${archivoBold.variable} ${archivoRegular.variable} ${archivoMedium.variable} ${archivoSemiBold.variable} antialiased`}
      >
        <TopNavBar />
        {children}
        <BottomNavBar />
      </body>
    </html>
  );
}
