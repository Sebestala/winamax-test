import React from "react";
import Image from "next/image";

export const TopNavBar = () => (
  <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-300 bg-background">
    <div className="flex justify-center">
      <Image
        src="/assets/logo.png"
        alt="Winamax Logo"
        className="h-12 h-auto w-auto"
        width={42}
        height={42}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  </nav>
);
