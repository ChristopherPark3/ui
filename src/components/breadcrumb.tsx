import * as React from "react";
import { cn } from "../lib/cn.js";
import { ChevronRightIcon } from "./icons.js";

/** Where the current page sits in the site's hierarchy. */
export function Breadcrumb({ "aria-label": label = "Breadcrumb", ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label={label} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5", className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
  /**
   * Render a different link element, e.g. Next.js's: `<BreadcrumbLink render={<Link href="/docs" />}>Docs</BreadcrumbLink>`.
   * Its props are merged with these. Works in server components (no hooks).
   */
  render?: React.ReactElement<React.ComponentProps<"a">>;
}

export function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  const merged = {
    "data-slot": "breadcrumb-link",
    ...props,
    className: cn(
      "rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
      render?.props.className,
      className,
    ),
  };
  return render ? React.cloneElement(render, { ...render.props, ...merged }) : <a {...merged} />;
}

/** The current page: not a link, and announced as the current location. */
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

/** Defaults to a chevron; pass children (e.g. "/") to change it. */
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

/** Stands in for collapsed levels. Put it in a Menu trigger to reveal them. */
export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn("flex size-6 items-center justify-center", className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <circle cx="5" cy="12" r="1.75" />
        <circle cx="12" cy="12" r="1.75" />
        <circle cx="19" cy="12" r="1.75" />
      </svg>
      <span className="sr-only">More</span>
    </span>
  );
}
