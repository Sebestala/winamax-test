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

/**
 * BudgetProvider component that provides budget-related state and control for its children.
 * It manages minimum and maximum budget values, triple tournament state, and budget change status.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered provider component with context values.
 *
 * Context Values:
 * - minBudget (number): The minimum budget value.
 * - maxBudget (number): The maximum budget value.
 * - setMinBudget (function): Function to update the minimum budget value.
 * - setMaxBudget (function): Function to update the maximum budget value.
 * - isTripleTournaments (boolean): Indicates if triple tournaments are enabled.
 * - setIsTripleTournaments (function): Function to enable or disable triple tournaments.
 * - isChangeBudget (boolean): Indicates if the budget is currently being changed.
 * - toggleIsChangeBudget (function): Function to toggle the budget change state.
 *
 * Usage:
 * Wrap your components with BudgetProvider to access budget state and control.
 */
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

/**
 * useBudget custom hook to access the Budget context values.
 *
 * @returns {BudgetContextType} The budget context values including minBudget, maxBudget, and related functions.
 *
 * @throws {Error} If used outside of a BudgetProvider, an error will be thrown.
 */ export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
