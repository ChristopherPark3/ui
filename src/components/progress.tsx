import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cnState } from "../lib/cn.js";

/**
 * A progress bar. Put `<ProgressLabel>` and `<ProgressValue>` inside as children;
 * the track renders below them. Pass `value={null}` for an indeterminate bar.
 */
export function Progress({ className, children, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cnState("grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2", className)}
      {...props}
    >
      {children}
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="relative col-span-2 h-2 w-full overflow-hidden rounded-full bg-primary/20"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out data-[indeterminate]:w-1/3 data-[indeterminate]:animate-progress-indeterminate motion-reduce:transition-none"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label data-slot="progress-label" className={cnState("text-sm font-medium", className)} {...props} />
  );
}

export function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cnState("text-right text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  );
}
