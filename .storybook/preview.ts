import type {Preview} from "@storybook/vue3";
import {themes} from '@storybook/theming';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        docs: {
            theme: themes.dark,
            page: DocumentationTemplate,
        },
        backgrounds: {
            values: [
                {name: 'Dark', value: '#333'},
            ],
            default: 'Dark',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
