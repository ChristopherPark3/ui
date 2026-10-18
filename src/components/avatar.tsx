import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cnState } from "../lib/cn.js";

export function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cnState("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none", className)}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cnState(
        "aspect-square size-full object-cover transition-opacity duration-200 data-[starting-style]:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

/** Shown while the image loads or if it fails. Pass `delay` (ms) to avoid a flash on fast loads. */
export function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cnState(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}
