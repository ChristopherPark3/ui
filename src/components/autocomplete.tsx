import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { cn, cnState } from "../lib/cn.js";
import {
  clearButton,
  fieldControl,
  focusRing,
  invalid,
  listStatus,
  menuLabel,
  menuSeparator,
  popupItem,
  popupSurface,
  popupTransition,
} from "../lib/styles.js";
import { SpinnerIcon, XIcon } from "./icons.js";

/**
 * A text input with suggestions. Unlike Combobox, the value is whatever was typed;
 * picking a suggestion just fills the input. Good for search boxes and tags.
 */
export const Autocomplete = AutocompletePrimitive.Root;

export interface AutocompleteInputProps extends AutocompletePrimitive.Input.Props {
  /** Show a × button once something is typed. @default true */
  clearable?: boolean;
  /** Results are being fetched: shows a spinner in place of the ×. Announce it with `<AutocompleteStatus>`. */
  loading?: boolean;
}

export function AutocompleteInput({ className, clearable = true, loading = false, ...props }: AutocompleteInputProps) {
  return (
    <AutocompletePrimitive.InputGroup data-slot="autocomplete-input-group" className="relative flex w-full min-w-0 items-center">
      <AutocompletePrimitive.Input
        data-slot="autocomplete-input"
        className={cnState(
          cn(
            fieldControl,
            focusRing,
            invalid,
            "py-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            (clearable || loading) && "pr-8",
          ),
          className,
        )}
        aria-busy={loading || undefined}
        {...props}
      />
      {loading ? (
        <span data-slot="autocomplete-spinner" className={cn(clearButton, "pointer-events-none")}>
          <SpinnerIcon />
        </span>
      ) : clearable && (
        <AutocompletePrimitive.Clear
          data-slot="autocomplete-clear"
          aria-label="Clear"
          className={cn(clearButton, "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0")}
        >
          <XIcon />
        </AutocompletePrimitive.Clear>
      )}
    </AutocompletePrimitive.InputGroup>
  );
}

type PositionerProps = Pick<AutocompletePrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

/** The popup. Put `<AutocompleteEmpty>` and `<AutocompleteList>` inside. */
export function AutocompleteContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: AutocompletePrimitive.Popup.Props & PositionerProps) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-content"
          className={cnState(
            cn(popupSurface, popupTransition, "w-(--anchor-width) max-w-(--available-width) overflow-hidden"),
            className,
          )}
          {...props}
        />
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

/** Base UI doesn't name the listbox; pass `aria-label` (e.g. "Tags") so screen readers announce it. */
export function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={cnState(
        "max-h-[min(22rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-[empty]:p-0",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props) {
  return <AutocompletePrimitive.Item data-slot="autocomplete-item" className={cnState(popupItem, className)} {...props} />;
}

export function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cnState("py-6 text-center text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  );
}

/**
 * Announces the list's state to screen readers ("Searching…", "3 results"). Keep it mounted and
 * change its children; it collapses when empty. Use it with `loading` for results fetched as the user types.
 */
export function AutocompleteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status data-slot="autocomplete-status" className={cnState(listStatus, className)} {...props} />
  );
}

export function AutocompleteGroup(props: AutocompletePrimitive.Group.Props) {
  return <AutocompletePrimitive.Group data-slot="autocomplete-group" {...props} />;
}

export function AutocompleteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cnState(menuLabel, className)}
      {...props}
    />
  );
}

export function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={cnState(menuSeparator, className)}
      {...props}
    />
  );
}
