import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readme",
  description: "Readme page",
};

/**
 * Root layout component for the application.
 *
 * @param {React.ReactNode} children - The child elements to render inside the layout.
 * @returns {JSX.Element} The rendered component with top and bottom padding.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-16">{children}</div>;
}
