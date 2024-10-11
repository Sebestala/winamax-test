"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBudget } from "@/context/BudgetContext";
import { PokerChip } from "../ui/PokerChip";
import { PokerChipToggle } from "./PokerChipToggle";
import { useForm } from "react-hook-form";

interface BudgetFormData {
  minBudget: number;
  maxBudget: number;
}

export function ButtonTournamentsMenu() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const {
    minBudget,
    maxBudget,
    setMinBudget,
    setMaxBudget,
    isTripleTournaments,
    setIsTripleTournaments,
    toggleIsChangeBudget,
  } = useBudget();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<BudgetFormData>({
    defaultValues: {
      minBudget: minBudget,
      maxBudget: maxBudget,
    },
    mode: "onChange",
  });

  const watchMinBudget = watch("minBudget");
  const watchMaxBudget = watch("maxBudget");

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

  const onValidSubmit = (data: BudgetFormData) => {
    setMinBudget(data.minBudget);
    setMaxBudget(data.maxBudget);
    toggleIsChangeBudget();
    togglePanel();
  };

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
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-3xl font-archivoBold text-textColor">Triple Tournois</h2>
                <PokerChipToggle onChange={() => setIsTripleTournaments(!isTripleTournaments)} />
              </div>
              <p className="text-sm text-textColor font-archivo mb-4">
                Entrez votre fourchette de budget pour trouver les triplets de tournois parfaits
                pour vous !
              </p>
              <form
                onSubmit={handleSubmit(onValidSubmit)}
                className="space-y-4"
              >
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
                      {...register("minBudget", {
                        required: "Ce champ est requis",
                        min: { value: 1, message: "Le budget minimum doit être d'au moins 1€" },
                        max: {
                          value: 10000,
                          message: "Le budget minimum ne peut pas dépasser 10 000€",
                        },
                        validate: (value) =>
                          Number(value) <= Number(watchMaxBudget) ||
                          "Le budget minimum ne peut pas être supérieur au budget maximum",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1 €"
                      onChange={() => {
                        trigger("maxBudget");
                      }}
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
                      {...register("maxBudget", {
                        required: "Ce champ est requis",
                        min: { value: 1, message: "Le budget maximum doit être d'au moins 1€" },
                        max: {
                          value: 10000,
                          message: "Le budget maximum ne peut pas dépasser 10 000€",
                        },
                        validate: (value) =>
                          Number(value) >= Number(watchMinBudget) ||
                          "Le budget maximum ne peut pas être inférieur au budget minimum",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10 000 €"
                      onChange={() => {
                        trigger("minBudget");
                      }}
                    />
                  </div>
                </div>
                {errors.minBudget && (
                  <p className="text-red-500 text-xs mt-1">{errors.minBudget.message}</p>
                )}
                {errors.maxBudget && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxBudget.message}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 font-archivoSemiBold"
                >
                  Trouver les Tournois
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
