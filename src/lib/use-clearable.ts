import * as React from "react";

type TextControl = HTMLInputElement | HTMLTextAreaElement;

interface Options<El extends TextControl> {
  value: unknown;
  defaultValue: unknown;
  onChange: React.ChangeEventHandler<El> | undefined;
  ref: React.Ref<El> | undefined;
  enabled: boolean;
  disabled: boolean | undefined;
  readOnly: boolean | undefined;
}

interface Clearable<El extends TextControl> {
  ref: React.RefCallback<El>;
  onChange: (event: React.ChangeEvent<El>) => void;
  canClear: boolean;
  clear: () => void;
}

/**
 * State for a text control's clear (×) button. Tracks whether it has a value, controlled or not,
 * and clears it the way the browser would so `onChange` / Base UI's `onValueChange` fire.
 */
export function useClearable<El extends TextControl>({
  value,
  defaultValue,
  onChange,
  ref,
  enabled,
  disabled,
  readOnly,
}: Options<El>): Clearable<El> {
  const elementRef = React.useRef<El>(null);
  const controlled = value !== undefined;
  const [uncontrolledFilled, setUncontrolledFilled] = React.useState(() => hasText(defaultValue));
  const filled = controlled ? hasText(value) : uncontrolledFilled;

  function clear() {
    const element = elementRef.current;
    if (!element) return;
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(element, "");
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.focus();
  }

  return {
    ref: mergeRefs(elementRef, ref),
    onChange: (event: React.ChangeEvent<El>) => {
      if (!controlled) setUncontrolledFilled(event.currentTarget.value !== "");
      onChange?.(event);
    },
    canClear: enabled && filled && !disabled && !readOnly,
    clear,
  };
}

/** Props for the × button itself. Out of the tab order: keyboard users can select and delete. */
export function clearButtonProps(canClear: boolean, clear: () => void) {
  return {
    type: "button" as const,
    "aria-label": "Clear",
    tabIndex: -1,
    "data-hidden": canClear ? undefined : "",
    "aria-hidden": canClear ? undefined : true,
    disabled: !canClear,
    onClick: clear,
  };
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
