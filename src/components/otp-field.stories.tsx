import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Field, FieldDescription, FieldLabel } from "./field.js";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "./otp-field.js";

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  args: { length: 6, onValueComplete: fn() },
  argTypes: { disabled: { control: "boolean" } },
  render: (args) => (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OTPField {...args}>
        {Array.from({ length: 6 }, (_, i) => (
          <OTPFieldInput key={i} aria-label={i === 0 ? undefined : `Character ${i + 1} of 6`} />
        ))}
      </OTPField>
      <FieldDescription>Enter the code we sent to your phone.</FieldDescription>
    </Field>
  ),
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("textbox", { name: "Verification code" }));
    await userEvent.keyboard("123456");
    await expect(args.onValueComplete).toHaveBeenCalledWith("123456", expect.anything());
  },
};

export const WithSeparator: Story = {
  render: (args) => (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OTPField {...args}>
        {[0, 1, 2].map((i) => (
          <OTPFieldInput key={i} aria-label={i === 0 ? undefined : `Character ${i + 1} of 6`} />
        ))}
        <OTPFieldSeparator />
        {[3, 4, 5].map((i) => (
          <OTPFieldInput key={i} aria-label={`Character ${i + 1} of 6`} />
        ))}
      </OTPField>
    </Field>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field invalid>
      <FieldLabel>Verification code</FieldLabel>
      <OTPField {...args} defaultValue="000000">
        {Array.from({ length: 6 }, (_, i) => (
          <OTPFieldInput key={i} aria-label={i === 0 ? undefined : `Character ${i + 1} of 6`} />
        ))}
      </OTPField>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
