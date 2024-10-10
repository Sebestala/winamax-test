"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { useBudget } from "@/context/BudgetContext";

export function ButtonMenuToggle() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { minBudget, maxBudget, setMinBudget, setMaxBudget } = useBudget();

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
      <AnimatePresence>
        {(!isPanelOpen || isDesktop) && (
          <motion.button
            className="fixed bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white z-50 border-dashed border-[6px] border-white bg-primary"
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
            style={{
              boxShadow:
                "0px 0px 0px 0.4px black, 0px 5px 15px rgba(0, 0, 0, 0.30), inset 0 0 0 6px #911d1d",
            }}
          >
            <div className="flex items-center justify-center">
              <Star
                size={26}
                fill="var(--secondary)"
                className="-mr-2 -mb-1.5 "
                stroke="black"
                strokeWidth={0.3}
              />
              <Star
                size={32}
                fill="var(--secondary)"
                className="-mt-2"
                stroke="black"
                strokeWidth={0.3}
              />
              <Star
                size={26}
                fill="var(--secondary)"
                className="-ml-2 -mb-1.5"
                stroke="black"
                strokeWidth={0.3}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPanelOpen && (
          <div className="max-w-screen-md w-full mx-auto fixed inset-x-0 bottom-0">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white shadow-lg rounded-t-2xl p-6 z-40 pb-20 mx-2 lg:mx-0 lg:-ml-3"
            >
              <button
                onClick={togglePanel}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-archivoBold text-textColor mb-4">
                Filtre Triple Tournoi
              </h2>
              <p className="text-sm text-textColor font-archivo mb-4">
                Entrez votre fourchette de budget pour trouver les triplets de tournois parfaits
                pour vous !
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="minBudget"
                      className="block text-sm font-medium text-textColor font-archivoMedium mb-1"
                    >
                      Budget Minimum (€)
                    </label>
                    <input
                      type="number"
                      id="minBudget"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1 €"
                      min={1}
                      value={minBudget}
                      onChange={(e) => setMinBudget(Number(e.target.value))}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="maxBudget"
                      className="block text-sm font-medium text-textColor mb-1 font-archivoMedium"
                    >
                      Budget Maximum (€)
                    </label>
                    <input
                      type="number"
                      id="maxBudget"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10 000 €"
                      min={1}
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(Number(e.target.value))}
                    />
                  </div>
                </div>
                {/* <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300 ease-in-out font-archivoSemiBold">
                  Trouver les Tournois
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
