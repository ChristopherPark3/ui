---
"@ceepeetres/ui": minor
---

Add styled wrappers for every Base UI component: Accordion, AlertDialog, Autocomplete, Avatar, Checkbox/CheckboxGroup, Collapsible, Combobox (with chips), ContextMenu, Dialog, Drawer, Field, Fieldset, Form, Input, Label, Menu, Menubar, Meter, NavigationMenu, NumberField, OTPField, Popover, PreviewCard, Progress, RadioGroup, ScrollArea, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar and Tooltip.

All share Button's conventions: semantic tokens, `rounded-xl` controls, the same focus ring, `data-[disabled]` and `aria-invalid`/Field `data-invalid` error styling, and interruptible CSS enter/exit transitions that respect reduced motion. Text inputs (Input, Autocomplete, Combobox) show a clear × button once they have a value; opt out with `clearable={false}` / `showClear={false}`. `--muted-foreground` is slightly darker in light mode so muted text on `--muted` meets WCAG AA contrast.
