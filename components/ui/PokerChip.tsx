import React, { memo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";

interface PokerChipProps {
  isAnimating?: boolean;
  isGrayscale?: boolean;
  size?: "small" | "large";
}

export const PokerChip = memo(
  function PokerChip({ isAnimating = true, isGrayscale = false, size = "large" }: PokerChipProps) {
    const starVariants = {
      animate: (i: number) => ({
        scale: [1, 1.2, 1],
        transition: {
          delay: i * 0.6,
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        },
      }),
      initial: { scale: 1 },
    };

    const getColor = (color: string) => {
      if (isGrayscale) {
        return color === "var(--primary)" ? "#a0a0a0" : "#d0d0d0";
      }
      return color;
    };

    const sizeClasses = size === "small" ? "w-6 h-6" : "w-14 h-14";
    const borderClasses = size === "small" ? "border-[3px]" : "border-[6px]";
    const starSizes = size === "small" ? [12, 14, 12] : [26, 32, 26];

    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white border-dashed",
          sizeClasses,
          borderClasses,
          isGrayscale ? "border-gray-300" : "border-white"
        )}
        style={{
          backgroundColor: getColor("var(--primary)"),
          boxShadow: `0px 0px 0px 0.4px black, 0px 2px 6px rgba(0, 0, 0, 0.30), inset 0 0 0 ${
            size === "small" ? "3px" : "6px"
          } ${isGrayscale ? "#707070" : "var(--primaryDarker)"}`,
        }}
      >
        <div className="flex items-center justify-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={starVariants}
              animate={isAnimating ? "animate" : "initial"}
              custom={index}
              className={cn("relative", index === 1 ? "z-50" : "z-30")}
            >
              <Star
                size={starSizes[index]}
                fill={getColor("var(--secondary)")}
                className={cn(
                  index === 0 ? "-mr-1 -mb-0.5" : index === 1 ? "-mt-1" : "-ml-1 -mb-0.5",
                  size === "small" ? "scale-75" : ""
                )}
                stroke={isGrayscale ? "#808080" : "black"}
                strokeWidth={0.3}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isAnimating === nextProps.isAnimating &&
      prevProps.isGrayscale === nextProps.isGrayscale &&
      prevProps.size === nextProps.size
    );
  }
);
