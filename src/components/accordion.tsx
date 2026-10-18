import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn, cnState } from "../lib/cn.js";
import { focusRing } from "../lib/styles.js";
import { ChevronDownIcon } from "./icons.js";

/** Set `multiple` to let several items be open at once. */
export function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cnState("flex w-full flex-col", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cnState("border-b last:border-b-0", className)} {...props} />
  );
}

/** The clickable heading. Renders inside an `<h3>` by default (pass `headerProps` to change it). */
export function AccordionTrigger({
  className,
  children,
  headerProps,
  ...props
}: AccordionPrimitive.Trigger.Props & { headerProps?: AccordionPrimitive.Header.Props }) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex" {...headerProps}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cnState(
          cn(
            "group flex flex-1 items-start justify-between gap-4 rounded-xl py-4 text-left text-sm font-medium transition-[color,box-shadow] hover:underline",
            focusRing,
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          ),
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180 motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** Animates its height open and closed. */
export function AccordionPanel({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & {
  /** Applied to the padded inner wrapper, so the height animation isn't affected by padding. */
  className?: string;
}) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
