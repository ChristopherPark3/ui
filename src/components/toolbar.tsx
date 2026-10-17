import * as React from "react";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import type { VariantProps } from "class-variance-authority";
import { cn, cnState } from "../lib/cn.js";
import { fieldControl, focusRing } from "../lib/styles.js";
import { buttonVariants } from "./button-variants.js";

/** Arrow keys move focus between its buttons, links and inputs. */
export function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={cnState(
        "flex w-fit items-center gap-1 rounded-xl border bg-background p-1 shadow-xs data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export type ToolbarButtonProps = ToolbarPrimitive.Button.Props & VariantProps<typeof buttonVariants>;

/** Ghost, small buttons by default. To make a toggle, pass `render={<Toggle />}`. */
export function ToolbarButton({ className, variant = "ghost", size = "sm", ...props }: ToolbarButtonProps) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cnState(cn(buttonVariants({ variant, size }), "rounded-lg"), className)}
      {...props}
    />
  );
}

export function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cnState(
        cn(
          "inline-flex h-8 items-center rounded-lg px-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
          focusRing,
        ),
        className,
      )}
      {...props}
    />
  );
}

export function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={cnState(cn(fieldControl, focusRing, "h-8 w-auto rounded-lg shadow-none"), className)}
      {...props}
    />
  );
}

export function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cnState("flex items-center gap-1 data-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  );
}

export function ToolbarSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cnState(
        "mx-1 shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}
