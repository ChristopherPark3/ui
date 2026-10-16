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
  initialGlobals: { theme: "light" },
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
      // 'todo' shows violations in the test UI; switch to 'error' to fail CI on them.
      test: "todo",
    },
  },
};

export default preview;
