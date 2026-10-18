import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn, cnState } from "../lib/cn.js";
import { popupSurface, popupTransition } from "../lib/styles.js";

/** A card that previews a link's destination on hover. */
export const PreviewCard = PreviewCardPrimitive.Root;

export function PreviewCardTrigger({ className, ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      className={cnState(
        "rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

type PositionerProps = Pick<PreviewCardPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

export function PreviewCardContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  ...props
}: PreviewCardPrimitive.Popup.Props & PositionerProps) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        className="z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <PreviewCardPrimitive.Popup
          data-slot="preview-card-content"
          className={cnState(cn(popupSurface, popupTransition, "w-64 p-4 text-sm"), className)}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}
