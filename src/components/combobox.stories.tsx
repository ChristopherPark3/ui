import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, waitFor, within } from "storybook/test";
import { useFakeSearch } from "../../.storybook/use-fake-search.js";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
} from "./combobox.js";
import { Field, FieldLabel } from "./field.js";
import { SpinnerIcon } from "./icons.js";

const frameworks = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt", "Gatsby"];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  args: { items: frameworks, onValueChange: fn() },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
  render: (args) => (
    <Field>
      <FieldLabel>Framework</FieldLabel>
      <Combobox {...args}>
        <ComboboxInput placeholder="Search frameworks…" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await userEvent.type(input, "st");
    const body = within(document.body);
    await waitFor(() => expect(body.getAllByRole("option")).toHaveLength(1));
    await userEvent.click(body.getByRole("option", { name: "Astro" }));
    await expect(args.onValueChange).toHaveBeenCalledWith("Astro", expect.anything());
    await expect(input).toHaveValue("Astro");
  },
};

export const Empty: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Framework" }), "zzz");
    await waitFor(() => expect(within(document.body).getByText("No frameworks found.")).toBeVisible());
  },
};

/** `multiple` with removable chips. Backspace removes the last chip. */
export const Multiple: Story = {
  args: { multiple: true, defaultValue: ["Next.js", "Astro"] },
  render: (args) => (
    <Field>
      <FieldLabel>Frameworks</FieldLabel>
      <Combobox {...args}>
        <ComboboxChips>
          <ComboboxValue>
            {(values: string[]) => values.map((value) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add…" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByRole("button", { name: "Remove" })[0]!);
    await waitFor(() => expect(canvas.queryByText("Next.js")).not.toBeInTheDocument());
    await expect(canvas.getByText("Astro")).toBeInTheDocument();
  },
};

export const Invalid: Story = {
  render: (args) => (
    <Field invalid>
      <FieldLabel>Framework</FieldLabel>
      <Combobox {...args}>
        <ComboboxInput placeholder="Search frameworks…" />
        <ComboboxContent>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

const allFrameworks = [...frameworks, "Angular", "Ember", "Qwik", "SolidStart", "Vue", "React Router"];

/**
 * Items fetched as you type. Pass the server's results as `items` with `filter={null}`,
 * track the query with `onInputValueChange`, and say what's happening in `<ComboboxStatus>`.
 */
export const Async: Story = {
  render: function Render(args) {
    const [query, setQuery] = React.useState("");
    const { results, loading } = useFakeSearch(allFrameworks, query);
    return (
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Combobox {...args} items={results} filter={null} onInputValueChange={setQuery}>
          <ComboboxInput placeholder="Search frameworks…" loading={loading} />
          <ComboboxContent>
            <ComboboxStatus>
              {loading && (
                <>
                  <SpinnerIcon />
                  Searching…
                </>
              )}
            </ComboboxStatus>
            <ComboboxEmpty>{!loading && (query ? "No frameworks found." : "Type to search.")}</ComboboxEmpty>
            <ComboboxList aria-label="Frameworks">
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Framework" });
    await userEvent.type(input, "so");
    const body = within(document.body);
    await expect(input).toHaveAttribute("aria-busy", "true");
    await waitFor(() => expect(body.getByText("Searching…")).toBeVisible());
    await userEvent.click(await body.findByRole("option", { name: "SolidStart" }));
    await expect(args.onValueChange).toHaveBeenCalledWith("SolidStart", expect.anything());
  },
};
