import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn, cnState } from "../lib/cn.js";
import { fieldControl, focusRing, invalid, menuLabel, menuSeparator, popupItem, popupSurface, popupTransition } from "../lib/styles.js";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from "./icons.js";

/**
 * Pass `items` (`[{ label, value }]` or a `{ value: label }` record) so the trigger
 * can show the selected label before the popup has opened.
 */
export const Select = SelectPrimitive.Root;

export function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cnState(
        cn(
          fieldControl,
          focusRing,
          invalid,
          "flex w-fit min-w-40 items-center justify-between gap-2 py-2 pr-2 whitespace-nowrap select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ),
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon" className="flex text-muted-foreground">
        <ChevronsUpDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cnState("line-clamp-1 flex items-center gap-2 data-[placeholder]:text-muted-foreground", className)}
      {...props}
    />
  );
}

type PositionerProps = Pick<
  SelectPrimitive.Positioner.Props,
  "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger"
>;

/**
 * The dropdown list. Opens below the trigger by default; set `alignItemWithTrigger`
 * for the macOS style where the selected item sits over the trigger.
 */
export function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props & PositionerProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-50 outline-none select-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cnState(
            cn(
              popupSurface,
              popupTransition,
              "relative min-w-(--anchor-width) overflow-hidden data-[side=none]:min-w-[calc(var(--anchor-width)+1.5rem)] data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            ),
            className,
          )}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow className="top-0 z-10 flex h-5 w-full cursor-default items-center justify-center bg-popover">
            <ChevronUpIcon className="size-4" />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="max-h-(--available-height) scroll-py-6 overflow-y-auto p-1">{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow className="bottom-0 z-10 flex h-5 w-full cursor-default items-center justify-center bg-popover">
            <ChevronDownIcon className="size-4" />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cnState(cn(popupItem, "pr-8"), className)} {...props}>
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return <SelectPrimitive.GroupLabel data-slot="select-group-label" className={cnState(menuLabel, className)} {...props} />;
}

export function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cnState(menuSeparator, className)} {...props} />;
}

/** A visible label for the select. Inside a `<Field>`, use `<FieldLabel>` instead. */
export function SelectLabel({ className, ...props }: SelectPrimitive.Label.Props) {
  return <SelectPrimitive.Label data-slot="select-label" className={cnState("text-sm font-medium", className)} {...props} />;
}
