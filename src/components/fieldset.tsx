import * as React from "react";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cnState } from "../lib/cn.js";

export function Fieldset({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      className={cnState("m-0 flex min-w-0 flex-col gap-4 border-0 p-0", className)}
      {...props}
    />
  );
}

export function FieldsetLegend({ className, ...props }: FieldsetPrimitive.Legend.Props) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={cnState("text-base font-semibold data-[disabled]:opacity-50", className)}
      {...props}
    />
  );
}
