import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge.js";
import { Button } from "./button.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PricingCard: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro</CardTitle>
          <Badge variant="secondary">Popular</Badge>
        </div>
        <CardDescription>Everything you need to ship.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          $12<span className="text-base font-normal text-muted-foreground">/mo</span>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  ),
};
