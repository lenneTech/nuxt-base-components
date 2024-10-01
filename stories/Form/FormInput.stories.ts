import type { Meta, StoryObj } from '@storybook/vue3'

import FormInput from "~/components/Form/FormInput.vue";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
  title: 'Form/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    submit: { action: "onSubmitted" },
  },
  parameters: {
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=335-3402&t=MaXLMq3XuIrUpe4G-4',
    // },
  },
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof FormInput>

export const FormInputStory: Story = {
  args: {
    label: "Label",
    autocomplete: "off",
    disabled: false,
    keySubmit: true,
    modelValue: "",
    name: "name",
    placeholder: "Placeholder",
    readOnly: false,
    standalone: false,
    tabindex: 0,
    type: "text",
  },
}
