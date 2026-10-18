import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, waitFor } from "storybook/test";
import { Button } from "./button.js";
import { Skeleton } from "./skeleton.js";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3" aria-busy>
      <Skeleton className="size-10 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="grid w-72 gap-3 rounded-2xl border p-4" aria-busy>
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
};

/** Swap the skeleton for the real content once it arrives, keeping the same layout so nothing jumps. */
export const Loaded: Story = {
  render: function Render() {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      if (loaded) return;
      const timer = setTimeout(() => setLoaded(true), 800);
      return () => clearTimeout(timer);
    }, [loaded]);
    return (
      <div className="grid gap-4">
        <div className="flex h-10 items-center gap-3" aria-busy={!loaded}>
          {loaded ? (
            <>
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                AL
              </div>
              <div className="grid text-sm">
                <span className="font-medium">Ada Lovelace</span>
                <span className="text-muted-foreground">Owner</span>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="size-10 rounded-full" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-16" />
              </div>
            </>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-fit" onClick={() => setLoaded(false)}>
          Reload
        </Button>
      </div>
    );
  },
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText("Ada Lovelace")).toBeVisible());
  },
};
