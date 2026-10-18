import * as React from "react";
import { Form as FormPrimitive } from "@base-ui/react/form";
import { cnState } from "../lib/cn.js";

/** A `<form>` that runs Field validation and shows server `errors` on matching fields by `name`. */
export function Form({ className, ...props }: FormPrimitive.Props) {
  return <FormPrimitive data-slot="form" className={cnState("flex flex-col gap-4", className)} {...props} />;
}
