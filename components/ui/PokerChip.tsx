import React, { memo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface PokerChipProps {
  isAnimating?: boolean;
  isGrayscale?: boolean;
}

export const PokerChip = memo(function PokerChip({
  isAnimating = false,
  isGrayscale = false,
}: PokerChipProps) {
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

  return (
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-dashed border-[6px] ${
        isGrayscale ? "border-gray-300" : "border-white"
      }`}
      style={{
        backgroundColor: getColor("var(--primary)"),
        boxShadow: `0px 0px 0px 0.4px black, 0px 5px 15px rgba(0, 0, 0, 0.30), inset 0 0 0 6px ${
          isGrayscale ? "#707070" : "#911d1d"
        }`,
      }}
    >
      <div className="flex items-center justify-center">
        <motion.div
          variants={starVariants}
          animate={isAnimating ? "animate" : "initial"}
          custom={0}
          className="relative z-30"
        >
          <Star
            size={26}
            fill={getColor("var(--secondary)")}
            className="-mr-2 -mb-1.5"
            stroke={isGrayscale ? "#808080" : "black"}
            strokeWidth={0.3}
          />
        </motion.div>
        <motion.div
          variants={starVariants}
          animate={isAnimating ? "animate" : "initial"}
          custom={1}
          className="relative z-50"
        >
          <Star
            size={32}
            fill={getColor("var(--secondary)")}
            className="-mt-2"
            stroke={isGrayscale ? "#808080" : "black"}
            strokeWidth={0.3}
          />
        </motion.div>
        <motion.div
          variants={starVariants}
          animate={isAnimating ? "animate" : "initial"}
          custom={2}
          className="relative z-30"
        >
          <Star
            size={26}
            fill={getColor("var(--secondary)")}
            className="-ml-2 -mb-1.5"
            stroke={isGrayscale ? "#808080" : "black"}
            strokeWidth={0.3}
          />
        </motion.div>
      </div>
    </div>
  );
});

export default PokerChip;
