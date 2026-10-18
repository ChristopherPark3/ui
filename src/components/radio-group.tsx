import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn, cnState } from "../lib/cn.js";
import { focusRing, invalid } from "../lib/styles.js";

export function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return <RadioGroupPrimitive data-slot="radio-group" className={cnState("grid gap-3", className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cnState(
        cn(
          "peer inline-flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input text-primary shadow-xs transition-[border-color,box-shadow] data-[checked]:border-primary dark:bg-input/30",
          focusRing,
          "focus-visible:border-ring",
          invalid,
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        ),
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-2 rounded-full bg-primary transition-[opacity,scale] duration-150 data-[ending-style]:scale-0 data-[starting-style]:scale-0 motion-reduce:transition-none"
      />
    </RadioPrimitive.Root>
  );
}
