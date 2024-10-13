"use client";

import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimation } from "../../context/AnimationContext";

export const TokenAnimation = () => {
  const { isAnimating, prizepool } = useAnimation();
  const nbTokenToDisplay =
    prizepool > 10000 ? 100 : prizepool > 1000 ? 50 : prizepool > 100 ? 25 : 10;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div className="absolute inset-0 overflow-hidden">
          {[...Array(nbTokenToDisplay)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute h-16 w-16",
                i % 4 === 0
                  ? "bg-primary"
                  : i % 4 === 1
                    ? "bg-black"
                    : i % 4 === 2
                      ? "bg-green-700"
                      : "bg-blue-700",
                "pointer-events-none z-20 rounded-full border-8 border-dashed border-white",
              )}
              initial={{ top: -40, left: `${Math.random() * 100}%` }}
              animate={{
                top: "100%",
                rotate: 360 * Math.random(),
                transition: {
                  duration: 1 + Math.random() * 3,
                  ease: [0.45, 0.45, 1, 1],
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              style={{}}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
