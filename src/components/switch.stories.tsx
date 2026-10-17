import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Label } from "./label.js";
import { Switch } from "./switch.js";

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: { onCheckedChange: fn() },
  argTypes: { disabled: { control: "boolean" }, "aria-invalid": { control: "boolean" } },
  render: (args) => (
    <Label>
      <Switch {...args} />
      Airplane mode
    </Label>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Airplane mode" });
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    await userEvent.keyboard(" ");
    await expect(toggle).not.toBeChecked();
  },
};

export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true } };
