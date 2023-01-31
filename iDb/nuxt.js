const { getDomain, getApiUrl } = require('./functions')
const { STAGING_ARIADNE_URL } = require('./constants')

module.exports = {
  head: {
    title: 'Modrinth',
  },
  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      hid: 'description',
      name: 'description',
      content:
        'Download Minecraft mods, plugins, datapacks, shaders, resourcepacks, and modpacks on Modrinth. Discover and publish projects on Modrinth with a modern, easy to use interface and API.',
    },
    {
      hid: 'publisher',
      name: 'publisher',
      content: 'Rinth, Inc.',
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Modrinth',
    },
    {
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: 'Modrinth',
    },
    {
      hid: 'theme-color',
      name: 'theme-color',
      content: '#1bd96a',
    },
    {
      hid: 'color-scheme',
      name: 'color-scheme',
      content: 'light dark',
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: 'Modrinth',
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: 'An open source modding platform',
    },
    {
      hid: 'og:type',
      name: 'og:type',
      content: 'website',
    },
    {
      hid: 'og:url',
      name: 'og:url',
      content: 'https://modrinth.com',
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: 'https://cdn.modrinth.com/modrinth-new.png?',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter:site',
      name: 'twitter:site',
      content: '@modrinth',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon-light.ico',
      media: '(prefers-color-scheme:no-preference)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
      media: '(prefers-color-scheme:dark)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon-light.ico',
      media: '(prefers-color-scheme:light)',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn-raw.modrinth.com/fonts/inter/inter.css',
    },
    {
      rel: 'search',
      type: 'application/opensearchdescription+xml',
      href: '/opensearch.xml',
      title: 'Modrinth mods',
    },
  ],
  router: {
    middleware: ['auth', 'analytics'],
  },
  plugins: [
    '~/plugins/vue-tooltip.js',
    '~/plugins/vue-notification.js',
    '~/plugins/xss.js',
    '~/plugins/vue-syntax.js',
    '~/plugins/shorthands.js',
    '~/plugins/markdown.js',
  ],
  ads: {
    // Module options
    ghostMode: true,
    geoEdgeId: '',
  },
  env: {
    owner: process.env.VERCEL_GIT_REPO_OWNER || 'modrinth',
    slug: process.env.VERCEL_GIT_REPO_SLUG || 'knossos',
    branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
    hash: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    domain: getDomain(),
    authURLBase: getApiUrl(),
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    ads: {
      ethicalAds: process.env.ETHICAL_ADS,
    },
    analytics: {
      base_url: process.env.BROWSER_ARIADNE_URL || STAGING_ARIADNE_URL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
      headers: {
        common: {
          'x-ratelimit-key': process.env.RATE_LIMIT_IGNORE_KEY || '',
        },
      },
    },
  },
  headers: {
    userAgent: `Knossos generator (admin@pointofvue.org)`,
  },
  build: {
    tags: [
      { name: 'categories', url: 'category' },
      { name: 'loaders', url: 'loader' },
      { name: 'platformVersions', url: 'game_version' },
      { name: 'donationPlatforms', url: 'donation_platform' },
      { name: 'reportTypes', url: 'report_type' },
    ],
  },
  render: {
    headers: {
      'Modrinth-Admin': process.env.ARIADNE_ADMIN_KEY ?? 'feedbeef',
    },
    viewPostPath: process.env.ARIADNE_URL ?? STAGING_ARIADNE_URL,
  },
}
