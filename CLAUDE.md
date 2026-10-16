# @ceepeetres/ui

Personal React component library. Published to npm, consumed by apps made from `ChristopherPark3/app-template` (Next.js 16 App Router, React Server Components).

## Commands

- `nvm use` first: Node 22 required (system Node is too old).
- `pnpm storybook`: dev server at http://localhost:6006
- `pnpm test`: runs every story as a Vitest browser test (play functions and a11y checks)
- `pnpm typecheck` / `pnpm build`
- `pnpm changeset`: required for any user-facing change (new component = minor, fix = patch)

## Stack

Tailwind v4 (no tailwind.config; tokens live in `src/styles.css`), Radix via the `radix-ui` package, `class-variance-authority` for variants, `cn()` from `src/lib/cn.ts`. Built with plain `tsc` to ESM. The library ships class names, not compiled CSS: the consuming app's Tailwind scans `dist/` via `@source` in `styles.css`.

## Component conventions

- One component family per file: `src/components/<kebab-name>.tsx`, with its story next to it as `<kebab-name>.stories.tsx`, and exports added to `src/index.ts`.
- Relative imports **must** end in `.js` (`import { cn } from "../lib/cn.js"`), because of NodeNext module resolution.
- Plain function components taking `React.ComponentProps<"el">` (React 19: `ref` is a normal prop, no `forwardRef`). Spread `...props` last and merge `className` with `cn(base, className)`.
- Add `data-slot="<name>"` on each part's root element.
- Variants go through `cva`. Export the `xxxVariants` function only if apps need it. If the component file has `"use client"`, put the cva definition in a separate `<name>-variants.ts` (see `button-variants.ts`) so server components can call it.
- `"use client"` only when needed: hooks, event handlers, or interactive Radix primitives (Dialog, Popover, Tabs, …). Purely presentational components (Card, Badge, Input) must stay server-compatible.
- Styling uses semantic tokens only (`bg-primary`, `text-muted-foreground`, `border-input`, `ring-ring`, `bg-destructive`, …), never raw colors like `bg-blue-500`. Every component must look right in both light and `.dark`.
- New design tokens go in `src/styles.css` in all three places: `:root`, `.dark`, and `@theme inline`.
- Focus style: `outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50`. Disabled style: `disabled:pointer-events-none disabled:opacity-50`.
- Use Radix for anything with focus management, keyboard navigation, or ARIA patterns. Don't hand-roll them.
- No new runtime dependencies without asking. Icons are inline SVG for now.

## Stories

- `title: "Components/<Name>"`, `meta` typed with `satisfies Meta<typeof X>`, plus `argTypes` select controls for variants.
- Include a Default story and one story per meaningful state (variants, disabled, invalid, …).
- Interactive components get a `play` function that asserts behavior (`storybook/test`: `expect`, `fn`, `userEvent`). Portaled content (dialogs, popovers) is found via `within(document.body)`.
- Run `pnpm test` before calling a component done. It must pass with no new a11y violations.

## Definition of done

Component, story, export from `src/index.ts`, `pnpm typecheck && pnpm test` passing, and a changeset.
