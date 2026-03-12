import type { Meta, StoryObj } from "@storybook/react-vite";
import ErrorMessage from "./ErrorMessage";

const meta = {
  title: "UI/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  args: {
    message: "An error has occurred.",
  },
  argTypes: {
    message: { control: "text" },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomMessage: Story = {
  args: {
    message: "Unable to load weather data.",
  },
};
