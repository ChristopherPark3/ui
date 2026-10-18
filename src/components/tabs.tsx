import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn, cnState } from "../lib/cn.js";
import { focusRing } from "../lib/styles.js";

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cnState("flex flex-col gap-2 data-[orientation=vertical]:flex-row", className)}
      {...props}
    />
  );
}

export interface TabsListProps extends TabsPrimitive.List.Props {
  /** `default`: segmented control with a sliding pill. `underline`: a sliding bar under the active tab. */
  variant?: "default" | "underline";
}

/** The sliding indicator is built in: it animates to the active tab. */
export function TabsList({ className, variant = "default", children, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cnState(
        cn(
          "group/tabs-list relative isolate z-0 inline-flex w-fit items-center text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
          variant === "default" && "h-9 rounded-xl bg-muted p-[3px] data-[orientation=vertical]:h-auto",
          variant === "underline" && "gap-1 border-b data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
        ),
        className,
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className={cn(
          "absolute top-0 left-0 -z-10 transition-[translate,width,height] duration-200 ease-out motion-reduce:transition-none",
          variant === "default" &&
            "h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-lg bg-background shadow-sm dark:border dark:border-input dark:bg-input/30",
          variant === "underline" &&
            "top-auto bottom-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-px bg-foreground data-[orientation=vertical]:top-0 data-[orientation=vertical]:right-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-px data-[orientation=vertical]:translate-y-(--active-tab-top)",
        )}
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cnState(
        cn(
          "inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] hover:text-foreground data-[active]:text-foreground",
          "group-data-[variant=underline]/tabs-list:h-9 group-data-[variant=underline]/tabs-list:rounded-md group-data-[variant=underline]/tabs-list:px-2",
          "group-data-[orientation=vertical]/tabs-list:justify-start",
          focusRing,
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cnState(cn("flex-1 rounded-xl text-sm", focusRing), className)}
      {...props}
    />
  );
}
