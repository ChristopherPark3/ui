"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn, cnState } from "../lib/cn.js";
import { clearButton, fieldControl, focusRing, invalid } from "../lib/styles.js";
import { clearButtonProps, useClearable } from "../lib/use-clearable.js";
import { XIcon } from "./icons.js";

// Types where a clear button makes no sense (or the browser already provides one).
const UNCLEARABLE = new Set(["file", "checkbox", "radio", "range", "color", "hidden", "submit", "button", "reset", "image"]);

export interface InputProps extends InputPrimitive.Props {
  /**
   * Show a × button once the input has a value. Clicking it empties the input,
   * fires `onValueChange("")`/`onChange`, and refocuses the input. Works controlled or uncontrolled.
   * @default true
   */
  clearable?: boolean;
}

export function Input({
  className,
  clearable = true,
  type,
  ref,
  onChange,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const showClear = clearable && !UNCLEARABLE.has(type ?? "text");
  const clearState = useClearable<HTMLInputElement>({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange,
    ref,
    enabled: showClear,
    disabled,
    readOnly,
  });

  const input = (
    <InputPrimitive
      data-slot="input"
      type={type}
      ref={clearState.ref}
      disabled={disabled}
      readOnly={readOnly}
      onChange={clearState.onChange}
      className={cnState(
        cn(
          fieldControl,
          focusRing,
          invalid,
          "py-1 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&::-webkit-search-cancel-button]:appearance-none",
          showClear && "pr-8",
        ),
        className,
      )}
      {...props}
    />
  );

  if (!showClear) return input;

  return (
    <span data-slot="input-group" className="relative flex w-full min-w-0 items-center">
      {input}
      <button data-slot="input-clear" className={clearButton} {...clearButtonProps(clearState.canClear, clearState.clear)}>
        <XIcon />
      </button>
    </span>
  );
}
