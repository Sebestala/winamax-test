import React from "react";
import Image from "next/image";

export const TopNavBar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-background border-b border-gray-300">
    <div className="flex justify-center">
      <Image
        src="/assets/logo.png"
        alt="Winamax Logo"
        className="h-12"
        width={42}
        height={42}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  </nav>
);
