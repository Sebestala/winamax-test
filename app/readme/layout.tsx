import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readme",
  description: "Readme page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-16">{children}</div>;
}
