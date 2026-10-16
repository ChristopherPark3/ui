import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./button.js";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button", onClick: fn() },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "outline", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["sm", "default", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#">I'm a link</a>
    </Button>
  ),
};
