import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cnState } from "../lib/cn.js";

export const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-[color,background-color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:outline-1 aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>;

/** A two-state button. Use `pressed` / `onPressedChange` to control it. */
export function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return <TogglePrimitive data-slot="toggle" className={cnState(toggleVariants({ variant, size }), className)} {...props} />;
}
