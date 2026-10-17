import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn, cnState } from "../lib/cn.js";
import { focusRing, popupSurface } from "../lib/styles.js";
import { ChevronDownIcon } from "./icons.js";

/**
 * Site navigation with dropdown panels. The floating panel is built in: it resizes
 * and slides between items as you move across triggers.
 * Renders a `<nav>`: give it an `aria-label` (e.g. "Main") if the page has more than one.
 */
export function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cnState("relative w-fit", className)} {...props}>
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[instant]:transition-none motion-reduce:transition-none"
          sideOffset={8}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
        >
          <NavigationMenuPrimitive.Popup
            data-slot="navigation-menu-popup"
            className={cn(
              popupSurface,
              "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden transition-[opacity,width,height,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 motion-reduce:transition-none",
            )}
          >
            <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cnState("flex list-none items-center gap-1", className)}
      {...props}
    />
  );
}

export function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cnState("relative", className)} {...props} />;
}

export const navigationMenuTriggerStyle = cn(
  "inline-flex h-9 w-max items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-[color,background-color,box-shadow] hover:bg-accent hover:text-accent-foreground data-[popup-open]:bg-accent/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  focusRing,
);

export function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cnState(navigationMenuTriggerStyle, className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180 motion-reduce:transition-none">
        <ChevronDownIcon className="size-3.5" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

/** The panel for one item. Slides in from the side you moved from. */
export function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cnState(
        "h-full w-[calc(100vw-40px)] p-2 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:-translate-x-1/2 data-[starting-style]:data-[activation-direction=right]:translate-x-1/2 data-[ending-style]:data-[activation-direction=left]:translate-x-1/2 data-[ending-style]:data-[activation-direction=right]:-translate-x-1/2 sm:w-max sm:max-w-[500px] motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

/** Pass `render={<NextLink href="…" />}` for client-side routing. Mark the current page with `active`. */
export function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cnState(
        cn(
          "flex flex-col gap-1 rounded-lg p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent/50",
          focusRing,
        ),
        className,
      )}
      {...props}
    />
  );
}
