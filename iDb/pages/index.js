const dashboard = require('./dashboard')
const moderation = require('./moderation')
const search = require('./search')
const settings = require('./settings')
const legal = require('./legal')
const notifications = require('./notifications')

module.exports = {
  dashboard,
  analytics: {
    appName: 'Knossos',
  },
  index: {
    mainHeader: 'The place for creative software',
    mainHeaderMod: 'projects',
    secondaryHeader:
      'Discover, play, and share creative software content through our open-source platform built for the community.',
    buttons: {
      discover: {
        label: 'Discover projects',
        to: '/mods',
        class: 'brand-button',
      },
      signup: {
        label: 'Sign Up',
        to: '/dashboard/projects',
        type: 'link',
      },
      dashboard: {
        label: 'Go to dashboard',
        to: '/mods',
      },
    },
  },
  legal,
  moderation,
  notifications,
  search,
  settings,
  user: {
    appName: 'Knossos',
    avatarPlaceholderImage: 'https://cdn.modrinth.com/placeholder.png',
  },
}
