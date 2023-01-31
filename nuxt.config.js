import { promises as fs } from 'fs'
import { sortRoutes } from '@nuxt/utils'
import axios from 'axios'
import iDb from './iDb'

const { getApiUrl, getDomain } = iDb.nuxt

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: iDb.nuxt.head.title,
    meta: iDb.nuxt.head.meta,
    link: iDb.nuxt.head.link,
  },

  vue: {
    config: {
      devtools: true,
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(
        routes.findIndex((x) => x.name === 'search'),
        1
      )

      routes.push({
        path: '/search',
        component: resolve(__dirname, 'pages/search.vue'),
        name: 'search',
        chunkName: 'pages/search',
        children: [
          {
            path: '/mods',
            component: resolve(__dirname, 'pages/search/mods.vue'),
            name: 'mods',
          },
          {
            path: '/modpacks',
            component: resolve(__dirname, 'pages/search/modpacks.vue'),
            name: 'modpacks',
          },
          {
            path: '/plugins',
            component: resolve(__dirname, 'pages/search/plugins.vue'),
            name: 'plugins',
          },
          {
            path: '/resourcepacks',
            component: resolve(__dirname, 'pages/search/resourcepacks.vue'),
            name: 'resourcepacks',
          },
          {
            path: '/shaders',
            component: resolve(__dirname, 'pages/search/shaders.vue'),
            name: 'shaders',
          },
          {
            path: '/datapacks',
            component: resolve(__dirname, 'pages/search/datapacks.vue'),
            name: 'datapacks',
          },
        ],
      })

      sortRoutes(routes)
    },
    middleware: iDb.nuxt.router.middleware,
  },
  /*
   ** Global CSS
   */
  css: ['~assets/styles/global.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: iDb.nuxt.plugins,
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],
  ads: iDb.nuxt.ads,
  robots: {
    Sitemap: 'https://modrinth.com/sitemap.xml',
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: getApiUrl(),
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vue-tooltip', 'vue-notification'],
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // 👈 add this line
      },
    },
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  },
  loading: {
    color: '#1bd96a',
    height: '2px',
  },
  env: iDb.nuxt.env,
  publicRuntimeConfig: iDb.nuxt.publicRuntimeConfig,
  privateRuntimeConfig: iDb.nuxt.privateRuntimeConfig,
  hooks: {
    build: {
      async before(nuxt, buildOptions) {
        // 30 minutes
        const TTL = 30 * 60 * 1000

        let state = {}
        try {
          state = JSON.parse(
            await fs.readFile('./generated/state.json', 'utf8')
          )
        } catch {
          // File doesn't exist, create folder
          await fs.mkdir('./generated', { recursive: true })
        }

        const API_URL = getApiUrl()

        if (
          // Skip regeneration if within TTL...
          state.lastGenerated &&
          new Date(state.lastGenerated).getTime() + TTL >
          new Date().getTime() &&
          // ...but only if the API URL is the same
          state.apiUrl &&
          state.apiUrl === API_URL
        ) {
          return
        }

        console.log('Generating tags...')

        state.lastGenerated = new Date().toISOString()

        state.apiUrl = API_URL

        const headers = {
          headers: {
            'user-agent': iDb.nuxt.headers.userAgent,
          },
        }

        if (iDb.nuxt.build?.tags?.length) {
          for (let i = 0; i < iDb.nuxt.build.tags.length; ++i) {
            const tag = iDb.nuxt.build.tags[i]
            const response = await axios.get(
              `${API_URL}tag/${tag.url}`,
              headers
            )
            if (response?.data) {
              state[tag.name] = response.data
            }
          }

          await fs.writeFile('./generated/state.json', JSON.stringify(state))
        }

        console.log('Tags generated!')
      },
    },
    render: {
      routeDone(url, result, context) {
        setTimeout(() => {
          if (process.env.NODE_ENV !== 'production') return
          axios
            .post(
              `${iDb.nuxt.render.viewPostPath}view`,
              {
                url: getDomain() + url,
              },
              {
                headers: {
                  ...iDb.nuxt.render.headers,
                  'User-Agent':
                    context.req.rawHeaders[
                    context.req.rawHeaders.findIndex(
                      (x) => x === 'User-Agent'
                    ) + 1
                    ],
                },
              }
            )
            .then(() => { })
            .catch((e) => {
              console.error(
                'An error occurred while registering the visit: ',
                e
              )
            })
        })
      },
    },
  },
}
