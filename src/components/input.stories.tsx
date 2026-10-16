import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input.js";
import { Label } from "./label.js";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "you@example.com", type: "email" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
};

export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "not-an-email" } };

export const Disabled: Story = { args: { disabled: true } };
