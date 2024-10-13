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

/**
 * AnimationProvider component that provides animation state and control for its children.
 * It manages whether an animation is currently active and holds the prize pool value.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered provider component with context values.
 *
 * Context Values:
 * - isAnimating (boolean): Indicates if the animation is currently active.
 * - toggleAnimation (function): Function to start the animation with a given prize pool value.
 * - prizepool (number): The current prize pool value affecting animation behavior.
 *
 * Usage:
 * Wrap your components with AnimationProvider to access animation state and control.
 */
export const AnimationProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
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

/**
 * useAnimation custom hook to access the Animation context values.
 *
 * @returns {AnimationContextType} The animation context values including isAnimating, toggleAnimation, and prizepool.
 *
 * @throws {Error} If used outside of an AnimationProvider, an error will be thrown.
 */
export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
