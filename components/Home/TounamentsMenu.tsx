import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useBudget } from "@/context/BudgetContext";
import { PokerChipToggle } from "./PokerChipToggle";
import { useForm } from "react-hook-form";

interface BudgetFormData {
  minBudget: number;
  maxBudget: number;
}

interface TournamentsMenuProps {
  togglePanel: () => void;
}

/**
 * Tournaments menu component that allows users to set budget limits for tournaments and toggle the triple tournaments feature.
 *
 * @param {function} togglePanel - Function to toggle the visibility of the tournament menu.
 * @returns {JSX.Element} The rendered tournaments menu component.
 *
 * Features:
 * - Provides visual feedback for validation errors related to budget input.
 * - Allows users to input minimum and maximum budget values with constraints on their ranges.
 * - Includes a toggle switch for enabling or disabling the triple tournaments feature.
 */
export function TournamentsMenu({
  togglePanel,
}: TournamentsMenuProps): JSX.Element {
  const {
    minBudget,
    maxBudget,
    setMinBudget,
    setMaxBudget,
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

  const onValidSubmit = (data: BudgetFormData) => {
    setIsTripleTournaments(true);
    setMinBudget(data.minBudget);
    setMaxBudget(data.maxBudget);
    toggleIsChangeBudget();
    togglePanel();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-screen-md">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="z-40 mx-2 rounded-t-2xl bg-white p-6 pb-20 shadow-lg lg:mx-0 lg:-ml-3"
      >
        <button
          onClick={togglePanel}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="mb-4 flex items-center space-x-4">
          <h2 className="font-archivoBold text-3xl text-textColor">
            Triple Tournois
          </h2>
          <PokerChipToggle />
        </div>
        <p className="mb-4 font-archivo text-sm text-textColor">
          Entrez votre fourchette de budget pour trouver les triplets de
          tournois parfaits pour vous !
        </p>
        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="minBudget"
                className="mb-1 block font-archivoMedium text-sm font-medium text-textColor"
              >
                Budget Minimum (€)
              </label>
              <input
                type="number"
                id="minBudget"
                {...register("minBudget", {
                  required: "Ce champ est requis",
                  min: {
                    value: 1,
                    message: "Le budget minimum doit être d'au moins 1€",
                  },
                  max: {
                    value: 10000,
                    message: "Le budget minimum ne peut pas dépasser 10 000€",
                  },
                  validate: (value) =>
                    Number(value) <= Number(watchMaxBudget) ||
                    "Le budget minimum ne peut pas être supérieur au budget maximum",
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1 €"
                onChange={() => {
                  trigger("maxBudget");
                }}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="maxBudget"
                className="mb-1 block font-archivoMedium text-sm font-medium text-textColor"
              >
                Budget Maximum (€)
              </label>
              <input
                type="number"
                id="maxBudget"
                {...register("maxBudget", {
                  required: "Ce champ est requis",
                  min: {
                    value: 1,
                    message: "Le budget maximum doit être d'au moins 1€",
                  },
                  max: {
                    value: 10000,
                    message: "Le budget maximum ne peut pas dépasser 10 000€",
                  },
                  validate: (value) =>
                    Number(value) >= Number(watchMinBudget) ||
                    "Le budget maximum ne peut pas être inférieur au budget minimum",
                })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10 000 €"
                onChange={() => {
                  trigger("minBudget");
                }}
              />
            </div>
          </div>
          {errors.minBudget && (
            <p className="mt-1 text-xs text-red-500">
              {errors.minBudget.message}
            </p>
          )}
          {errors.maxBudget && (
            <p className="mt-1 text-xs text-red-500">
              {errors.maxBudget.message}
            </p>
          )}
          <button
            type="submit"
            className="hover:bg-primary/90 w-full rounded-lg bg-primary px-4 py-2 font-archivoSemiBold text-white"
          >
            Trouver les Tournois
          </button>
        </form>
      </motion.div>
    </div>
  );
}
