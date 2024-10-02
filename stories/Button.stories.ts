import type { Meta, StoryObj } from '@storybook/vue3'
import Button from "~/components/Button.vue";
import {fn} from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const ActionsData = {
  onClick: fn(),
};

/**
 * The 'Button' component is a flexible button component that supports various appearances, sizes, colors, and states.
 *
 * ## Installation
 * ```sh
 * npx @lenne.tech/cli components add Button
 * ```
 */
const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      description: 'The appearance of the button.',
      options: ['regular', 'outline', 'none'],
      control: { type: 'select' },
    },
    size: {
        description: 'The size of the button.',
      options: ['sm', 'md', 'lg', 'auto'],
      control: { type: 'select' },
    },
    color: {
      description: 'The color of the button.',
      options: ['primary', 'secondary', 'green', 'yellow', 'danger'],
      control: { type: 'select' },
    },
    textColor: {
        description: 'The text color of the button.',
      options: ['white', 'black', 'primary', 'gray', ''],
      control: { type: 'select' },
    },
    type: {
        description: 'The type of the button.',
      options: ['submit', 'button'],
      control: { type: 'radio' },
    },
    ...ActionsData,
  },
  args: {
    appearance: 'regular',
    size: "lg",
    type: 'button',
    color: 'primary',
    textColor: '',
    loading: false,
    loadingText: 'Loading',
    block: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=335-3402&t=MaXLMq3XuIrUpe4G-4',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {},
  render(args) {
    return {
      components: {Button},
      setup() {
        return {args};
      },
      template: '<div><Button v-bind="args">Default</Button></div>',
    }
  },
}
