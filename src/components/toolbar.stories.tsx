import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Toggle } from "./toggle.js";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "./toolbar.js";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  args: { "aria-label": "Formatting" },
  argTypes: { orientation: { control: "select", options: ["horizontal", "vertical"] } },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup aria-label="Style">
        <ToolbarButton render={<Toggle size="sm" />}>Bold</ToolbarButton>
        <ToolbarButton render={<Toggle size="sm" />}>Italic</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton>Undo</ToolbarButton>
      <ToolbarButton disabled>Redo</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarLink href="#help">Help</ToolbarLink>
    </Toolbar>
  ),
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Bold" }));
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    // Arrow keys move focus through the toolbar; Tab leaves it.
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("button", { name: "Italic" })).toHaveFocus();
  },
};

export const WithInput: Story = {
  render: (args) => (
    <Toolbar {...args} aria-label="Search">
      <ToolbarInput aria-label="Filter" placeholder="Filter…" />
      <ToolbarSeparator />
      <ToolbarButton variant="default">Apply</ToolbarButton>
    </Toolbar>
  ),
};

export const Vertical: Story = { args: { orientation: "vertical" } };
