import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import {HstNuxt} from "@histoire/plugin-nuxt";
import { defaultColors } from 'histoire'

export default defineConfig({
    theme: {
        title: 'Nuxt base components',
        defaultColorScheme: 'dark',
        hideColorSchemeSwitch: true,
        storeColorScheme: false,
        colors: {
            gray: defaultColors.zinc,
            primary: defaultColors.cyan
        }
    },
    plugins: [
        HstVue(),
        HstNuxt(),
    ],
})