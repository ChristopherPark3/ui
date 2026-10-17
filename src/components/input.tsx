"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn, cnState } from "../lib/cn.js";
import { clearButton, fieldControl, focusRing, invalid } from "../lib/styles.js";
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const controlled = props.value !== undefined;
  const [uncontrolledFilled, setUncontrolledFilled] = React.useState(() => hasText(props.defaultValue));
  const filled = controlled ? hasText(props.value) : uncontrolledFilled;
  const showClear = clearable && !UNCLEARABLE.has(type ?? "text");
  const canClear = showClear && filled && !disabled && !readOnly;

  function clear() {
    const input = inputRef.current;
    if (!input) return;
    // Set the value the way the browser would, so React's onChange (and Base UI's onValueChange) fire.
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  const input = (
    <InputPrimitive
      data-slot="input"
      type={type}
      ref={mergeRefs(inputRef, ref)}
      disabled={disabled}
      readOnly={readOnly}
      onChange={(event) => {
        if (!controlled) setUncontrolledFilled(event.currentTarget.value !== "");
        onChange?.(event);
      }}
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
      <button
        type="button"
        data-slot="input-clear"
        aria-label="Clear"
        // Out of the tab order: keyboard users can select and delete. Still reachable by screen readers.
        tabIndex={-1}
        data-hidden={canClear ? undefined : ""}
        aria-hidden={canClear ? undefined : true}
        disabled={!canClear}
        onClick={clear}
        className={clearButton}
      >
        <XIcon />
      </button>
    </span>
  );
}

function hasText(value: unknown) {
  return value !== undefined && value !== null && String(value) !== "";
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    });
    return () =>
      cleanups.forEach((cleanup, i) => {
        if (typeof cleanup === "function") cleanup();
        else {
          const ref = refs[i];
          if (typeof ref === "function") ref(null);
          else if (ref) ref.current = null;
        }
      });
  };
}
