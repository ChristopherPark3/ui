import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "./autocomplete.js";
import { Field, FieldLabel } from "./field.js";

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
