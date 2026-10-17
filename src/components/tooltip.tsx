import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn, cnState } from "../lib/cn.js";
import { popupTransition } from "../lib/styles.js";

/**
 * Wrap the app (or a toolbar) so neighboring tooltips open instantly after the first one.
 * `delay` is the hover delay in ms.
 */
export function TooltipProvider({ delay = 300, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

/**
 * A visual label on hover/focus. It isn't announced by screen readers, so give the
 * trigger an `aria-label` matching the tooltip text. For important info, use Popover.
 */
export const Tooltip = TooltipPrimitive.Root;

/** Compose with a Button via `render={<Button />}`. */
export function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type PositionerProps = Pick<TooltipPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

export function TooltipContent({
  className,
  children,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  ...props
}: TooltipPrimitive.Popup.Props & PositionerProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        className="z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cnState(
            cn(
              "w-fit max-w-xs rounded-lg bg-foreground px-3 py-1.5 text-xs text-balance text-background",
              popupTransition,
              "data-[instant]:transition-none",
            ),
            className,
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            className="size-2.5 rotate-45 rounded-[2px] bg-foreground data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1"
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
