import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, letting later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Like `cn(base, className)`, but also accepts Base UI's state function form
 * (`className={(state) => ...}`), so wrapped parts keep that feature.
 */
export function cnState<State>(
  base: ClassValue,
  className: string | ((state: State) => string | undefined) | undefined,
): string | ((state: State) => string) {
  if (typeof className === "function") return (state: State) => cn(base, className(state));
  return cn(base, className);
}
