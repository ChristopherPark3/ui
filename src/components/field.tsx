import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cnState } from "../lib/cn.js";

/**
 * Groups a label, control, description and error. Controls inside (Input, Checkbox,
 * Select, …) are labeled and described automatically, and get `data-invalid` when validation fails.
 */
export function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return <FieldPrimitive.Root data-slot="field" className={cnState("flex flex-col gap-2", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cnState(
        "flex items-center gap-2 text-sm leading-none font-medium select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cnState("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cnState(
        "text-sm text-destructive transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

/** One option in a group of checkboxes or radios inside a Field. */
export function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return <FieldPrimitive.Item data-slot="field-item" className={cnState("flex items-center gap-2", className)} {...props} />;
}
