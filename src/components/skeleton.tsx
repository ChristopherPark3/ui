import * as React from "react";
import { cn } from "../lib/cn.js";

/**
 * A placeholder shaped like the content that's loading. Size it with classes (`h-4 w-32`, `size-10 rounded-full`).
 * Hidden from assistive tech: mark the region that's loading with `aria-busy` instead.
 */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-lg bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  );
}
