import React, { useState } from "react";
import { motion } from "framer-motion";
import { PokerChip } from "@/components/ui/PokerChip";
import { cn } from "@/lib/utils";

interface PokerChipToggleProps {
  onChange: (isActive: boolean) => void;
}

export function PokerChipToggle({ onChange }: PokerChipToggleProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    onChange(!isActive);
  };

  return (
    <motion.div
      className={cn("relative w-14 h-8 rounded-full p-1 cursor-pointer")}
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
        className="absolute top-1 left-1"
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
