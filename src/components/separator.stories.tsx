import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator.js";

const meta = {
  title: "Components/Separator",
  component: Separator,
  argTypes: { orientation: { control: "select", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <div className="text-sm font-medium">Base UI</div>
      <p className="text-sm text-muted-foreground">Unstyled, accessible components.</p>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Blog</span>
      </div>
    </div>
  ),
};
