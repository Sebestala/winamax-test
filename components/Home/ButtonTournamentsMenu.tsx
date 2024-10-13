"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokerChip } from "../ui/PokerChip";
import { TournamentsMenu } from "./TounamentsMenu";

export function ButtonTournamentsMenu() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 769);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  return (
    <div className="relative">
      {(!isPanelOpen || isDesktop) && (
        <AnimatePresence>
          <motion.div
            className="fixed bottom-20 right-6 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
              },
            }}
            onClick={togglePanel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <PokerChip />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {isPanelOpen && <TournamentsMenu togglePanel={togglePanel} />}
      </AnimatePresence>
    </div>
  );
}
