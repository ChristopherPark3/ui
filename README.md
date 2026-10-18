# @ceepeetres/ui

My React component library: Tailwind v4 + Base UI primitives, documented in Storybook.

## Develop

```bash
nvm use            # Node 22
pnpm install
pnpm storybook     # http://localhost:6006
pnpm test          # runs every story as a browser test (interactions + a11y)
```

Add a component:

1. `src/components/<name>.tsx`. Add `"use client"` at the top only if it uses hooks, event handlers, or an interactive Base UI part.
2. `src/components/<name>.stories.tsx`
3. Export it from `src/index.ts`

## Try changes in an app before publishing

```bash
pnpm dev                                   # rebuild dist/ on change
cd ../my-app && pnpm link ../ui            # point the app at your local copy
# ...when done: pnpm unlink @ceepeetres/ui && pnpm install
```

## Release

```bash
pnpm changeset     # describe the change and pick patch / minor / major
git commit -am "feat: ..." && git push
```

On `main`, the Release workflow opens a **Version Packages** PR. Merging that PR publishes to npm.

One-time setup:
- Add the `NPM_TOKEN` repo secret (an npm automation token).
- Turn on GitHub Pages (Settings → Pages → Source: GitHub Actions) to host Storybook.

## How styling works

The package ships plain Tailwind class names, not compiled CSS. `dist/styles.css` defines the design tokens and contains `@source "./"`, so the app's own Tailwind build scans the library's components. Apps need only two lines:

```css
@import "tailwindcss";
@import "@ceepeetres/ui/styles.css";
```

## Theming

The library is neutral (grayscale) by default. Each app brings its own brand by redefining tokens in its global CSS, **after** the import:

```css
@import "tailwindcss";
@import "@ceepeetres/ui/styles.css";

:root {
  --primary: oklch(0.51 0.23 277);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.67 0.18 277);
  --radius: 0.75rem;
}

.dark {
  --primary: oklch(0.78 0.12 277);
  --primary-foreground: oklch(0.2 0.06 277);
  --ring: oklch(0.55 0.18 277);
}
```

- **Brand color:** `--primary` + `--primary-foreground` (buttons, badges, checked states, sliders) and `--ring` (focus rings). That's usually all a brand needs.
- **Surfaces and text:** `--background`, `--foreground`, `--card`, `--popover`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, each with a `-foreground` where it holds text. See the full list in [`src/styles.css`](src/styles.css).
- **Corners:** `--radius` (default `0.625rem`) is `rounded-lg`; every other radius is derived from it, so one value rounds or squares off the whole library.
- **Contrast:** keep each surface and its `-foreground` at 4.5:1 or better, in both `:root` and `.dark`. The library's own tests enforce that for the default tokens, but not for an app's overrides.
- Storybook's **Foundations/Theming** shows the palette, the radius scale and this exact example applied.
