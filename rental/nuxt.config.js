export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RentHere',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/renthere.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue2-google-maps.js', mode: 'client' },
    { src: '~/plugins/vue-particle.js', mode: 'client' },
    { src: '~/plugins/snap.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxt/image',
  ],

  image: {
    domains: ['images.pexels.com'],
    alias: {
      pexels: 'https://images.pexels.com',
    }
  },

  fontawesome: {
    component: 'Fa',
    suffix: false,
    icons: {
      solid: true,
      brands: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/image',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    redirect: {
      login: '/redirect',
      logout: '/',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post',
            propertyName: 'data.accessToken'
          },
          user: {
            url: '/me',
            method: 'get',
            propertyName: 'data'
          },
          logout: false,
        }
      },
      token: {
        property: 'data.accessToken',
        global: true,
      }
    }
  },

  env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    baseUrl: process.env.BASE_URL,
    midtransClientKey: process.env.MIDTRANS_CLIENT_KEY
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/error.vue')
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
