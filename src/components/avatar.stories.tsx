import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar.js";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/ChristopherPark3.png" alt="Christopher Park" />
      <AvatarFallback>CP</AvatarFallback>
    </Avatar>
  ),
};

/** If the image fails to load, the fallback stays. */
export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/does-not-exist.png" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("AL")).toBeVisible();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {["size-6 text-xs", "size-8", "size-10", "size-12 text-base"].map((size) => (
        <Avatar key={size} className={size}>
          <AvatarFallback>CP</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
