import type {Meta, StoryObj} from '@storybook/vue3'
import {fn} from "@storybook/test";
import FormSelect from "~/components/Form/FormSelect.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const ActionsData = {
    onSubmit: fn(),
};

/**
 * The Select component is a template for integrating selection fields with the VeeValidate library.
 *
 *
 * ## Installation
 * ```sh
 * npx @lenne.tech/cli components add Form
 * ```
 */
const meta = {
    title: 'Form/Select',
    component: FormSelect,
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
        searchable: false,
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
} satisfies Meta<typeof FormSelect>

export default meta
type Story = StoryObj<typeof FormSelect>

export const Default: Story = {
    args: {
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}],
    },
}

export const Searchable: Story = {
    args: {
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}],
        searchable: true
    },
}

export const Disabled: Story = {
    args: {
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}, {label: 'C', value: 'c'}],
        disabled: true,
        readOnly: true,
    },
}
