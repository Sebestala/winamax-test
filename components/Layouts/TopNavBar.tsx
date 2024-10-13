import React from "react";
import Image from "next/image";

/**
 * TopNavBar component displays a fixed navigation bar at the top of the screen.
 *
 * @returns {JSX.Element} The rendered top navigation bar component.
 *
 * Features:
 * - Displays the Winamax logo centered in the navigation bar.
 */
export const TopNavBar = (): JSX.Element => (
  <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-300 bg-background">
    <div className="flex justify-center">
      <Image
        src="/assets/logo.png"
        alt="Winamax Logo"
        className="h-auto w-auto"
        width={42}
        height={42}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  </nav>
);
