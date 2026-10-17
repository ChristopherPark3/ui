import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu.js";

const docs = [
  { href: "#quick-start", title: "Quick start", description: "Install and assemble your first component." },
  { href: "#accessibility", title: "Accessibility", description: "How the components stay accessible." },
  { href: "#releases", title: "Releases", description: "What's new in the latest versions." },
  { href: "#about", title: "About", description: "The team and the mission." },
];

const guides = [
  { href: "#styling", title: "Styling", description: "Tailwind, CSS modules or plain CSS." },
  { href: "#animation", title: "Animation", description: "CSS transitions and JS libraries." },
];

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  args: { "aria-label": "Main" },
  decorators: [(Story) => <div className="min-h-80">{Story()}</div>],
  parameters: {
    // Base UI renders hidden focus-guard spans (aria-hidden, tabindex=0) to keep Tab order
    // correct around the portaled popup. That's intended, so skip this rule here.
    a11y: { config: { rules: [{ id: "aria-hidden-focus", enabled: false }] } },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-[460px] sm:grid-cols-2">
              {docs.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink href={link.href}>
                    <span className="font-medium">{link.title}</span>
                    <span className="text-muted-foreground">{link.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-72">
              {guides.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink href={link.href}>
                    <span className="font-medium">{link.title}</span>
                    <span className="text-muted-foreground">{link.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#github" className={navigationMenuTriggerStyle}>
            GitHub
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Docs" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const body = within(document.body);
    await waitFor(() => expect(body.getByRole("link", { name: /Quick start/ })).toBeVisible());
  },
};
