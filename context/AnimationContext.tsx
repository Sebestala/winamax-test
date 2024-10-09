"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
  isAnimating: boolean;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAnimation = () => {
    setIsAnimating(true);
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  };

  return (
    <AnimationContext.Provider value={{ isAnimating, toggleAnimation }}>
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
