import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Badge, badgeVariants } from "./badge.js";
import { CheckIcon } from "./icons.js";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Badge" },
  argTypes: { variant: { control: "select", options: ["default", "secondary", "destructive", "outline"] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args}>Default</Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="destructive">
        Failed
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: "secondary",
    children: (
      <>
        <CheckIcon />
        Verified
      </>
    ),
  },
};

/** For a badge that links, put `badgeVariants()` on the link (or a Next.js `<Link>`). */
export const AsLink: Story = {
  render: () => (
    <a href="#tag" className={badgeVariants({ variant: "outline" })}>
      #design
    </a>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "#design" })).toHaveAttribute("href", "#tag");
  },
};
