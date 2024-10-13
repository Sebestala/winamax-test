import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TopNavBar, BottomNavBar } from "@/components/index";
import { AnimationProvider } from "../context/AnimationContext";
import { BudgetProvider } from "../context/BudgetContext";

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
  title: "Home",
  description: "Home page",
};

/**
 * Root layout component for the application, wrapping the main content with navigation bars and context providers.
 *
 * @param {React.ReactNode} children - The child elements to render inside the layout.
 * @returns {JSX.Element} The rendered component containing the top navigation bar, main content, and bottom navigation bar.
 *
 * Features:
 * - Sets the HTML language attribute to French (`lang="fr"`).
 * - Applies custom local fonts to the body using CSS variables for styling.
 * - Wraps the main content in `BudgetProvider` and `AnimationProvider` for state management.
 * - Includes top and bottom navigation bars for consistent navigation across the application.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="fr">
      <body
        className={`${archivoBold.variable} ${archivoRegular.variable} ${archivoMedium.variable} ${archivoSemiBold.variable} antialiased`}
      >
        <TopNavBar />
        <BudgetProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </BudgetProvider>
        <BottomNavBar />
      </body>
    </html>
  );
}
