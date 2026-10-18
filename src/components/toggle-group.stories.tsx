import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group.js";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  args: { "aria-label": "Text alignment", defaultValue: ["left"], onValueChange: fn() },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Center" }));
    await expect(canvas.getByRole("button", { name: "Center" })).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "false");
    await expect(args.onValueChange).toHaveBeenCalledWith(["center"], expect.anything());
  },
};

export const Outline: Story = { args: { variant: "outline" } };

export const Multiple: Story = {
  args: { multiple: true, "aria-label": "Text style", defaultValue: [] },
  render: (args) => (
    <ToggleGroup {...args} variant="outline">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Bold" }));
    await userEvent.click(canvas.getByRole("button", { name: "Italic" }));
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    await expect(canvas.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
  },
};

export const Vertical: Story = { args: { orientation: "vertical", variant: "outline" } };
export const Disabled: Story = { args: { disabled: true } };
