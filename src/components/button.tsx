"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.js";
import { buttonVariants } from "./button-variants.js";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a Next.js <Link>) with button styles. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
