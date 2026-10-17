import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, cnState } from "../lib/cn.js";

/**
 * A panel that slides in from an edge and can be swiped away.
 * Set the edge with `swipeDirection` on `<Drawer>`: "down" (bottom sheet, default), "up", "left" or "right".
 */
export const Drawer = DrawerPrimitive.Root;

export function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

const ease = "duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none";

export function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className={cn(
          "fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.5*(1-var(--drawer-swipe-progress,0)))] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[swiping]:duration-0",
          ease,
        )}
      />
      <DrawerPrimitive.Viewport data-slot="drawer-viewport" className="fixed inset-0 z-50 pointer-events-none">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cnState(
            cn(
              "group/drawer pointer-events-auto fixed flex flex-col gap-4 overflow-y-auto overscroll-contain bg-background shadow-lg outline-none transition-transform data-[swiping]:select-none",
              "[transform:translate3d(var(--drawer-swipe-movement-x,0),var(--drawer-swipe-movement-y,0),0)]",
              ease,
              // Bottom sheet
              "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[85vh] data-[swipe-direction=down]:rounded-t-2xl data-[swipe-direction=down]:border-t",
              "data-[swipe-direction=down]:data-[starting-style]:[transform:translateY(100%)] data-[swipe-direction=down]:data-[ending-style]:[transform:translateY(100%)]",
              // Top sheet
              "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[85vh] data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:border-b",
              "data-[swipe-direction=up]:data-[starting-style]:[transform:translateY(-100%)] data-[swipe-direction=up]:data-[ending-style]:[transform:translateY(-100%)]",
              // Side panels
              "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:border-l data-[swipe-direction=right]:sm:max-w-sm",
              "data-[swipe-direction=right]:data-[starting-style]:[transform:translateX(100%)] data-[swipe-direction=right]:data-[ending-style]:[transform:translateX(100%)]",
              "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:border-r data-[swipe-direction=left]:sm:max-w-sm",
              "data-[swipe-direction=left]:data-[starting-style]:[transform:translateX(-100%)] data-[swipe-direction=left]:data-[ending-style]:[transform:translateX(-100%)]",
            ),
            className,
          )}
          {...props}
        >
          <div
            aria-hidden
            className="mx-auto mt-3 hidden h-1.5 w-12 shrink-0 rounded-full bg-muted group-data-[swipe-direction=down]/drawer:block"
          />
          <DrawerPrimitive.Content data-slot="drawer-body" className="flex flex-1 flex-col gap-4">
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("flex flex-col gap-1.5 p-4 pb-0", className)} {...props} />;
}

export function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

export function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title data-slot="drawer-title" className={cnState("text-lg font-semibold", className)} {...props} />
  );
}

export function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cnState("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
