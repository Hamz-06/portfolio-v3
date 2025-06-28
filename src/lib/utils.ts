import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMobile = ():boolean => {
  if (typeof window === 'undefined') return false; // or a default fallback
  return window.innerWidth < 460;
};