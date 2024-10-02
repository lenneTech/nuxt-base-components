import type { Meta, StoryObj } from '@storybook/vue3'
import FormInput from "~/components/Form/FormInput.vue";
import {fn} from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const ActionsData = {
  onSubmit: fn(),
};

/**
 * The Input component is a template for integrating input fields with the VeeValidate library.
 *
 * ## Installation
 * ```sh
 * npx @lenne.tech/cli components add Form
 * ```
 */
const meta = {
  title: 'Form/Input',
  component: FormInput,
  tags: ['autodocs'],
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
  argTypes: {
    type: {
      options: ['text', 'number', 'email', 'phone'],
      control: { type: 'select' },
    },
    ...ActionsData,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=335-3402&t=MaXLMq3XuIrUpe4G-4',
    },
  },
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof FormInput>

export const Text: Story = {
  args: {
    type: "text",
  },
}

export const Number: Story = {
  args: {
    label: "Number",
    type: "number",
  },
}

export const Email: Story = {
  args: {
    label: "Email",
    name: "email",
    placeholder: "Enter your Email",
    type: "email",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    readOnly: true,
  },
}
