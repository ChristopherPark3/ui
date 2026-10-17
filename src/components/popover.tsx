import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn, cnState } from "../lib/cn.js";
import { popupSurface, popupTransition } from "../lib/styles.js";

export const Popover = PopoverPrimitive.Root;

/** Unstyled: compose with a Button via `render={<Button variant="outline" />}`. */
export function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

type PositionerProps = Pick<PopoverPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

export function PopoverContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  ...props
}: PopoverPrimitive.Popup.Props & PositionerProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className="z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cnState(cn(popupSurface, popupTransition, "flex w-72 flex-col gap-2 p-4 text-sm"), className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return <PopoverPrimitive.Title data-slot="popover-title" className={cnState("font-medium", className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cnState("text-muted-foreground", className)}
      {...props}
    />
  );
}
