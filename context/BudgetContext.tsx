"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface BudgetContextType {
  minBudget: number;
  maxBudget: number;
  setMinBudget: (value: number) => void;
  setMaxBudget: (value: number) => void;
  isTripleTournaments: boolean;
  setIsTripleTournaments: (value: boolean) => void;
  isChangeBudget: boolean;
  toggleIsChangeBudget: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [minBudget, setMinBudget] = useState<number>(1);
  const [maxBudget, setMaxBudget] = useState<number>(10000);
  const [isTripleTournaments, setIsTripleTournaments] =
    useState<boolean>(false);
  const [isChangeBudget, setIsChangeBudget] = useState<boolean>(false);

  const toggleIsChangeBudget = () => {
    setIsChangeBudget(!isChangeBudget);
  };

  return (
    <BudgetContext.Provider
      value={{
        minBudget,
        maxBudget,
        setMinBudget,
        setMaxBudget,
        isTripleTournaments,
        setIsTripleTournaments,
        isChangeBudget,
        toggleIsChangeBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
