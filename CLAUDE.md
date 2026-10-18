# @ceepeetres/ui

Personal React component library. Published to npm, consumed by apps made from `ChristopherPark3/app-template` (Next.js 16 App Router, React Server Components).

## Commands

- Node 22 required (`.nvmrc`; system Node is too old): `nvm use`, or put Node 22's `bin` on `PATH` if nvm won't switch.
- `pnpm storybook`: dev server at http://localhost:6006
- `pnpm test`: runs every story as a Vitest browser test (play functions and a11y checks)
- `pnpm typecheck` / `pnpm build`
- `pnpm check:client`: fails if a component's `"use client"` doesn't match what it does (runs in CI)
- `pnpm changeset`: required for any user-facing change (new component = minor, fix = patch)

## Releasing

Never run `npm publish` or bump `version` by hand; Changesets does both.

1. Work on a branch and include a `.changeset/*.md` for each user-facing change (`pnpm changeset`, or write the file: frontmatter `"@ceepeetres/ui": minor|patch`, then a one-line summary that becomes the CHANGELOG entry). Docs, story or test-only changes don't need one.
2. Open a PR to `main`. CI (`.github/workflows/ci.yml`) runs typecheck, `check:client`, build, tests and the Storybook build.
3. Merging it triggers `.github/workflows/release.yml`, which opens (or updates) a **Version Packages** PR from `changeset-release/main` that bumps `package.json` and writes `CHANGELOG.md`.
4. Merging the Version Packages PR publishes to npm (`NPM_TOKEN` secret) and tags the release. Separately, every push to `main` redeploys Storybook to GitHub Pages (`storybook.yml`).

Merging PRs and publishing are the owner's call: ask before merging either PR. While still 0.x, breaking changes are `minor`; call them out in the changeset and PR.

## Stack

