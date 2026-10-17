import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "./accordion.js";

const items = [
  { value: "shipping", q: "How long does shipping take?", a: "Orders ship within 2 business days." },
  { value: "returns", q: "Can I return an item?", a: "Yes, within 30 days of delivery." },
  { value: "support", q: "How do I contact support?", a: "Email us any time and we'll reply within a day." },
];

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  args: { onValueChange: fn() },
  argTypes: { multiple: { control: "boolean" }, disabled: { control: "boolean" } },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
  render: (args) => (
    <Accordion {...args}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionPanel>{item.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Can I return an item?" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(canvas.getByText("Yes, within 30 days of delivery.")).toBeVisible());
    await expect(args.onValueChange).toHaveBeenCalledWith(["returns"], expect.anything());
    // Opening another item closes the first unless `multiple` is set.
    await userEvent.click(canvas.getByRole("button", { name: "How do I contact support?" }));
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const Multiple: Story = { args: { multiple: true, defaultValue: ["shipping", "returns"] } };

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="a">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Coming soon</AccordionTrigger>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};
