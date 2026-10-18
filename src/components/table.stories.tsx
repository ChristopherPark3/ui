import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { Badge } from "./badge.js";
import { Checkbox } from "./checkbox.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js";

const meta = {
  title: "Components/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: "INV-001", status: "Paid", method: "Card", amount: 250 },
  { id: "INV-002", status: "Pending", method: "Bank transfer", amount: 150 },
  { id: "INV-003", status: "Unpaid", method: "Card", amount: 350 },
  { id: "INV-004", status: "Paid", method: "PayPal", amount: 450 },
];

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge variant={invoice.status === "Unpaid" ? "destructive" : invoice.status === "Paid" ? "secondary" : "outline"}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right tabular-nums">{usd.format(invoice.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {usd.format(invoices.reduce((sum, invoice) => sum + invoice.amount, 0))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  play: async ({ canvas }) => {
    const table = canvas.getByRole("table", { name: "Recent invoices." });
    await expect(table).toBeVisible();
    await expect(canvas.getAllByRole("row")).toHaveLength(invoices.length + 2);
    await expect(canvas.getByRole("cell", { name: "$1,200.00" })).toBeVisible();
  },
};

/** Selection state lives in the app; mark selected rows with `data-selected`. */
export const Selectable: Story = {
  render: function Render(args) {
    const [selected, setSelected] = React.useState<string[]>(["INV-002"]);
    const all = selected.length === invoices.length;
    return (
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                aria-label="Select all"
                checked={all}
                indeterminate={!all && selected.length > 0}
                onCheckedChange={(checked) => setSelected(checked ? invoices.map((invoice) => invoice.id) : [])}
              />
            </TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const isSelected = selected.includes(invoice.id);
            return (
              <TableRow key={invoice.id} data-selected={isSelected ? "" : undefined}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${invoice.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      setSelected((current) =>
                        checked ? [...current, invoice.id] : current.filter((id) => id !== invoice.id),
                      )
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell className="text-right tabular-nums">{usd.format(invoice.amount)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("checkbox", { name: "Select all" }));
    for (const invoice of invoices) {
      await expect(canvas.getByRole("checkbox", { name: `Select ${invoice.id}` })).toBeChecked();
    }
    await expect(canvas.getByRole("cell", { name: "INV-001" }).closest("tr")).toHaveAttribute("data-selected");
  },
};
