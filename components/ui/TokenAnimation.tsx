"use client";

import { cn } from "@/lib/utils";
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
                "absolute w-16 h-16",
                i % 4 === 0
                  ? "bg-primary"
                  : i % 4 === 1
                  ? "bg-black"
                  : i % 4 === 2
                  ? "bg-green-700"
                  : "bg-blue-700",
                "rounded-full border-dashed border-8 border-white z-20 pointer-events-none"
              )}
              initial={{ top: -40, left: `${Math.random() * 100}%` }}
              animate={{
                top: "100%",
                rotate: 360 * Math.random(),
                transition: {
                  duration: 1.5 + Math.random() * 5,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 1.5,
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
