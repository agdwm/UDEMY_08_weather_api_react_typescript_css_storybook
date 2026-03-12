import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./Switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    screenReaderLabel: "Toggle theme",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    screenReaderLabel: { control: "text" },
    onIcon: { control: "text" },
    offIcon: { control: "text" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveSwitch(args: Story["args"]) {
  const [checked, setChecked] = useState(Boolean(args?.checked));

  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
}

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const On: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    screenReaderLabel: "Disabled toggle",
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
    screenReaderLabel: "Interactive switch",
  },
  render: (args) => <InteractiveSwitch {...args} />,
};
