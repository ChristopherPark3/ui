/*
 * Shared class strings so every component handles focus, errors, disabled
 * state and popups the same way. Plain strings, so Tailwind picks them up from dist/.
 */

export const focusRing = "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** Error state. Base UI sets `data-invalid` inside a Field; apps can also set `aria-invalid`. */
export const invalid =
  "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40";

export const disabled = "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Text-field look shared by Input, NumberField, OTPField, Select and Combobox triggers. */
export const fieldControl =
  "h-9 w-full min-w-0 rounded-xl border border-input bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow,border-color] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring md:text-sm dark:bg-input/30";

/** Floating surface for Popover, Menu, Select, Tooltip, etc. */
export const popupSurface = "rounded-xl border bg-popover text-popover-foreground shadow-md outline-none";

/** Scale + fade from the anchor. Uses Base UI's starting/ending style attributes. */
export const popupTransition =
  "origin-(--transform-origin) transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none";

/** Rows inside menus, selects and comboboxes. Base UI moves `data-highlighted` with the keyboard. */
export const popupItem =
  "relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

/** Dim overlay behind dialogs and drawers. */
export const backdrop =
  "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none";

/** Popup for Menu, ContextMenu and Menubar menus. */
export const menuPopup =
  "max-h-(--available-height) min-w-36 overflow-y-auto p-1 " + popupSurface + " " + popupTransition;

export const menuLabel = "px-2 py-1.5 text-xs font-medium text-muted-foreground";

export const menuSeparator = "-mx-1 my-1 h-px bg-border";

/** Leaves room on the left for a check or dot indicator. */
export const menuIndicatorItem = popupItem + " pl-8";

export const menuIndicator = "pointer-events-none absolute left-2 flex size-4 items-center justify-center";

/** Modal dialog surface, centered. */
export const dialogPopup =
  "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-background p-6 shadow-lg outline-none transition-[opacity,scale] duration-200 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 sm:max-w-lg motion-reduce:transition-none";

/** The × that clears a text input. Positioned inside the field's right edge; fades in once there's a value. */
export const clearButton =
  "absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-[opacity,color,background-color] duration-150 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[hidden]:pointer-events-none data-[hidden]:opacity-0 motion-reduce:transition-none [&_svg]:size-3.5";

/** Status row at the top of an async Combobox/Autocomplete popup. Collapses when empty but stays mounted for screen readers. */
export const listStatus =
  "flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground empty:p-0 [&_svg]:size-4 [&_svg]:shrink-0";
