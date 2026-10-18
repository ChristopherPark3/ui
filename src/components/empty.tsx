import * as React from "react";
import { cn } from "../lib/cn.js";

/** An empty state: nothing to show yet, no results, or nothing matches the filters. */
export function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-dashed p-6 text-center text-balance md:p-12",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-2", className)} {...props} />;
}

/** A decorative icon above the title. */
export function EmptyIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-icon"
      aria-hidden
      className={cn(
        "mb-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-title" className={cn("text-lg font-medium tracking-tight", className)} {...props} />;
}

export function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

/** Buttons or links that get the user unstuck (create the first item, clear filters). */
export function EmptyActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty-actions" className={cn("flex flex-wrap items-center justify-center gap-2", className)} {...props} />
  );
}
