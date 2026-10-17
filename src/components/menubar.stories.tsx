import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { MenuCheckboxItem, MenuContent, MenuItem, MenuSeparator, MenuShortcut } from "./menu.js";
import { Menubar, MenubarMenu, MenubarTrigger } from "./menubar.js";

const meta = {
  title: "Components/Menubar",
  component: Menubar,
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenuContent>
          <MenuItem>
            New tab <MenuShortcut>⌘T</MenuShortcut>
          </MenuItem>
          <MenuItem>
            New window <MenuShortcut>⌘N</MenuShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuItem>Print…</MenuItem>
        </MenuContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenuContent>
          <MenuItem>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenuContent>
          <MenuCheckboxItem defaultChecked>Show bookmarks</MenuCheckboxItem>
          <MenuCheckboxItem>Show full URLs</MenuCheckboxItem>
        </MenuContent>
      </MenubarMenu>
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("menuitem", { name: "File" }));
    const body = within(document.body);
    await body.findByRole("menuitem", { name: /New tab/ });
    // With a menu open, hovering a sibling trigger switches menus.
    await userEvent.hover(canvas.getByRole("menuitem", { name: "Edit" }));
    await waitFor(() => expect(body.getByRole("menuitem", { name: "Undo" })).toBeVisible());
  },
};
