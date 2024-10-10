"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface BudgetContextType {
  minBudget: number;
  maxBudget: number;
  setMinBudget: (value: number) => void;
  setMaxBudget: (value: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [minBudget, setMinBudget] = useState<number>(1);
  const [maxBudget, setMaxBudget] = useState<number>(10000);

  const debounce = <T extends (...args: never[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced setters, enlever useCallback et tester
  const debouncedSetMinBudget = useCallback(debounce(setMinBudget, 300), []);
  const debouncedSetMaxBudget = useCallback(debounce(setMaxBudget, 300), []);

  return (
    <BudgetContext.Provider
      value={{
        minBudget,
        maxBudget,
        setMinBudget: debouncedSetMinBudget,
        setMaxBudget: debouncedSetMaxBudget,
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
