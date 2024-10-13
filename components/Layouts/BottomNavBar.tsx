"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

/**
 * BottomNavBar component provides a fixed navigation bar at the bottom of the screen
 *
 * @returns {JSX.Element} The rendered bottom navigation bar component.
 *
 * Features:
 * - Contains buttons for navigating to the Home and Readme sections.
 */
export const BottomNavBar = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 bg-white">
      <div className="flex justify-around">
        <button
          onClick={() => {
            setActiveTab("home");
            router.push("/");
          }}
          className={`flex flex-col items-center px-4 py-2 text-textColor`}
          aria-label="Home link"
        >
          <Image
            src={
              activeTab === "home"
                ? "/assets/tabbar/Home-Actif.svg"
                : "/assets/tabbar/Home-Inactif.svg"
            }
            alt="Home"
            className="h-auto w-auto"
            width={42}
            height={42}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className={cn(
              "leading-none",
              activeTab === "home"
                ? "font-archivoSemiBold"
                : "font-archivoMedium",
            )}
          >
            Home
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("readme");
            router.push("/readme");
          }}
          className={`flex flex-col items-center px-4 py-2 text-textColor`}
          aria-label="Readme link"
        >
          <Image
            src={
              activeTab === "readme"
                ? "/assets/tabbar/Readme-Actif.svg"
                : "/assets/tabbar/Readme-Inactif.svg"
            }
            alt="Readme"
            className="h-auto w-auto"
            width={42}
            height={42}
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className={cn(
              "leading-none",
              activeTab === "readme"
                ? "font-archivoSemiBold"
                : "font-archivoMedium",
            )}
          >
            Readme
          </span>
        </button>
      </div>
    </nav>
  );
};
