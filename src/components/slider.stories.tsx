import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Slider, SliderLabel, SliderValue } from "./slider.js";

const meta = {
  title: "Components/Slider",
  component: Slider,
  args: { defaultValue: 50, onValueChange: fn() },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
  render: (args) => (
    <Slider {...args}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValue />
    </Slider>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const thumb = canvas.getByRole("slider", { name: "Volume" });
    await userEvent.click(thumb);
    await userEvent.keyboard("{ArrowRight}");
    await expect(thumb).toHaveAttribute("aria-valuenow", "51");
    await expect(args.onValueChange).toHaveBeenCalled();
  },
};

export const Range: Story = {
  args: { defaultValue: [20, 80], thumbLabels: ["Minimum price", "Maximum price"] },
  render: (args) => (
    <Slider {...args}>
      <SliderLabel>Price range</SliderLabel>
      <SliderValue />
    </Slider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("slider", { name: "Minimum price" })).toHaveAttribute("aria-valuenow", "20");
    await expect(canvas.getByRole("slider", { name: "Maximum price" })).toHaveAttribute("aria-valuenow", "80");
  },
};

/** No visible label: name the thumb with `thumbLabels`. */
export const WithoutLabel: Story = {
  args: { thumbLabels: ["Brightness"] },
  render: (args) => <Slider {...args} />,
};

export const Vertical: Story = {
  args: { orientation: "vertical", thumbLabels: ["Volume"] },
  render: (args) => (
    <div className="h-48">
      <Slider {...args} />
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
