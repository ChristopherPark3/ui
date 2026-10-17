import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn, cnState } from "../lib/cn.js";
import { menuIndicator, menuIndicatorItem, menuLabel, menuPopup, menuSeparator, popupItem } from "../lib/styles.js";
import { CheckIcon, ChevronRightIcon, DotIcon } from "./icons.js";

/** A dropdown menu of actions. Arrow keys, typeahead and submenus are handled by Base UI. */
export const Menu = MenuPrimitive.Root;

/** Unstyled: compose with a Button via `render={<Button variant="outline" />}`. */
export function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

type PositionerProps = Pick<MenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

export function MenuContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: MenuPrimitive.Popup.Props & PositionerProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <MenuPrimitive.Popup data-slot="menu-content" className={cnState(menuPopup, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export interface MenuItemProps extends MenuPrimitive.Item.Props {
  /** `destructive` tints the item red, for delete-type actions. */
  variant?: "default" | "destructive";
  /** Indent to line up with items that have a check or icon. */
  inset?: boolean;
}

export function MenuItem({ className, variant = "default", inset, ...props }: MenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cnState(
        cn(
          popupItem,
          "data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:text-destructive dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:[&_svg]:text-destructive",
        ),
        className,
      )}
      {...props}
    />
  );
}

/** A menu item that's a link. Pass `render={<NextLink href="…" />}` for client-side routing. */
export function MenuLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props) {
  return <MenuPrimitive.LinkItem data-slot="menu-link-item" className={cnState(popupItem, className)} {...props} />;
}

export function MenuCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cnState(menuIndicatorItem, className)}
      {...props}
    >
      <span className={menuIndicator}>
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

export function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

export function MenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-slot="menu-radio-item" className={cnState(menuIndicatorItem, className)} {...props}>
      <span className={menuIndicator}>
        <MenuPrimitive.RadioItemIndicator>
          <DotIcon className="size-2" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

export function MenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
}

export function MenuGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return <MenuPrimitive.GroupLabel data-slot="menu-group-label" className={cnState(menuLabel, className)} {...props} />;
}

export function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator data-slot="menu-separator" className={cnState(menuSeparator, className)} {...props} />;
}

/** Right-aligned hint like `⌘K`. Display only: wire the shortcut up yourself. */
export function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Nest inside a Menu: `<MenuSub><MenuSubTrigger /><MenuSubContent /></MenuSub>`. */
export const MenuSub = MenuPrimitive.SubmenuRoot;

export function MenuSubTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      className={cnState(cn(popupItem, "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground"), className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export function MenuSubContent({
  side = "inline-end",
  sideOffset = 0,
  align = "start",
  alignOffset = -5,
  ...props
}: React.ComponentProps<typeof MenuContent>) {
  return <MenuContent side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...props} />;
}