Tailwind v4 (no tailwind.config; tokens live in `src/styles.css`), [Base UI](https://base-ui.com) via `@base-ui/react` (import per component: `import { Dialog } from "@base-ui/react/dialog"`), `class-variance-authority` for variants, `cn()` from `src/lib/cn.ts`. Built with plain `tsc` to ESM. The library ships class names, not compiled CSS: the consuming app's Tailwind scans `dist/` via `@source` in `styles.css`.

## Component conventions

- One component family per file: `src/components/<kebab-name>.tsx`, with its story next to it as `<kebab-name>.stories.tsx`, and exports added to `src/index.ts`.
- Relative imports **must** end in `.js` (`import { cn } from "../lib/cn.js"`), because of NodeNext module resolution.
- Plain function components taking `React.ComponentProps<"el">` (React 19: `ref` is a normal prop, no `forwardRef`). Spread `...props` last and merge `className` with `cn(base, className)`.
- Wrapping a Base UI part: type props as the part's own props (`DialogPrimitive.Popup.Props`) and merge with `cnState(base, className)` from `src/lib/cn.ts`, which keeps Base UI's `className={(state) => …}` form working. Compound popups (`XContent`) build in Portal + Positioner + Popup and expose `side`, `sideOffset`, `align`, `alignOffset`.
- Reuse the shared class strings in `src/lib/styles.ts` (`focusRing`, `invalid`, `fieldControl`, `popupSurface`, `popupTransition`, `popupItem`, `menuPopup`, `dialogPopup`, `backdrop`, …) instead of re-typing them, so every component handles focus, errors, disabled and popups the same way. Shared icons live in `src/components/icons.tsx`.
- Radius scale: controls, popups and triggers `rounded-xl`; items inside a popup `rounded-lg`; dialogs `rounded-2xl`; checkbox `rounded-[5px]`.
- States every control supports where it makes sense: disabled (`data-[disabled]`), error (`aria-invalid` and Base UI's `data-[invalid]` from `<Field>`; red border plus a destructive focus ring), focus (`focusRing`), and loading (spinner + `aria-busy`, stays focusable) for actions. Text inputs show a clear × (`clearButton` style) once they have a value; use Base UI's own `Clear` part where one exists (Autocomplete, Combobox), otherwise `useClearable` from `src/lib/use-clearable.ts` (Input, Textarea).
- Async data: components take plain state props (`loading`, `items`, `aria-invalid`) and stay independent of any data library (React Query, SWR, server actions). Loading UI is `Spinner` (inline), `Skeleton` (placeholder layout, with `aria-busy` on the region) and `Empty` (no data / no results). Async Combobox/Autocomplete: `items` from the server, `filter={null}`, `loading` on the input, and a `Status` part that stays mounted.
- Add `data-slot="<name>"` on each part's root element.
- Variants go through `cva`. Export the `xxxVariants` function only if apps need it. If the component file has `"use client"`, put the cva definition in a separate `<name>-variants.ts` so server components can call it.
- `"use client"` only when the wrapper file itself needs it: hooks, context, or passing functions (render functions, event handlers) to Base UI. Base UI's parts are already client components, so a wrapper that only passes strings and JSX (Dialog, Tabs, Input, …) stays server-importable without it. Today only `button.tsx`, `input.tsx`, `textarea.tsx`, `toggle-group.tsx` and `toast.tsx` need it.
- Styling uses semantic tokens only (`bg-primary`, `text-muted-foreground`, `border-input`, `ring-ring`, `bg-destructive`, …), never raw colors like `bg-blue-500`. Every component must look right in both light and `.dark`; tests check contrast in both. Solid destructive fills use `dark:bg-destructive/60` because the dark `--destructive` is bright enough for text but too bright under white text.
- New design tokens go in `src/styles.css` in all three places: `:root`, `.dark`, and `@theme inline`. The default theme stays neutral; apps add their brand by overriding tokens (README → Theming), so never hard-code a brand color in a component. Radii come from `--radius` only (`--radius-sm` … `--radius-2xl` are derived), so use the radius scale rather than arbitrary values (tiny fixed shapes like the checkbox's `rounded-[5px]` and the tooltip arrow are the exception).
- Focus style: `outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50`. Disabled style: `disabled:pointer-events-none disabled:opacity-50` on plain elements; on Base UI parts use `data-[disabled]:` instead (it also covers `focusableWhenDisabled`, which uses `aria-disabled`).
- Use Base UI for anything with focus management, keyboard navigation, or ARIA patterns. Don't hand-roll them.
- Base UI has no `asChild`. To render a part as another element, pass `render` (`<DialogTrigger render={<Button />} />`). Links styled as buttons use `buttonVariants()` on the `<a>`/`<Link>` directly, not `<Button render>` (Base UI would give it `role="button"`). For our own non-Base UI components that need to be polymorphic, use `useRender` from `@base-ui/react/use-render` in a client file; if the component should stay server-importable (like `BreadcrumbLink`), take a `render` element and merge props with `React.cloneElement` instead, since that isn't a hook.
- Style Base UI state with its data attributes, not Radix-style `data-[state=open]`: `data-[open]:`, `data-[disabled]:`, `data-[checked]:`, `data-[highlighted]:`, etc. Enter/exit animations use `data-[starting-style]:` and `data-[ending-style]:` with a CSS `transition`.
- No new runtime dependencies without asking. Icons are inline SVG for now.
- Animation: enter/exit (popups, dialogs, drawers, accordion/collapsible height, indicators) uses CSS transitions on Base UI's `data-[starting-style]` / `data-[ending-style]` and CSS variables (`--transform-origin`, `--accordion-panel-height`, `--active-tab-left`, …). They're interruptible and work with uncontrolled components. Use [Motion](https://motion.dev) (`motion/react`, a **peer** dependency) only for what CSS can't do, like Button's measured width animation; any file using it needs `"use client"`. Always respect reduced motion (`motion-reduce:transition-none`, `useReducedMotion`).

## Stories

- `title: "Components/<Name>"`, `meta` typed with `satisfies Meta<typeof X>`, plus `argTypes` select controls for variants.
- Include a Default story and one story per meaningful state (variants, disabled, invalid, …).
- Interactive components get a `play` function that asserts behavior (`storybook/test`: `expect`, `fn`, `userEvent`). Portaled content (dialogs, popovers) is found via `within(document.body)`.
- Run `pnpm test` before calling a component done. Every story runs twice, in light and dark (`storybook` and `storybook (dark)` projects), and a11y runs in `error` mode, so any violation (contrast included) fails the run and CI. For details on a failure, use the a11y panel or the JSON reporter (`pnpm vitest run --reporter=json --outputFile=…`, `meta.reports`).
- Elements that fade in are briefly `opacity: 0`; wrap visibility checks in `waitFor`. Exiting popups/panels stay in the DOM until their transition ends, so query by name (`getByRole("tabpanel", { name })`).
- Base UI tooltips have no `tooltip` role; menus move `data-highlighted` rather than DOM focus.

## Definition of done

Component, story, export from `src/index.ts`, `pnpm typecheck && pnpm check:client && pnpm test` passing, and a changeset.
