"use client";

import * as React from "react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn, cnState } from "../lib/cn.js";
import { buttonVariants } from "./button-variants.js";
import { CheckIcon, SpinnerIcon, XIcon } from "./icons.js";

/**
 * Wrap the app in `<ToastProvider>` and render `<Toaster />` once inside it. Then:
 * `const toast = useToastManager(); toast.add({ title, description, type })`.
 * `toast.promise(promise, { loading, success, error })` shows a spinner until the promise settles.
 * To add toasts from outside React, pass `toastManager={createToastManager()}` to the provider.
 */
export const ToastProvider = ToastPrimitive.Provider;
export const useToastManager = ToastPrimitive.useToastManager;
export const createToastManager = ToastPrimitive.createToastManager;

/** Where toasts appear: bottom right, stacked. Hover or focus to expand the stack. */
export function Toaster({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        data-slot="toaster"
        className={cnState(
          "fixed top-auto right-4 bottom-4 z-50 mx-auto w-[calc(100vw-2rem)] outline-none sm:right-8 sm:bottom-8 sm:w-90",
          className,
        )}
        {...props}
      >
        <ToastList />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  );
}

// Stacking and swipe-to-dismiss, adapted from Base UI's reference styles.
const toastRoot = cn(
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
  "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-xl border bg-popover text-popover-foreground shadow-lg select-none",
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  "h-(--height) data-[expanded]:h-(--toast-height) data-[ending-style]:opacity-0 data-[limited]:opacity-0",
  "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
  "data-[starting-style]:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
  "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
  "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
  "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] motion-reduce:[transition:opacity_0.2s]",
);

function ToastList() {
  const { toasts } = useToastManager();
  return toasts.map((toast) => (
    <ToastPrimitive.Root key={toast.id} toast={toast} data-slot="toast" className={toastRoot}>
      <ToastPrimitive.Content className="flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-250 data-[behind]:opacity-0 data-[expanded]:opacity-100">
        <ToastIcon type={toast.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastPrimitive.Title className="text-sm font-medium data-[type=error]:text-destructive" />
          <ToastPrimitive.Description className="text-sm text-muted-foreground" />
        </div>
        <ToastPrimitive.Action className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-lg")} />
        <ToastPrimitive.Close
          aria-label="Close"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "-mt-1 -mr-1 size-7 rounded-lg")}
        >
          <XIcon />
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  ));
}

function ToastIcon({ type }: { type: string | undefined }) {
  const icon =
    type === "loading" ? (
      <SpinnerIcon />
    ) : type === "success" ? (
      <CheckIcon />
    ) : type === "error" ? (
      <XIcon className="text-destructive" />
    ) : null;
  if (!icon) return null;
  return <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">{icon}</span>;
}
