"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";
import { animate, motion, useMotionValue, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "../lib/cn.js";
import { buttonVariants } from "./button-variants.js";
import { SpinnerIcon } from "./icons.js";

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  /**
   * Shows a spinner and blocks activation. The button stays focusable,
   * so keyboard focus isn't lost while the action is pending.
   */
  loading?: boolean;
  /**
   * Animate the width when the content changes (e.g. "Save" → "Saving…").
   * Turn off when the width comes from layout (`w-full`, a fixed width, a grid cell),
   * since the animation sets an explicit width. Always off for icon-only sizes.
   * @default true
   */
  animateWidth?: boolean;
}

/**
 * For links, don't use Button (it would get `role="button"`). Style the link instead:
 * `<Link href="/" className={buttonVariants({ variant: "outline" })}>Home</Link>`.
 */
export function Button({
  className,
  variant,
  size,
  loading = false,
  animateWidth = true,
  disabled,
  focusableWhenDisabled,
  children,
  ...props
}: ButtonProps) {
  const iconOnly = size === "icon" || size === "icon-sm" || size === "icon-lg";
  const animated = animateWidth && !iconOnly;
  const content = loading ? (iconOnly ? <SpinnerIcon /> : withSpinner(children)) : children;
  const [contentRef, width] = useAnimatedWidth(animated);

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      focusableWhenDisabled={focusableWhenDisabled || loading}
      className={cn(buttonVariants({ variant, size }), animated && "overflow-hidden", className)}
      render={animated ? <motion.button style={{ width }} /> : undefined}
      {...props}
    >
      {animated ? (
        // Measured to find the width the button should animate to.
        <span ref={contentRef} className="inline-flex shrink-0 items-center justify-center gap-[inherit]">
          {content}
        </span>
      ) : (
        content
      )}
    </ButtonPrimitive>
  );
}

/**
 * Measures the content and drives the button's width toward its natural size:
 * the first measurement is applied instantly, later changes animate.
 */
function useAnimatedWidth(enabled: boolean): [React.RefObject<HTMLSpanElement | null>, MotionValue<number | "auto">] {
  const contentRef = React.useRef<HTMLSpanElement>(null);
  const width = useMotionValue<number | "auto">("auto");
  const reduceMotion = useReducedMotion();

  React.useLayoutEffect(() => {
    const content = contentRef.current;
    const button = content?.parentElement;
    if (!enabled || !content || !button) return;

    let measured = false;
    const observer = new ResizeObserver(([entry]) => {
      const contentWidth = entry?.borderBoxSize[0]?.inlineSize;
      if (contentWidth === undefined) return;
      const style = getComputedStyle(button);
      const target =
        contentWidth +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth);
      if (!measured || reduceMotion) width.jump(target);
      else animate(width, target, { type: "spring", bounce: 0, duration: 0.35 });
      measured = true;
    });
    observer.observe(content);
    return () => {
      observer.disconnect();
      width.jump("auto");
    };
  }, [enabled, reduceMotion, width]);

  return [contentRef, width];
}

/**
 * Prepends the spinner. A leading icon (an element followed by text, as in
 * `<PlusIcon /> New project`) is swapped out for it, so the spinner takes its place.
 */
function withSpinner(children: React.ReactNode): React.ReactNode {
  const nodes = React.Children.toArray(children);
  const [first, ...rest] = nodes;
  if (nodes.length === 1 && React.isValidElement<{ children?: React.ReactNode }>(first) && first.type === React.Fragment) {
    return withSpinner(first.props.children);
  }
  const hasLeadingIcon =
    React.isValidElement(first) && rest.some((node) => typeof node === "string" || typeof node === "number");
  return [<SpinnerIcon key="spinner" />, ...(hasLeadingIcon ? rest : nodes)];
}
