import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Progress, ProgressLabel, ProgressValue } from "./progress.js";

const meta = {
  title: "Components/Progress",
  component: Progress,
  args: { value: 40 },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Uploading" });
    await expect(bar).toHaveAttribute("aria-valuenow", "40");
  },
};

/** The bar width animates as the value changes. */
export const Animated: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState(10);
    React.useEffect(() => {
      const id = setInterval(() => setValue((v) => (v >= 100 ? 10 : Math.min(100, v + 15))), 800);
      return () => clearInterval(id);
    }, []);
    return (
      <Progress {...args} value={value}>
        <ProgressLabel>Exporting</ProgressLabel>
        <ProgressValue />
      </Progress>
    );
  },
};

export const Indeterminate: Story = { args: { value: null } };

export const WithoutLabel: Story = {
  render: (args) => <Progress {...args} aria-label="Loading" />,
};
