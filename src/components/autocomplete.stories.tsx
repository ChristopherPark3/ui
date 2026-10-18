import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, waitFor, within } from "storybook/test";
import { useFakeSearch } from "../../.storybook/use-fake-search.js";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
} from "./autocomplete.js";
import { Field, FieldLabel } from "./field.js";
import { SpinnerIcon } from "./icons.js";

const tags = ["feature", "fix", "bug", "docs", "internal", "mobile", "performance", "security"];

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  args: { items: tags, onValueChange: fn() },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
  render: (args) => (
    <Field>
      <FieldLabel>Search tags</FieldLabel>
      <Autocomplete {...args}>
        <AutocompleteInput placeholder="e.g. feature" />
        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(tag: string) => (
              <AutocompleteItem key={tag} value={tag}>
                {tag}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </Field>
  ),
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Search tags" });
    await userEvent.type(input, "fe");
    const body = within(document.body);
    await waitFor(() => expect(body.getByRole("option", { name: "feature" })).toBeVisible());
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("feature");
  },
};

export const Clear: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Search tags" });
    await userEvent.type(input, "docs");
    // While suggestions are open, Base UI hides the rest of the page from assistive tech; close them first.
    await userEvent.keyboard("{Escape}");
    await userEvent.click(await canvas.findByRole("button", { name: "Clear" }));
    await expect(input).toHaveValue("");
  },
};

export const Empty: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search tags" }), "zzz");
    await waitFor(() => expect(within(document.body).getByText("No tags found.")).toBeVisible());
  },
};

/**
 * Suggestions fetched as you type. Pass the server's results as `items` with `filter={null}`,
 * show `loading` on the input, and say what's happening in `<AutocompleteStatus>`.
 */
export const Async: Story = {
  render: function Render(args) {
    const [query, setQuery] = React.useState("");
    const { results, loading } = useFakeSearch(tags, query);
    return (
      <Field>
        <FieldLabel>Search tags</FieldLabel>
        <Autocomplete {...args} items={results} filter={null} value={query} onValueChange={setQuery}>
          <AutocompleteInput placeholder="e.g. feature" loading={loading} />
          <AutocompleteContent>
            <AutocompleteStatus>
              {loading && (
                <>
                  <SpinnerIcon />
                  Searching…
                </>
              )}
            </AutocompleteStatus>
            <AutocompleteEmpty>{!loading && query && "No tags found."}</AutocompleteEmpty>
            <AutocompleteList aria-label="Tags">
              {(tag: string) => (
                <AutocompleteItem key={tag} value={tag}>
                  {tag}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </Field>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Search tags" });
    await userEvent.type(input, "bu");
    const body = within(document.body);
    await expect(input).toHaveAttribute("aria-busy", "true");
    await waitFor(() => expect(body.getByText("Searching…")).toBeVisible());
    await waitFor(() => expect(body.getByRole("option", { name: "bug" })).toBeVisible());
    await expect(input).not.toHaveAttribute("aria-busy");
    await expect(body.queryByText("Searching…")).toBeNull();
  },
};
