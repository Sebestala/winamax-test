"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PokerChip } from "@/components/ui/PokerChip";
import { cn } from "@/utils/utils";
import { useBudget } from "@/context/BudgetContext";

/**
 * Toggle switch component for activating or deactivating the triple tournaments feature.
 *
 * Features:
 * - Changes background color based on the active state.
 * - Animates a poker chip that moves and changes appearance when toggled.
 */
export function PokerChipToggle(): JSX.Element {
  const { isTripleTournaments, setIsTripleTournaments } = useBudget();
  const [isActive, setIsActive] = useState(isTripleTournaments);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    setIsTripleTournaments(!isTripleTournaments);
  };

  return (
    <motion.div
      className={cn("relative h-8 w-14 cursor-pointer rounded-full p-1")}
      style={{
        boxShadow: "0px 0px 0px 0.4px black, 0px 2px 6px rgba(0, 0, 0, 0.30)",
      }}
      onClick={toggleSwitch}
      animate={{
        backgroundColor: isActive ? "var(--primaryDarker)" : "#e0e0e0",
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <motion.div
        className="absolute left-1 top-1"
        animate={{
          x: isActive ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <PokerChip
          isAnimating={isActive}
          isGrayscale={!isActive}
          size="small"
        />
      </motion.div>
    </motion.div>
  );
}
