import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn, cnState } from "../lib/cn.js";
import { menuLabel, menuSeparator, popupItem, popupSurface, popupTransition } from "../lib/styles.js";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "./icons.js";

/**
 * A text input that filters a list of `items` and selects one (or several with `multiple`).
 * Render options with a function child of `<ComboboxList>`: `{(item) => <ComboboxItem value={item}>…}`.
 */
export const Combobox = ComboboxPrimitive.Root;

const inputGroup = cn(
  "flex min-h-9 w-full min-w-0 items-center rounded-xl border border-input shadow-xs transition-[color,box-shadow,border-color] dark:bg-input/30",
  "has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
  "data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);

const inlineButton =
  "flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,opacity] outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[disabled]:pointer-events-none [&_svg]:size-4";

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  /** Show the ⌄ button that opens the list. */
  showTrigger?: boolean;
  /** Show a × button that clears the value. It only appears once there's something to clear. @default true */
  showClear?: boolean;
}

export function ComboboxInput({ className, showTrigger = true, showClear = true, ...props }: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.InputGroup data-slot="combobox-input-group" className={inputGroup}>
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        className={cnState(
          "h-9 min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground md:text-sm",
          className,
        )}
        {...props}
      />
      <div className="flex items-center gap-0.5 pr-1">
        {showClear && (
          <ComboboxPrimitive.Clear
            data-slot="combobox-clear"
            aria-label="Clear"
            className={cn(
              inlineButton,
              "duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none",
            )}
          >
            <XIcon />
          </ComboboxPrimitive.Clear>
        )}
        {showTrigger && (
          <ComboboxPrimitive.Trigger data-slot="combobox-trigger" aria-label="Show options" className={inlineButton}>
            <ChevronsUpDownIcon />
          </ComboboxPrimitive.Trigger>
        )}
      </div>
    </ComboboxPrimitive.InputGroup>
  );
}

/** For `multiple`: a field that holds the selected chips and the input. */
export function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cnState(cn(inputGroup, "flex-wrap gap-1 p-1"), className)}
      {...props}
    />
  );
}

export function ComboboxChip({ className, children, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cnState(
        "flex h-7 items-center gap-1 rounded-lg bg-secondary pr-0.5 pl-2 text-sm text-secondary-foreground outline-none data-[highlighted]:ring-[3px] data-[highlighted]:ring-ring/50",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ChipRemove
        data-slot="combobox-chip-remove"
        aria-label="Remove"
        className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-background/60 hover:text-foreground [&_svg]:size-3.5"
      >
        <XIcon />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  );
}

/** The input inside `<ComboboxChips>`. */
export function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chips-input"
      className={cnState(
        "h-7 min-w-16 flex-1 bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export const ComboboxValue = ComboboxPrimitive.Value;

type PositionerProps = Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

/** The popup. Put `<ComboboxEmpty>` and `<ComboboxList>` inside. */
export function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: ComboboxPrimitive.Popup.Props & PositionerProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cnState(
            cn(popupSurface, popupTransition, "w-(--anchor-width) max-w-(--available-width) overflow-hidden"),
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cnState(
        "max-h-[min(22rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-[empty]:p-0",
        className,
      )}
      {...props}
    />
  );
}

export function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item data-slot="combobox-item" className={cnState(cn(popupItem, "pr-8"), className)} {...props}>
      {children}
      <ComboboxPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
        <CheckIcon />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

/** Shown when nothing matches the input. */
export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cnState("py-6 text-center text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  );
}

export function ComboboxGroup(props: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

export function ComboboxGroupLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel data-slot="combobox-group-label" className={cnState(menuLabel, className)} {...props} />
  );
}

export function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator data-slot="combobox-separator" className={cnState(menuSeparator, className)} {...props} />
  );
}

/** A visible label for the combobox. Inside a `<Field>`, use `<FieldLabel>` instead. */
export function ComboboxLabel({ className, ...props }: ComboboxPrimitive.Label.Props) {
  return <ComboboxPrimitive.Label data-slot="combobox-label" className={cnState("text-sm font-medium", className)} {...props} />;
}
