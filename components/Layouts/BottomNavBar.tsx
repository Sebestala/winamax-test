"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50">
      <div className="flex justify-around">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center py-2 px-4 text-textColor`}
          aria-label="Home link"
        >
          <Image
            src={
              activeTab === "home"
                ? "/assets/tabbar/Home-Actif.svg"
                : "/assets/tabbar/Home-Inactif.svg"
            }
            alt="Home"
            className="h-11 h-auto w-auto"
            width={42}
            height={42}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className={cn(
              "leading-none",
              activeTab === "home" ? "font-archivoSemiBold" : "font-archivoMedium"
            )}
          >
            Home
          </span>
        </button>
        <button
          onClick={() => setActiveTab("readme")}
          className={`flex flex-col items-center py-2 px-4 text-textColor`}
          aria-label="Readme link"
        >
          <Image
            src={
              activeTab === "readme"
                ? "/assets/tabbar/Readme-Actif.svg"
                : "/assets/tabbar/Readme-Inactif.svg"
            }
            alt="Readme"
            className="h-11 h-auto w-auto"
            width={42}
            height={42}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className={cn(
              "leading-none",
              activeTab === "readme" ? "font-archivoSemiBold" : "font-archivoMedium"
            )}
          >
            Readme
          </span>
        </button>
      </div>
    </nav>
  );
};
