import * as React from "react";
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { cn, cnState } from "../lib/cn.js";
import { focusRing, invalid } from "../lib/styles.js";
import { MinusIcon } from "./icons.js";

/** A one-time-code input. Render one `<OTPFieldInput>` per character (`length` of them). */
export function OTPField({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      className={cnState("flex items-center gap-2 data-[disabled]:opacity-50", className)}
      {...props}
    />
  );
}

export function OTPFieldInput({ className, ...props }: OTPFieldPrimitive.Input.Props) {
  return (
    <OTPFieldPrimitive.Input
      data-slot="otp-field-input"
      className={cnState(
        cn(
          "size-10 shrink-0 rounded-xl border border-input bg-transparent text-center text-base font-medium tabular-nums shadow-xs transition-[color,box-shadow,border-color] focus-visible:border-ring dark:bg-input/30",
          focusRing,
          invalid,
          "data-[disabled]:cursor-not-allowed",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function OTPFieldSeparator({ className, children, ...props }: OTPFieldPrimitive.Separator.Props) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      className={cnState("flex items-center text-muted-foreground [&_svg]:size-4", className)}
      {...props}
    >
      {children ?? <MinusIcon />}
    </OTPFieldPrimitive.Separator>
  );
}
