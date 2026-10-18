import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Spinner } from "./spinner.js";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  },
};

/** Size with `size-*` and color with `text-*`. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} className="size-3" />
      <Spinner {...args} />
      <Spinner {...args} className="size-6" />
      <Spinner {...args} className="size-8 text-primary" />
    </div>
  ),
};

/** Give it a label that says what's loading, or show the text next to it. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner {...args} aria-hidden />
      Loading projects…
    </div>
  ),
};
