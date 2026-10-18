import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn, cnState } from "../lib/cn.js";
import { focusRing } from "../lib/styles.js";

/**
 * A row of menus, like a desktop app's File / Edit / View.
 * Each menu is `<MenubarMenu><MenubarTrigger /><MenuContent>…</MenuContent></MenubarMenu>`, using the Menu parts.
 */
export function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cnState("flex h-9 w-fit items-center gap-1 rounded-xl border bg-background p-1 shadow-xs", className)}
      {...props}
    />
  );
}

export const MenubarMenu = MenuPrimitive.Root;

export function MenubarTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cnState(
        cn(
          "flex h-7 items-center rounded-lg px-2 text-sm font-medium select-none hover:bg-accent hover:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
          focusRing,
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        ),
        className,
      )}
      {...props}
    />
  );
}
