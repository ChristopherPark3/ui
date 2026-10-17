import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import { Field, FieldLabel } from "./field.js";
import { Input } from "./input.js";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "./popover.js";

const meta = {
  title: "Components/Popover",
  component: Popover,
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Dimensions</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Dimensions</PopoverTitle>
        <PopoverDescription>Set the layer size.</PopoverDescription>
        <Field>
          <FieldLabel>Width</FieldLabel>
          <Input defaultValue="100%" />
        </Field>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Dimensions" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const body = within(document.body);
    const popup = await body.findByRole("dialog", { name: "Dimensions" });
    await waitFor(() => expect(popup).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  },
};

export const Sides: Story = {
  render: (args) => (
    <div className="flex gap-2 p-24">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side} {...args}>
          <PopoverTrigger render={<Button variant="outline" />}>{side}</PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            Opens on the {side}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
