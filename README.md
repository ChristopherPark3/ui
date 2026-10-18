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

To re-theme for a specific app, override the CSS variables in that app's `:root` / `.dark`.
