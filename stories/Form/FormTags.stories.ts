import type {Meta, StoryObj} from '@storybook/vue3'
import {fn} from "@storybook/test";
import FormTags from "~/components/Form/FormTags.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const ActionsData = {
    onSubmit: fn(),
};

/**
 * The Tags component is a template for integrating tag fields with the VeeValidate library.
 * Tags are saved as an string array.
 *
 * ## Installation
 * ```sh
 * npx @lenne.tech/cli components add Form
 * ```
 */
const meta = {
    title: 'Form/Tags',
    component: FormTags,
    tags: ['autodocs'],
    args: {
        label: "Label",
        disabled: false,
        modelValue: "",
        name: "name",
        placeholder: "Placeholder",
        readOnly: false,
        standalone: false,
        tabindex: "0",
        position: 'top',
        options: undefined,
        useCustomTags: false,
    },
    argTypes: {
        ...ActionsData,
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=335-3402&t=MaXLMq3XuIrUpe4G-4',
        },
    },
} satisfies Meta<typeof FormTags>

export default meta
type Story = StoryObj<typeof FormTags>

export const Top: Story = {
    args: {},
}

export const Bottom: Story = {
    args: {
        position: "bottom",
    },
}

export const FreeTags: Story = {
    args: {
        useCustomTags: true,
    },
}

export const OptionTags: Story = {
    args: {
        options: ['A', 'B', 'C'],
        useCustomTags: false,
    },
}

export const BothTags: Story = {
    args: {
        options: ['A', 'B', 'C'],
        useCustomTags: true,
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        readOnly: true,
    },
}
