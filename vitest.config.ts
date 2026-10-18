import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  path.dirname(fileURLToPath(import.meta.url));

// Pre-bundle every Base UI entry point. Otherwise Vite discovers them mid-run,
// reloads, and the affected stories fail with "Failed to fetch dynamically imported module".
const baseUiEntries = Object.keys(
  JSON.parse(readFileSync(path.join(dirname, 'node_modules/@base-ui/react/package.json'), 'utf8')).exports,
)
  .filter((key) => key !== './package.json' && !key.includes('*'))
  .map((key) => path.posix.join('@base-ui/react', key));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  optimizeDeps: {
    include: [...baseUiEntries, 'motion/react'],
  },
  test: {
    // Every story runs twice, once per theme, so dark-mode contrast is checked too.
    projects: (['light', 'dark'] as const).map((theme) => ({
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({ configDir: path.join(dirname, '.storybook') }),
      ],
      define: { 'import.meta.env.STORYBOOK_THEME': JSON.stringify(theme) },
      test: {
        name: theme === 'light' ? 'storybook' : `storybook (${theme})`,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }],
        },
      },
    })),
  },
});
