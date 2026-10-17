import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cn, cnState } from "../lib/cn.js";
import { MinusIcon, PlusIcon } from "./icons.js";

/**
 * A numeric input with steppers. Compose it:
 * `<NumberField><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField>`.
 */
export function NumberField({ className, ...props }: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root data-slot="number-field" className={cnState("flex flex-col gap-2", className)} {...props} />
  );
}

export function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cnState(
        cn(
          "flex h-9 w-full items-stretch overflow-hidden rounded-xl border border-input shadow-xs transition-[color,box-shadow,border-color] dark:bg-input/30",
          "has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
          "data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cnState(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

const stepper =
  "flex w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4";

export function NumberFieldDecrement({ className, children, ...props }: NumberFieldPrimitive.Decrement.Props) {
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      aria-label="Decrease"
      className={cnState(cn(stepper, "border-r border-input"), className)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  );
}

export function NumberFieldIncrement({ className, children, ...props }: NumberFieldPrimitive.Increment.Props) {
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      aria-label="Increase"
      className={cnState(cn(stepper, "border-l border-input"), className)}
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  );
}

/** Drag horizontally over this area (usually wrapping the label) to change the value. */
export function NumberFieldScrubArea({ className, ...props }: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cnState("w-fit cursor-ew-resize select-none [&_label]:cursor-ew-resize", className)}
      {...props}
    />
  );
}
