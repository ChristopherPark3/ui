# @ceepeetres/ui

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
