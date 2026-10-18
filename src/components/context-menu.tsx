import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn, cnState } from "../lib/cn.js";
import { menuIndicator, menuIndicatorItem, menuLabel, menuPopup, menuSeparator, popupItem } from "../lib/styles.js";
import { CheckIcon, ChevronRightIcon, DotIcon } from "./icons.js";

/** A menu that opens on right-click (or long-press) inside `<ContextMenuTrigger>`. Styled like Menu. */
export const ContextMenu = ContextMenuPrimitive.Root;

export function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" className={cnState("select-none", className)} {...props} />;
}

export function ContextMenuContent({ className, ...props }: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner className="z-50 outline-none">
        <ContextMenuPrimitive.Popup data-slot="context-menu-content" className={cnState(menuPopup, className)} {...props} />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
  variant?: "default" | "destructive";
  inset?: boolean;
}

export function ContextMenuItem({ className, variant = "default", inset, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cnState(
        cn(
          popupItem,
          "data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:text-destructive dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItem({ className, children, ...props }: ContextMenuPrimitive.CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cnState(menuIndicatorItem, className)}
      {...props}
    >
      <span className={menuIndicator}>
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

export function ContextMenuRadioItem({ className, children, ...props }: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cnState(menuIndicatorItem, className)}
      {...props}
    >
      <span className={menuIndicator}>
        <ContextMenuPrimitive.RadioItemIndicator>
          <DotIcon className="size-2" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

export function ContextMenuGroup(props: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

export function ContextMenuGroupLabel({ className, ...props }: ContextMenuPrimitive.GroupLabel.Props) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-group-label"
      className={cnState(menuLabel, className)}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cnState(menuSeparator, className)}
      {...props}
    />
  );
}

export const ContextMenuSub = ContextMenuPrimitive.SubmenuRoot;

export function ContextMenuSubTrigger({ className, children, ...props }: ContextMenuPrimitive.SubmenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      className={cnState(cn(popupItem, "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground"), className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

/** Same as ContextMenuContent; positioned beside its submenu trigger. */
export const ContextMenuSubContent = ContextMenuContent;
