import type { Meta, StoryObj } from "@storybook/react-vite";
import Label from "./Label";

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Label text",
  },
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Custom label text",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
