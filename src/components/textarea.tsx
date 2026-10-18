"use client";

import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "../lib/cn.js";
import { clearButton, focusRing, invalid } from "../lib/styles.js";
import { clearButtonProps, useClearable } from "../lib/use-clearable.js";
import { XIcon } from "./icons.js";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Like Input's: a × in the top-right corner once there's text. @default true */
  clearable?: boolean;
  /** Called with the new text on every change, like Input's `onValueChange`. */
  onValueChange?: (value: string) => void;
}

/**
 * Multi-line text. Grows with its content (`field-sizing: content`) between `min-h-16` and any
 * `max-h-*` you set. Inside a `<Field>` it's labeled, described and validated like Input.
 */
export function Textarea({
  className,
  clearable = true,
  ref,
  onChange,
  onValueChange,
  disabled,
  readOnly,
  ...props
}: TextareaProps) {
  const clearState = useClearable<HTMLTextAreaElement>({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: (event) => {
      onChange?.(event);
      onValueChange?.(event.currentTarget.value);
    },
    ref,
    enabled: clearable,
    disabled,
    readOnly,
  });

  // Field.Control wires up the Field's label, description and validation; render it as a textarea.
  const textarea = (
    <FieldPrimitive.Control
      data-slot="textarea"
      disabled={disabled}
      render={
        <textarea
          ref={clearState.ref}
          readOnly={readOnly}
          onChange={clearState.onChange}
          className={cn(
            "flex field-sizing-content min-h-16 w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow,border-color] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring md:text-sm dark:bg-input/30",
            focusRing,
            invalid,
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            clearable && "pr-8",
            className,
          )}
          {...props}
        />
      }
    />
  );

  if (!clearable) return textarea;

  return (
    <span data-slot="textarea-group" className="relative flex w-full min-w-0">
      {textarea}
      <button
        data-slot="textarea-clear"
        className={cn(clearButton, "top-1.5 translate-y-0")}
        {...clearButtonProps(clearState.canClear, clearState.clear)}
      >
        <XIcon />
      </button>
    </span>
  );
}
