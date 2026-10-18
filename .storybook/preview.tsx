import type { Preview } from "@storybook/react-vite";
import "./storybook.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  // The test run sets STORYBOOK_THEME to check every story in dark mode too (see vitest.config.ts).
  initialGlobals: { theme: import.meta.env.STORYBOOK_THEME ?? "light" },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === "dark";
      document.documentElement.classList.toggle("dark", dark);
      return (
        <div className="bg-background p-6 text-foreground">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail the test run (and CI) on any violation, in both themes.
      test: "error",
    },
  },
};

export default preview;
