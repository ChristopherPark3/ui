import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cnState } from "../lib/cn.js";

export interface SliderProps extends SliderPrimitive.Root.Props {
  /**
   * `aria-label` for each thumb, in order. Needed when there's no `<SliderLabel>`,
   * and for range sliders to tell the thumbs apart (e.g. `["Minimum price", "Maximum price"]`).
   */
  thumbLabels?: string[];
}

/**
 * Pass an array `value`/`defaultValue` for a range slider: one thumb is rendered per value.
 * Put `<SliderLabel>` and `<SliderValue>` inside as children; the track renders below them.
 */
export function Slider({ className, children, thumbLabels, ...props }: SliderProps) {
  const values = props.value ?? props.defaultValue;
  const thumbCount = Array.isArray(values) ? values.length : 1;

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cnState(
        "grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto",
        className,
      )}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="col-span-2 flex w-full touch-none items-center py-2 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:justify-center data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full rounded-full bg-muted select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="rounded-full bg-primary select-none data-[invalid]:bg-destructive"
          />
          {Array.from({ length: thumbCount }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              index={thumbCount > 1 ? index : undefined}
              aria-label={thumbLabels?.[index]}
              data-slot="slider-thumb"
              className="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm transition-[box-shadow] select-none hover:ring-4 hover:ring-ring/50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/50 data-[dragging]:ring-4 data-[dragging]:ring-ring/50 data-[invalid]:border-destructive data-[invalid]:ring-destructive/20"
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return <SliderPrimitive.Label data-slot="slider-label" className={cnState("text-sm font-medium", className)} {...props} />;
}

export function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cnState("text-right text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  );
}
