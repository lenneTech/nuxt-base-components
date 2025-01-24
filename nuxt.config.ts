// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  experimental: {
    asyncContext: true,
    renderJsonPayloads: false,
  },

  imports: {
    dirs: ['./dev-components'],
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  compatibilityDate: '2025-01-24',
})