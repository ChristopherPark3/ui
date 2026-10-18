import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Field, FieldError, FieldLabel } from "./field.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select.js";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: { items: fruits, onValueChange: fn() },
  argTypes: { disabled: { control: "boolean" } },
  render: (args) => (
    <Field>
      <FieldLabel>Fruit</FieldLabel>
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "Fruit" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await waitFor(() => expect(body.getByRole("listbox")).toBeVisible());
    await userEvent.click(body.getByRole("option", { name: "Grapes" }));
    await expect(args.onValueChange).toHaveBeenCalledWith("grapes", expect.anything());
    await expect(trigger).toHaveTextContent("Grapes");
  },
};

export const WithValue: Story = { args: { defaultValue: "banana" } };

/** Opens over the trigger with the selected item lined up, like a native macOS menu. */
export const AlignedWithTrigger: Story = {
  args: { defaultValue: "blueberry" },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger>
        {fruits.map((fruit) => (
          <SelectItem key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Groups: Story = {
  args: { items: { apple: "Apple", banana: "Banana", carrot: "Carrot", potato: "Potato" } },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="Food">
        <SelectValue placeholder="Pick a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Fruits</SelectGroupLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Vegetables</SelectGroupLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field invalid>
      <FieldLabel>Fruit</FieldLabel>
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError match>Pick a fruit to continue.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
