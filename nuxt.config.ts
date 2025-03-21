// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/main_logo.png' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      api_front_path: process.env.FRONTEND_API_PATH,
      api_path: process.env.BACKEND_API_PATH,
      api_websocket: process.env.BACKEND_WEB_SOCKET_API_PATH
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
  ]
})
