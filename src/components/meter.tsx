import * as React from "react";
import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { cnState } from "../lib/cn.js";

/**
 * A static measurement within a range (disk usage, password strength). For task progress, use Progress.
 * Put `<MeterLabel>` and `<MeterValue>` inside as children; the track renders below them.
 */
export function Meter({ className, children, ...props }: MeterPrimitive.Root.Props) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cnState("grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2", className)}
      {...props}
    >
      {children}
      <MeterPrimitive.Track
        data-slot="meter-track"
        className="relative col-span-2 h-2 w-full overflow-hidden rounded-full bg-primary/20"
      >
        <MeterPrimitive.Indicator
          data-slot="meter-indicator"
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out motion-reduce:transition-none"
        />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}

export function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return <MeterPrimitive.Label data-slot="meter-label" className={cnState("text-sm font-medium", className)} {...props} />;
}

export function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={cnState("text-right text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  );
}
