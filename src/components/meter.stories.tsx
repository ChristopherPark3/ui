import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Meter, MeterLabel, MeterValue } from "./meter.js";

const meta = {
  title: "Components/Meter",
  component: Meter,
  args: { value: 72 },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
  render: (args) => (
    <Meter {...args}>
      <MeterLabel>Storage used</MeterLabel>
      <MeterValue />
    </Meter>
  ),
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("meter", { name: "Storage used" })).toHaveAttribute("aria-valuenow", "72");
  },
};

export const CustomFormat: Story = {
  args: { value: 3.6, max: 5, format: { style: "unit", unit: "gigabyte", maximumFractionDigits: 1 } },
};
