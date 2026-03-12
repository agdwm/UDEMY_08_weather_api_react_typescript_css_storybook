import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text",
    disabled: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: "Invalid input",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: "Loading…",
  },
};
