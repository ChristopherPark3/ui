import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import * as React from "react";
import { Button } from "./button.js";
import { buttonVariants } from "./button-variants.js";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button", onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>Default</Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon-sm" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button {...args} size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button {...args} size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        New project
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeDisabled();
  },
};

/** Stays in the tab order (e.g. to show a tooltip explaining why) but ignores activation. */
export const FocusableWhenDisabled: Story = {
  args: { disabled: true, focusableWhenDisabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** Stays focusable and announces `aria-busy`, but ignores clicks until the action finishes. */
export const Loading: Story = {
  args: { loading: true, children: "Saving" },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Saving" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
    // Hovering shows the busy cursor, and mouse clicks are still ignored.
    await expect(getComputedStyle(button).cursor).toBe("progress");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} loading>
        Default
      </Button>
      <Button {...args} loading variant="destructive">
        Destructive
      </Button>
      <Button {...args} loading variant="outline">
        Outline
      </Button>
      <Button {...args} loading variant="secondary">
        Secondary
      </Button>
      <Button {...args} loading size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** The spinner takes the place of a leading icon. Trailing icons stay. */
export const LoadingWithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} loading>
        <PlusIcon />
        New project
      </Button>
      <Button {...args} loading variant="outline">
        Continue
        <ArrowRightIcon />
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    const leading = canvas.getByRole("button", { name: "New project" });
    const trailing = canvas.getByRole("button", { name: "Continue" });
    await expect(leading.querySelectorAll("svg")).toHaveLength(1);
    await expect(leading.querySelector("svg")).toHaveClass("animate-spin");
    await expect(trailing.querySelectorAll("svg")).toHaveLength(2);
  },
};

/** Error state, e.g. a form's submit button when the form has errors. Set `aria-invalid`. */
export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} aria-invalid>
        Default
      </Button>
      <Button {...args} aria-invalid variant="outline">
        Outline
      </Button>
      <Button {...args} aria-invalid variant="secondary">
        Secondary
      </Button>
    </div>
  ),
};

/** Links aren't buttons: put `buttonVariants()` on the link (or a Next.js `<Link>`) instead. */
export const AsLink: Story = {
  render: () => (
    <a href="#docs" className={buttonVariants({ variant: "outline" })}>
      Go to docs
    </a>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Go to docs" })).toHaveAttribute("href", "#docs");
  },
};

/** Click to cycle through states: the width animates to fit each label. */
export const AnimatedWidth: Story = {
  render: function Render(args) {
    const [status, setStatus] = React.useState<"idle" | "saving" | "saved">("idle");
    React.useEffect(() => {
      if (status === "idle") return;
      const next = setTimeout(() => setStatus(status === "saving" ? "saved" : "idle"), 1500);
      return () => clearTimeout(next);
    }, [status]);
    return (
      <Button {...args} loading={status === "saving"} onClick={() => setStatus("saving")}>
        {status === "idle" ? "Save" : status === "saving" ? "Saving changes" : "Saved!"}
      </Button>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save" });
    await waitFor(() => expect(button.style.width).not.toBe(""));
    const before = button.getBoundingClientRect().width;
    await userEvent.click(button);
    await waitFor(() => expect(button.getBoundingClientRect().width).toBeGreaterThan(before + 20));
    await expect(button).toHaveAccessibleName("Saving changes");
  },
};
