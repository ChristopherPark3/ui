import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "./button.js";
import { Empty, EmptyActions, EmptyDescription, EmptyHeader, EmptyIcon, EmptyTitle } from "./empty.js";
import { PlusIcon } from "./icons.js";

const meta = {
  title: "Components/Empty",
  component: Empty,
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

/** Nothing here yet: explain what goes here and offer the first step. */
export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyIcon>
          <FolderIcon />
        </EmptyIcon>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Projects hold your apps, environments and deploys. Create one to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button>
          <PlusIcon />
          New project
        </Button>
        <Button variant="outline">Import</Button>
      </EmptyActions>
    </Empty>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No projects yet")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "New project" })).toBeEnabled();
  },
};

/** No results for a search or filter: offer a way back. */
export const NoResults: Story = {
  render: (args) => (
    <Empty {...args} className="border-none">
      <EmptyHeader>
        <EmptyIcon>
          <SearchIcon />
        </EmptyIcon>
        <EmptyTitle>No results for “dashbaord”</EmptyTitle>
        <EmptyDescription>
          Check the spelling or try a different search. <a href="#help">Search tips</a>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button variant="outline">Clear search</Button>
      </EmptyActions>
    </Empty>
  ),
};
