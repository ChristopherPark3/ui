import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Toggle } from "./toggle.js";

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </svg>
);

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  args: { "aria-label": "Bold", children: <BoldIcon />, onPressedChange: fn() },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Bold" });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(args.onPressedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

export const Outline: Story = { args: { variant: "outline" } };

export const WithText: Story = {
  args: {
    "aria-label": undefined,
    variant: "outline",
    children: (
      <>
        <BoldIcon />
        Bold
      </>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Toggle {...args} size="sm" />
      <Toggle {...args} />
      <Toggle {...args} size="lg" />
    </div>
  ),
};

export const Pressed: Story = { args: { defaultPressed: true } };
export const Disabled: Story = { args: { disabled: true } };
