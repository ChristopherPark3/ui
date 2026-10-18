import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field.js";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "./number-field.js";

const meta = {
  title: "Components/NumberField",
  component: NumberField,
  args: { defaultValue: 2, min: 0, max: 10, onValueChange: fn() },
  argTypes: { disabled: { control: "boolean" }, readOnly: { control: "boolean" } },
  decorators: [(Story) => <div className="max-w-40">{Story()}</div>],
  render: (args) => (
    <Field>
      <FieldLabel>Quantity</FieldLabel>
      <NumberField {...args}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  ),
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Quantity" });
    await userEvent.click(canvas.getByRole("button", { name: "Increase" }));
    await expect(input).toHaveValue("3");
    await expect(args.onValueChange).toHaveBeenCalledWith(3, expect.anything());
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await expect(input).toHaveValue("1");
  },
};

/** At `max`, the increment button is disabled. */
export const AtMax: Story = {
  args: { defaultValue: 10 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Increase" })).toBeDisabled();
  },
};

/** Drag the label left or right to change the value. */
export const Scrubbing: Story = {
  render: (args) => (
    <NumberField {...args} id="amount">
      <NumberFieldScrubArea>
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
};

export const Currency: Story = {
  args: { defaultValue: 19.99, max: undefined, step: 0.01, format: { style: "currency", currency: "USD" } },
};

export const Invalid: Story = {
  render: (args) => (
    <Field invalid>
      <FieldLabel>Quantity</FieldLabel>
      <NumberField {...args}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldError match>Only 2 left in stock.</FieldError>
      <FieldDescription>Max 10 per order.</FieldDescription>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
