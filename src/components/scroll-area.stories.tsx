import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area.js";
import { Separator } from "./separator.js";

const tags = Array.from({ length: 40 }, (_, i) => `v1.${40 - i}.0`);

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-48 rounded-xl border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Releases</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <ScrollArea {...args} className="w-96 rounded-xl border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex size-32 shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
