import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Badge } from "./components/badge.js";
import { cn } from "./lib/cn.js";
import { Button } from "./components/button.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card.js";
import { Checkbox } from "./components/checkbox.js";
import { Field, FieldLabel } from "./components/field.js";
import { Input } from "./components/input.js";
import { Label } from "./components/label.js";
import { Switch } from "./components/switch.js";

const meta = {
  title: "Foundations/Theming",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Each surface token with its matching foreground. Toggle the theme in the toolbar to see `.dark`. */
const pairs = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
  ["destructive", "destructive-foreground"],
] as const;

export const Palette: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {pairs.map(([surface, text]) => (
          <div
            key={surface}
            className={cn(
              "flex h-24 flex-col justify-between rounded-xl border p-3 text-sm",
              // Matches Button/Badge: the dark --destructive is bright enough for text but too bright under white.
              surface === "destructive" && "dark:bg-destructive/60!",
            )}
            style={{ background: `var(--${surface})`, color: `var(--${text})` }}
          >
            <span className="font-medium">{surface}</span>
            <code className="text-xs">{surface === "destructive" ? "solid fills: /60 in dark" : `--${text}`}</code>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        {(["border", "input", "ring"] as const).map((token) => (
          <div key={token} className="flex items-center gap-2">
            <span className="size-6 rounded-md border-2" style={{ borderColor: `var(--${token})` }} />
            <code>--{token}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

/** Every corner comes from `--radius`. Change it once and the whole library follows. */
export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4 text-sm">
      {(
        [
          ["rounded-sm", "−4px"],
          ["rounded-md", "−2px"],
          ["rounded-lg", "--radius"],
          ["rounded-xl", "+4px · controls, popups"],
          ["rounded-2xl", "+6px · cards, dialogs"],
        ] as const
      ).map(([cls, note]) => (
        <div key={cls} className="grid justify-items-center gap-2">
          <div className={`size-16 border-2 border-primary bg-muted ${cls}`} />
          <code>{cls}</code>
          <span className="text-xs text-muted-foreground">{note}</span>
        </div>
      ))}
    </div>
  ),
};

/*
 * A brand applied the way an app would: redefine the tokens (here scoped to a class so the
 * rest of Storybook stays neutral; in an app, put them on :root and .dark).
 */
const brandCss = `
.brand-demo {
  --primary: oklch(0.51 0.23 277);
  --primary-foreground: oklch(0.985 0 0);
  --ring: oklch(0.67 0.18 277);
  --radius: 0.75rem;
}
.dark .brand-demo {
  --primary: oklch(0.78 0.12 277);
  --primary-foreground: oklch(0.2 0.06 277);
  --ring: oklch(0.55 0.18 277);
}
`;

/**
 * An example brand: indigo primary and slightly rounder corners, from four variables.
 * Popups and dialogs render in a portal outside this wrapper, so in an app set the tokens on `:root`.
 */
export const CustomBrand: Story = {
  render: () => (
    <div className="brand-demo max-w-sm">
      <style>{brandCss}</style>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Notifications <Badge>New</Badge>
          </CardTitle>
          <CardDescription>Choose what you hear about.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" defaultValue="ada@example.com" />
          </Field>
          <Label className="gap-3">
            <Checkbox defaultChecked />
            Product updates
          </Label>
          <Label className="gap-3">
            <Switch defaultChecked />
            Weekly digest
          </Label>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  play: async ({ canvas }) => {
    const save = canvas.getByRole("button", { name: "Save" });
    // The brand tokens reach the components: indigo (hue 277) and --radius 0.75rem → rounded-xl 16px.
    await expect(getComputedStyle(save).backgroundColor).toContain("277");
    await expect(getComputedStyle(save).borderRadius).toBe("16px");
  },
};
