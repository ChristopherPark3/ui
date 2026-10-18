import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "./menu.js";

const onSelect = fn();

const meta = {
  title: "Components/Menu",
  component: Menu,
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger render={<Button variant="outline" />}>Options</MenuTrigger>
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuGroupLabel>My account</MenuGroupLabel>
          <MenuItem onClick={() => onSelect("profile")}>
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem onClick={() => onSelect("settings")}>
            Settings
            <MenuShortcut>⌘,</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>Invite users</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>Email</MenuItem>
            <MenuItem>Message</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuItem disabled>API (coming soon)</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">Log out</MenuItem>
      </MenuContent>
    </Menu>
  ),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    onSelect.mockClear();
    await userEvent.click(canvas.getByRole("button", { name: "Options" }));
    const body = within(document.body);
    const menu = await body.findByRole("menu");
    await waitFor(() => expect(menu).toBeVisible());
    await userEvent.click(body.getByRole("menuitem", { name: /Settings/ }));
    await expect(onSelect).toHaveBeenCalledWith("settings");
    await waitFor(() => expect(body.queryByRole("menu")).not.toBeInTheDocument());
  },
};

export const KeyboardAndSubmenu: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Options" });
    // Park the pointer on the trigger: Base UI highlights whatever item is under the pointer.
    await userEvent.hover(trigger);
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const body = within(document.body);
    await body.findByRole("menu");
    // Opening with Enter highlights the first item; arrows move the highlight.
    await waitFor(() => expect(body.getByRole("menuitem", { name: /Profile/ })).toHaveAttribute("data-highlighted"));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await waitFor(() => expect(body.getByRole("menuitem", { name: "Invite users" })).toHaveAttribute("data-highlighted"));
    // ArrowRight opens the submenu.
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() => expect(body.getAllByRole("menu")).toHaveLength(2));
    await expect(body.getByRole("menuitem", { name: "Email" })).toBeInTheDocument();
  },
};

export const CheckboxAndRadio: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
      <MenuContent className="w-52">
        <MenuGroup>
          <MenuGroupLabel>Appearance</MenuGroupLabel>
          <MenuCheckboxItem defaultChecked>Status bar</MenuCheckboxItem>
          <MenuCheckboxItem>Activity bar</MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Panel position</MenuGroupLabel>
          <MenuRadioGroup defaultValue="bottom">
            <MenuRadioItem value="top">Top</MenuRadioItem>
            <MenuRadioItem value="bottom">Bottom</MenuRadioItem>
            <MenuRadioItem value="right">Right</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "View" }));
    const body = within(document.body);
    const activity = await body.findByRole("menuitemcheckbox", { name: "Activity bar" });
    await userEvent.click(activity);
    await expect(activity).toHaveAttribute("aria-checked", "true");
    const right = body.getByRole("menuitemradio", { name: "Right" });
    await userEvent.click(right);
    await expect(right).toHaveAttribute("aria-checked", "true");
  },
};
