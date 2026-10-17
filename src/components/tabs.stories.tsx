import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs.js";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  args: { defaultValue: "overview", onValueChange: fn() },
  argTypes: { orientation: { control: "select", options: ["horizontal", "vertical"] } },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics">Analytics</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Your workspace at a glance.</TabsPanel>
      <TabsPanel value="analytics">Traffic and conversions.</TabsPanel>
      <TabsPanel value="settings">Manage your preferences.</TabsPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Analytics" }));
    await expect(canvas.getByRole("tab", { name: "Analytics" })).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel", { name: "Analytics" })).toHaveTextContent("Traffic and conversions.");
    await expect(args.onValueChange).toHaveBeenCalledWith("analytics", expect.anything());
    // Arrow keys move between tabs.
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Settings" })).toHaveFocus();
  },
};

export const Underline: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="underline">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics">Analytics</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Your workspace at a glance.</TabsPanel>
      <TabsPanel value="analytics">Traffic and conversions.</TabsPanel>
      <TabsPanel value="settings">Manage your preferences.</TabsPanel>
    </Tabs>
  ),
};

export const Vertical: Story = { args: { orientation: "vertical" } };

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics" disabled>
          Analytics
        </TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Your workspace at a glance.</TabsPanel>
      <TabsPanel value="settings">Manage your preferences.</TabsPanel>
    </Tabs>
  ),
};
