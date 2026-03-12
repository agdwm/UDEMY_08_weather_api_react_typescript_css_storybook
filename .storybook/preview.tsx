import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";
import { I18nProvider } from "../src/lib/i18n-provider";

import type { Decorator } from "@storybook/react";

const withI18n: Decorator = (Story, context) => (
  <I18nProvider>{Story(context)}</I18nProvider>
);

const preview: Preview = {
  decorators: [withI18n],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
