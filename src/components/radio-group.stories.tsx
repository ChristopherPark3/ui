import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Label } from "./label.js";
import { RadioGroup, RadioGroupItem } from "./radio-group.js";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: { "aria-label": "Plan", defaultValue: "pro", onValueChange: fn() },
  argTypes: { disabled: { control: "boolean" } },
  render: (args) => (
    <RadioGroup {...args}>
      {["free", "pro", "team"].map((plan) => (
        <Label key={plan} className="capitalize">
          <RadioGroupItem value={plan} />
          {plan}
        </Label>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "team" }));
    await expect(canvas.getByRole("radio", { name: "team" })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("team", expect.anything());
    // Arrow keys move the selection within the group.
    await userEvent.keyboard("{ArrowUp}");
    await expect(canvas.getByRole("radio", { name: "pro" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "pro" })).toHaveFocus();
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue={undefined}>
      {["free", "pro", "team"].map((plan) => (
        <Label key={plan} className="capitalize">
          <RadioGroupItem value={plan} aria-invalid />
          {plan}
        </Label>
      ))}
    </RadioGroup>
  ),
};
