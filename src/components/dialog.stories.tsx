import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { Field, FieldLabel } from "./field.js";
import { Input } from "./input.js";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  args: { onOpenChange: fn() },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Changes are saved when you click Save.</DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input defaultValue="Christopher" />
        </Field>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Edit profile" });
    await userEvent.click(trigger);
    const body = within(document.body);
    const dialog = await body.findByRole("dialog", { name: "Edit profile" });
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(args.onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    // Focus moves into the dialog; Escape closes it and returns focus to the trigger.
    await expect(body.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Heads up</DialogTitle>
          <DialogDescription>Close with the button, Escape or by clicking outside.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
