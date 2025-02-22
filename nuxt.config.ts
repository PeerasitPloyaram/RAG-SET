// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      typhon_api: process.env.TYPHOON_API,
      api_path: process.env.BACKEND_API_PATH
    }
  },
  css: [
    './assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  plugins: [
    '@/plugins/websocket.client.js',
    "@/plugins/bus",
    "@/plugins/client-id.js"
  ]
})
