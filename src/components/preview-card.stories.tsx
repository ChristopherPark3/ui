import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Avatar, AvatarFallback } from "./avatar.js";
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "./preview-card.js";

const meta = {
  title: "Components/PreviewCard",
  component: PreviewCard,
  render: (args) => (
    <p className="max-w-sm text-sm">
      Built with{" "}
      <PreviewCard {...args}>
        <PreviewCardTrigger href="https://base-ui.com" delay={200}>
          Base UI
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Base UI</span>
              <span className="text-muted-foreground">Unstyled, accessible React components.</span>
            </div>
          </div>
        </PreviewCardContent>
      </PreviewCard>{" "}
      and Tailwind.
    </p>
  ),
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("link", { name: "Base UI" }));
    const body = within(document.body);
    await waitFor(() => expect(body.getByText("Unstyled, accessible React components.")).toBeVisible());
  },
};
