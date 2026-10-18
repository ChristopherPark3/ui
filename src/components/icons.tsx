import * as React from "react";

/* Inline icons shared by components. Sized by the parent ([&_svg]:size-4) unless a size class is passed. */

type IconProps = React.ComponentProps<"svg">;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
export const MinusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
);
export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const XIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);
export const ChevronDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
export const ChevronUpIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
);
export const ChevronRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);
export const ChevronsUpDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
  </Icon>
);
export const DotIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <circle cx="12" cy="12" r="5" />
  </svg>
);
export const SpinnerIcon = ({ className, ...props }: IconProps) => (
  <Icon className={["animate-spin", className].filter(Boolean).join(" ")} {...props}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Icon>
);
