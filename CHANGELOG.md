# @ceepeetres/ui

## 0.5.0

### Minor Changes

- 1a6d359: Add Table and Breadcrumb (`BreadcrumbLink` takes `render` for Next.js `<Link>`, and stays server-importable). Storybook now has a Docs page per component and an Introduction page.

## 0.4.2

### Patch Changes

- 5cb3a4a: `rounded-2xl` (cards, dialogs) now follows `--radius` like every other corner, with no change at the default. Document theming in the README and add a Foundations/Theming story.

## 0.4.1

### Patch Changes

- 8527ee8: Fix text contrast on destructive Button and Badge in dark mode.

## 0.4.0

### Minor Changes

- 3ed91ba: Add Textarea (auto-growing, clearable, Field-aware), Card, Badge, Alert and Kbd.

## 0.3.0

### Minor Changes

- 8734395: Add Spinner, Skeleton and Empty. Combobox and Autocomplete get a `loading` prop (spinner in the input, `aria-busy`) and a `Status` part for announcing async results.

## 0.2.0

### Minor Changes

- 336e020: Add `Button` and `buttonVariants`, built on Base UI's Button. Variants: default, destructive, outline, secondary, ghost, link; sizes: default, sm, lg, icon, icon-sm, icon-lg. Supports `loading` (spinner that replaces a leading icon, `aria-busy`, stays focusable), `aria-invalid` error styling, `focusableWhenDisabled`, and a smooth width animation (Motion) when the content changes (`animateWidth`, on by default). Style links with `buttonVariants()` instead of rendering them through Button.
- be09920: Add styled wrappers for every Base UI component: Accordion, AlertDialog, Autocomplete, Avatar, Checkbox/CheckboxGroup, Collapsible, Combobox (with chips), ContextMenu, Dialog, Drawer, Field, Fieldset, Form, Input, Label, Menu, Menubar, Meter, NavigationMenu, NumberField, OTPField, Popover, PreviewCard, Progress, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar and Tooltip.
  
  All share Button's conventions: semantic tokens, `rounded-xl` controls, the same focus ring, `data-[disabled]` and `aria-invalid`/Field `data-invalid` error styling, and interruptible CSS enter/exit transitions that respect reduced motion. Text inputs (Input, Autocomplete, Combobox) show a clear × button once they have a value; opt out with `clearable={false}` / `showClear={false}`. `--muted-foreground` is slightly darker in light mode so muted text on `--muted` meets WCAG AA contrast.
- 336e020: Add `motion` (^14) as a peer dependency for animated components. Apps need `pnpm add motion`.
- 336e020: Rebuild on Base UI instead of Radix. Removes Button, Input, Label, Badge, Card and Dialog (and `buttonVariants`/`badgeVariants`); components will be re-added one at a time on `@base-ui/react`.
