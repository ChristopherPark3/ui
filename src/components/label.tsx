import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * A plain `<label>`, for labeling a control by `htmlFor` or by wrapping it.
 * Inside a `<Field>`, use `<FieldLabel>` instead: it's wired up automatically.
 */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none peer-data-[disabled]:cursor-not-allowed peer-data-[disabled]:opacity-50 has-data-[disabled]:cursor-not-allowed has-data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
