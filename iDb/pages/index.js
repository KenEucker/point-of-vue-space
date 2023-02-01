const dashboard = require('./dashboard')
const moderation = require('./moderation')
const search = require('./search')

module.exports = {
  dashboard,
  index: {
    mainHeader: 'The place for Minecraft',
    mainHeaderMod: 'mods',
    secondaryHeader:
      'Discover, play, and share Minecraft content through our open-source platform built for the community.',
    buttons: {
      discover: { label: 'Discover mods', to: '/mods', class: 'brand-button' },
      signup: {
        label: '',
        to: '/dashboard/projects',
        type: 'link',
      },
      dashboard: {
        label: 'Go to dashboard',
        to: '/mods',
      },
    },
  },
  moderation,
  search,
}
