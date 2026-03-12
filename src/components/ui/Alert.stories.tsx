import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "./Alert";
import Loading from "./Loading";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "info",
    title: "Info",
    children: "This is an info message.",
    onDismiss: () => {},
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: { control: "text" },
    children: { control: "text" },
    onDismiss: { action: "dismissed" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Información",
    children: "Este es un mensaje informativo.",
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "The operation was successful.",
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "There is something you should check.",
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "An error has occurred.",
    onDismiss: () => {},
  },
};

// Example of a non-dismissible alert (no close button)
export const NotDismissible: Story = {
  args: {
    variant: "info",
    title: "Not dismissible",
    children: "This alert does not have a close button.",
    onDismiss: undefined,
  },
};

export const WithLongContent: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children:
      "This is a long alert message. You can use this component to display long or formatted messages.",
  },
};

// Story para el componente Loading
export const LoadingMessage = {
  render: (args: React.ComponentProps<typeof Loading>) => <Loading {...args} />,
  args: {
    message: "Cargando información...",
  },
  name: "Loading",
};
