import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn, cnState } from "../lib/cn.js";
import { focusRing, invalid } from "../lib/styles.js";

export function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cnState(
        cn(
          "peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-input shadow-xs transition-[background-color,box-shadow] data-[checked]:bg-primary dark:bg-input/80 dark:data-[checked]:bg-primary",
          focusRing,
          invalid,
          "data-[invalid]:ring-[3px] aria-invalid:ring-[3px]",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        ),
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 translate-x-0.5 rounded-full bg-background shadow-sm transition-transform duration-200 ease-out data-[checked]:translate-x-4 dark:bg-foreground dark:data-[checked]:bg-primary-foreground motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}
