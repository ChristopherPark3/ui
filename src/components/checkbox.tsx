import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cn, cnState } from "../lib/cn.js";
import { focusRing, invalid } from "../lib/styles.js";
import { CheckIcon, MinusIcon } from "./icons.js";

export function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cnState(
        cn(
          "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-input shadow-xs transition-[color,background-color,border-color,box-shadow] dark:bg-input/30",
          "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:border-primary data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground",
          focusRing,
          "focus-visible:border-ring",
          invalid,
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        ),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center transition-[opacity,scale] duration-150 data-[ending-style]:scale-50 data-[ending-style]:opacity-0 data-[starting-style]:scale-50 data-[starting-style]:opacity-0 motion-reduce:transition-none"
      >
        <CheckIcon className="size-3.5 in-data-[indeterminate]:hidden" strokeWidth={3} />
        <MinusIcon className="hidden size-3.5 in-data-[indeterminate]:block" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/** Shares a `value` array across its checkboxes. Give each Checkbox a `value`. */
export function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      className={cnState("flex flex-col gap-3 data-[disabled]:opacity-50", className)}
      {...props}
    />
  );
}
