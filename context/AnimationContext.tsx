"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
  isAnimating: boolean;
  toggleAnimation: (prizepool: number) => void;
  prizepool: number;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prizepool, setPrizepool] = useState(0);

  const toggleAnimation = (prizepool: number) => {
    setIsAnimating(true);
    setPrizepool(prizepool);
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  };

  return (
    <AnimationContext.Provider
      value={{ isAnimating, toggleAnimation, prizepool }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
