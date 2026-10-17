"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { cnState } from "../lib/cn.js";
import { toggleVariants, type ToggleProps } from "./toggle.js";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({});

export type ToggleGroupProps = ToggleGroupPrimitive.Props & VariantProps<typeof toggleVariants>;

/** Set `multiple` to allow several items to be pressed. `variant` and `size` apply to every item. */
export function ToggleGroup({ className, variant, size, children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cnState("flex w-fit items-center gap-1 data-[orientation=vertical]:flex-col", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export function ToggleGroupItem({ className, variant, size, ...props }: ToggleProps) {
  const group = React.useContext(ToggleGroupContext);
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cnState(toggleVariants({ variant: group.variant ?? variant, size: group.size ?? size }), className)}
      {...props}
    />
  );
}
