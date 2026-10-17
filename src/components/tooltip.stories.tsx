import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import { PlusIcon } from "./icons.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip.js";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [(Story) => <div className="p-16">{Story()}</div>],
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Add to library" />}>
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Add to library" }));
    const body = within(document.body);
    // Tooltips are visual-only (no tooltip role); the trigger's aria-label carries the name.
    await waitFor(() => expect(body.getByText("Add to library")).toBeVisible());
    await userEvent.unhover(canvas.getByRole("button", { name: "Add to library" }));
    await waitFor(() => expect(body.queryByText("Add to library")).not.toBeInTheDocument());
  },
};

/** Opens on keyboard focus too. */
export const OnFocus: Story = {
  play: async ({ userEvent }) => {
    await userEvent.tab();
    await waitFor(() => expect(within(document.body).getByText("Add to library")).toBeVisible());
  },
};

/** Inside a provider, moving between triggers skips the delay. */
export const Group: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-2">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};
