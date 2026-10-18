import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "./button.js";
import { Toaster, ToastProvider, useToastManager } from "./toast.js";

function Demo() {
  const toast = useToastManager();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.add({ title: "Event created", description: "Sunday, Oct 19 at 9:00 AM" })}
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.add({ title: "Saved", description: "Your changes are live.", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.add({ title: "Upload failed", description: "The file is over 10 MB.", type: "error" })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: { title: "Deploying…", description: "This takes a few seconds." },
            success: { title: "Deployed", description: "Your site is live." },
            error: { title: "Deploy failed" },
          })
        }
      >
        Loading → success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Message archived",
            actionProps: { children: "Undo", onClick: () => toast.add({ title: "Restored" }) },
          })
        }
      >
        With action
      </Button>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: Toaster,
  render: () => (
    <ToastProvider>
      <Demo />
      <Toaster />
    </ToastProvider>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const body = within(document.body);
    await waitFor(() => expect(body.getByText("Event created")).toBeVisible());
    // Base UI hides the close button from screen readers (the toast is announced via a live region).
    await userEvent.click(body.getByLabelText("Close"));
    await waitFor(() => expect(body.queryByText("Event created")).not.toBeInTheDocument());
  },
};

/** `toast.promise` shows a spinner, then switches to success or error when the promise settles. */
export const Promise_: Story = {
  name: "Loading to success",
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Loading → success" }));
    const body = within(document.body);
    await waitFor(() => expect(body.getByText("Deploying…")).toBeVisible());
    await waitFor(() => expect(body.getByText("Deployed")).toBeVisible(), { timeout: 4000 });
  },
};

export const WithAction: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "With action" }));
    const body = within(document.body);
    await userEvent.click(await body.findByRole("button", { name: "Undo" }));
    await waitFor(() => expect(body.getByText("Restored")).toBeVisible());
  },
};
