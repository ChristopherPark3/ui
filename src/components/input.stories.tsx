import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { Field, FieldDescription, FieldLabel } from "./field.js";
import { Input } from "./input.js";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "you@example.com", "aria-label": "Email", onValueChange: fn() },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "file"] },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    await userEvent.type(input, "hi");
    await expect(input).toHaveValue("hi");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("hi", expect.anything());
  },
};

/** Once there's a value, a × appears. Clicking it empties the input and refocuses it. */
export const Clearable: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    // Hidden (and inert) while empty.
    await expect(canvas.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
    await userEvent.type(input, "ada@example.com");
    const clear = canvas.getByRole("button", { name: "Clear" });
    await userEvent.click(clear);
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("", expect.anything());
    await waitFor(() => expect(canvas.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument());
  },
};

/** Also works when the value is controlled: clearing calls `onValueChange("")`. */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState("ceepeetres");
    return (
      <div className="flex flex-col gap-2">
        <Input {...args} aria-label="Username" value={value} onValueChange={(next) => setValue(next)} />
        <p className="text-sm text-muted-foreground">Value: "{value}"</p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(canvas.getByRole("textbox", { name: "Username" })).toHaveValue("");
    await expect(canvas.getByText('Value: ""')).toBeInTheDocument();
  },
};

export const NotClearable: Story = { args: { clearable: false, defaultValue: "Can't clear me" } };

export const WithField: Story = {
  args: { "aria-label": undefined },
  render: (args) => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input {...args} type="email" />
      <FieldDescription>We'll never share it.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAccessibleDescription("We'll never share it.");
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
};

export const File: Story = {
  args: { type: "file", "aria-label": "Avatar", placeholder: undefined },
};
