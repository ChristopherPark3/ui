import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field.js";
import { Textarea } from "./textarea.js";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: { placeholder: "Tell us what happened…", "aria-label": "Message", onValueChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" });
    await userEvent.type(textarea, "Line one{Enter}Line two");
    await expect(textarea).toHaveValue("Line one\nLine two");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("Line one\nLine two");
  },
};

/** Grows with its content. Cap it with a `max-h-*` class and it scrolls past that. */
export const AutoGrow: Story = {
  args: { className: "max-h-40" },
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" });
    const before = textarea.getBoundingClientRect().height;
    await userEvent.type(textarea, "1{Enter}2{Enter}3{Enter}4{Enter}5");
    await waitFor(() => expect(textarea.getBoundingClientRect().height).toBeGreaterThan(before));
  },
};

/** The × sits in the top-right corner once there's text. */
export const Clearable: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" });
    await expect(canvas.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
    await userEvent.type(textarea, "Draft");
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(textarea).toHaveValue("");
    await expect(textarea).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("");
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState("Ship it");
    return (
      <div className="flex flex-col gap-2">
        <Textarea {...args} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">{value.length} / 280</p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("7 / 280")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Clear" }));
    await expect(canvas.getByText("0 / 280")).toBeVisible();
  },
};

export const InField: Story = {
  render: (args) => (
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <Textarea {...args} aria-label={undefined} placeholder="A few words about you" />
      <FieldDescription>Shown on your public profile.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Bio" })).toHaveAccessibleDescription("Shown on your public profile.");
  },
};

export const Invalid: Story = {
  render: (args) => (
    <Field invalid>
      <FieldLabel>Bio</FieldLabel>
      <Textarea {...args} aria-label={undefined} defaultValue="hi" />
      <FieldError match>Write at least 20 characters.</FieldError>
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Bio" })).toHaveAttribute("aria-invalid", "true");
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Message" })).toBeDisabled();
    await expect(canvas.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  },
};
