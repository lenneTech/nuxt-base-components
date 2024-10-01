import type { Meta, StoryObj } from '@storybook/vue3'
import Button from "~/components/Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: "click" },
  },
  parameters: {
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=335-3402&t=MaXLMq3XuIrUpe4G-4',
    // },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args">Ich bin ein button</Button>',
    }),
  args: {
    appearance: 'regular',
    size: 'md',
    type: 'button',
    color: 'primary',
    textColor: '',
    loading: true,
    loadingText: 'Loading',
    block: false,
  },
}
