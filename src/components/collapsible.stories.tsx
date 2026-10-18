import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./button.js";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "./collapsible.js";
import { ChevronsUpDownIcon } from "./icons.js";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  args: { onOpenChange: fn() },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
  render: (args) => (
    <Collapsible {...args} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">3 starred repositories</span>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />} aria-label="Toggle repositories">
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-xl border px-4 py-2 font-mono text-sm">base-ui/base-ui</div>
      <CollapsiblePanel className="flex flex-col gap-2">
        <div className="rounded-xl border px-4 py-2 font-mono text-sm">motiondivision/motion</div>
        <div className="rounded-xl border px-4 py-2 font-mono text-sm">tailwindlabs/tailwindcss</div>
      </CollapsiblePanel>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Toggle repositories" });
    await expect(canvas.queryByText("motiondivision/motion")).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("motiondivision/motion")).toBeInTheDocument();
    await expect(args.onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

export const Open: Story = { args: { defaultOpen: true } };
