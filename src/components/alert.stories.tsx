import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Alert, AlertDescription, AlertTitle } from "./alert.js";

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: { variant: { control: "select", options: ["default", "destructive"] } },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Scheduled maintenance on Sunday from 2–3am UTC.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toHaveTextContent("Heads up");
  },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <AlertIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        <p>Your card was declined. Update your billing details to keep your plan.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon />
      <AlertTitle>Your changes were saved.</AlertTitle>
    </Alert>
  ),
};
