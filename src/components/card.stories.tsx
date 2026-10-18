import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Badge } from "./badge.js";
import { Button } from "./button.js";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js";
import { Field, FieldLabel } from "./field.js";
import { Input } from "./input.js";

const meta = {
  title: "Components/Card",
  component: Card,
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Invite your team</CardTitle>
        <CardDescription>They'll get an email with a link to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="teammate@example.com" />
        </Field>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost">Cancel</Button>
        <Button>Send invite</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeVisible();
  },
};

/** `CardAction` pins something to the header's top-right corner. */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Production</CardTitle>
        <CardDescription>Deployed 2 hours ago</CardDescription>
        <CardAction>
          <Badge variant="secondary">Live</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">main · 9b48c30</CardContent>
    </Card>
  ),
};

/** Add `border-b` / `border-t` to the header or footer and the spacing adjusts. */
export const Dividers: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader className="border-b">
        <CardTitle>Usage</CardTitle>
        <CardDescription>This billing period</CardDescription>
      </CardHeader>
      <CardContent className="text-3xl font-semibold tabular-nums">1,284</CardContent>
      <CardFooter className="border-t text-sm text-muted-foreground">Resets Nov 1</CardFooter>
    </Card>
  ),
};
