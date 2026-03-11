import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'article', 'section'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content goes here',
  },
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    children: 'Rendered as an <article> element',
  },
}
