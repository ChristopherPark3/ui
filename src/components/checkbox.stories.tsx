import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Checkbox, CheckboxGroup } from "./checkbox.js";
import { Label } from "./label.js";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { onCheckedChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  render: (args) => (
    <Label>
      <Checkbox {...args} />
      Accept terms
    </Label>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Accept terms" });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    await userEvent.click(canvas.getByText("Accept terms"));
    await expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = {
  args: { indeterminate: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(checkbox);
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};

export const Invalid: Story = { args: { "aria-invalid": true } };

const fruits = ["Apple", "Banana", "Cherry"];

/** A parent checkbox (`parent`) checks or clears the whole group and shows indeterminate in between. */
export const Group: Story = {
  render: () => (
    <CheckboxGroup aria-label="Fruits" defaultValue={["Apple"]} allValues={fruits}>
      <Label>
        <Checkbox parent />
        All fruits
      </Label>
      {fruits.map((fruit) => (
        <Label key={fruit} className="ml-6">
          <Checkbox value={fruit} />
          {fruit}
        </Label>
      ))}
    </CheckboxGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const all = canvas.getByRole("checkbox", { name: "All fruits" });
    await expect(all).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(all);
    for (const fruit of fruits) await expect(canvas.getByRole("checkbox", { name: fruit })).toBeChecked();
  },
};
