import * as React from "react";
import { cn } from "../lib/cn.js";
import { SpinnerIcon } from "./icons.js";

/**
 * A loading indicator announced as "Loading" (override with `aria-label`).
 * Inside something that already announces its state (a busy Button, a combobox Status), pass `aria-hidden`.
 */
export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      aria-hidden={false}
      className={cn("size-4 text-muted-foreground motion-reduce:animate-[spin_1.5s_linear_infinite]", className)}
      {...props}
    />
  );
}
