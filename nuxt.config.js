import serveStatic from 'serve-static'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'koa-blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'view-design/dist/styles/iview.css',
    "@/assets/css/resets.css",
    '@/assets/css/view_resets.css',
    '@/assets/css/theme_color.css',
    '@/assets/css/common.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/view-ui',
    { src: '@/plugins/localStorage', ssr: false },
    { src: '~/plugins/axios-interceptor', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    credentials: true,
  },

  // 路由中间件
  router: {
    middleware: [ 'auth' ]
  },

  serverMiddleware: [
    { path: '/api',  handler: '~/server/index.js'},
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
