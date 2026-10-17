import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Button } from "./button.js";
import { Checkbox } from "./checkbox.js";
import { Field, FieldDescription, FieldError, FieldItem, FieldLabel } from "./field.js";
import { Fieldset, FieldsetLegend } from "./fieldset.js";
import { Form } from "./form.js";
import { Input } from "./input.js";
import { RadioGroup, RadioGroupItem } from "./radio-group.js";

const meta = {
  title: "Components/Field",
  component: Field,
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="ceepeetres" />
      <FieldDescription>Visible on your profile.</FieldDescription>
    </Field>
  ),
};

/** Validation runs on submit, then live as you fix it. The error fades in under the field. */
export const Validation: Story = {
  render: () => (
    <Form onSubmit={(event) => event.preventDefault()}>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" required placeholder="you@example.com" />
        <FieldError match="valueMissing">Email is required.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email.</FieldError>
      </Field>
      <Button type="submit" className="self-start">
        Subscribe
      </Button>
    </Form>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Subscribe" }));
    // The error fades in, so wait for it to finish.
    await waitFor(() => expect(canvas.getByText("Email is required.")).toBeVisible());
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await userEvent.type(input, "nope");
    await waitFor(() => expect(canvas.getByText("Enter a valid email.")).toBeVisible());
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="ceepeetres" />
    </Field>
  ),
};

/** Fieldset groups related fields under a legend. */
export const WithFieldset: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Notifications</FieldsetLegend>
      <Field>
        <FieldItem>
          <Checkbox defaultChecked />
          <FieldLabel>Email me about new releases</FieldLabel>
        </FieldItem>
      </Field>
      <Field>
        <FieldLabel>Digest</FieldLabel>
        <RadioGroup defaultValue="weekly">
          <FieldItem>
            <RadioGroupItem value="daily" />
            <FieldLabel>Daily</FieldLabel>
          </FieldItem>
          <FieldItem>
            <RadioGroupItem value="weekly" />
            <FieldLabel>Weekly</FieldLabel>
          </FieldItem>
        </RadioGroup>
      </Field>
    </Fieldset>
  ),
};
