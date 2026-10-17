import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer.js";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  args: { onOpenChange: fn() },
  argTypes: { swipeDirection: { control: "select", options: ["down", "up", "left", "right"] } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal. Swipe to dismiss.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-center p-8 text-5xl font-bold tabular-nums">350</div>
        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open drawer" }));
    const body = within(document.body);
    await body.findByRole("dialog", { name: "Move goal" });
    await userEvent.click(body.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  },
};

export const Right: Story = { args: { swipeDirection: "right" } };
export const Left: Story = { args: { swipeDirection: "left" } };
export const Top: Story = { args: { swipeDirection: "up" } };
