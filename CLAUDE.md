# @ceepeetres/ui

Personal React component library. Published to npm, consumed by apps made from `ChristopherPark3/app-template` (Next.js 16 App Router, React Server Components).

## Commands

- `nvm use` first: Node 22 required (system Node is too old).
- `pnpm storybook`: dev server at http://localhost:6006
- `pnpm test`: runs every story as a Vitest browser test (play functions and a11y checks)
- `pnpm typecheck` / `pnpm build`
- `pnpm changeset`: required for any user-facing change (new component = minor, fix = patch)

## Stack

Tailwind v4 (no tailwind.config; tokens live in `src/styles.css`), [Base UI](https://base-ui.com) via `@base-ui/react` (import per component: `import { Dialog } from "@base-ui/react/dialog"`), `class-variance-authority` for variants, `cn()` from `src/lib/cn.ts`. Built with plain `tsc` to ESM. The library ships class names, not compiled CSS: the consuming app's Tailwind scans `dist/` via `@source` in `styles.css`.

## Component conventions

- One component family per file: `src/components/<kebab-name>.tsx`, with its story next to it as `<kebab-name>.stories.tsx`, and exports added to `src/index.ts`.
- Relative imports **must** end in `.js` (`import { cn } from "../lib/cn.js"`), because of NodeNext module resolution.
- Plain function components taking `React.ComponentProps<"el">` (React 19: `ref` is a normal prop, no `forwardRef`). Spread `...props` last and merge `className` with `cn(base, className)`.
- Add `data-slot="<name>"` on each part's root element.
- Variants go through `cva`. Export the `xxxVariants` function only if apps need it. If the component file has `"use client"`, put the cva definition in a separate `<name>-variants.ts` so server components can call it.
- `"use client"` only when needed: hooks, event handlers, or interactive Base UI parts (Dialog, Popover, Tabs, …). Purely presentational components (Card, Badge, Input) must stay server-compatible.
- Styling uses semantic tokens only (`bg-primary`, `text-muted-foreground`, `border-input`, `ring-ring`, `bg-destructive`, …), never raw colors like `bg-blue-500`. Every component must look right in both light and `.dark`.
- New design tokens go in `src/styles.css` in all three places: `:root`, `.dark`, and `@theme inline`.
- Focus style: `outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50`. Disabled style: `disabled:pointer-events-none disabled:opacity-50` on plain elements; on Base UI parts use `data-[disabled]:` instead (it also covers `focusableWhenDisabled`, which uses `aria-disabled`).
- Use Base UI for anything with focus management, keyboard navigation, or ARIA patterns. Don't hand-roll them.
- Base UI has no `asChild`. To render a part as another element, pass `render` (`<DialogTrigger render={<Button />} />`). Links styled as buttons use `buttonVariants()` on the `<a>`/`<Link>` directly, not `<Button render>` (Base UI would give it `role="button"`). For our own non-Base UI components that need to be polymorphic, use `useRender` from `@base-ui/react/use-render`.
- Style Base UI state with its data attributes, not Radix-style `data-[state=open]`: `data-[open]:`, `data-[disabled]:`, `data-[checked]:`, `data-[highlighted]:`, etc. Enter/exit animations use `data-[starting-style]:` and `data-[ending-style]:` with a CSS `transition`.
- No new runtime dependencies without asking. Icons are inline SVG for now.
- Animation: [Motion](https://motion.dev) (`import { motion } from "motion/react"`), a **peer** dependency so apps share one copy with their own Motion code. Any file using it needs `"use client"`. Combine with Base UI via `render={<motion.div />}`. Respect reduced motion (`useReducedMotion` or `MotionConfig reducedMotion="user"`). Prefer plain CSS transitions for simple hover/press effects; reach for Motion for enter/exit, layout and gesture animations.

## Stories

- `title: "Components/<Name>"`, `meta` typed with `satisfies Meta<typeof X>`, plus `argTypes` select controls for variants.
- Include a Default story and one story per meaningful state (variants, disabled, invalid, …).
- Interactive components get a `play` function that asserts behavior (`storybook/test`: `expect`, `fn`, `userEvent`). Portaled content (dialogs, popovers) is found via `within(document.body)`.
- Run `pnpm test` before calling a component done. It must pass with no new a11y violations.

## Definition of done

Component, story, export from `src/index.ts`, `pnpm typecheck && pnpm test` passing, and a changeset.
