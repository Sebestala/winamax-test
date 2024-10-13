import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 * It uses clsx to handle conditional classes and tailwind-merge to merge Tailwind CSS classes,
 * ensuring that conflicting styles are resolved properly.
 *
 * @param {...ClassValue[]} inputs - A list of class names or conditions that evaluate to class names.
 * @returns {string} The combined class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
