module.exports = {
  dashboard: {
    navLinks: [
      { label: 'Overview', path: 'dashboard', icon: 'dashboard' },
      { label: 'Projects', path: 'dashboard/projects', icon: 'list' },
      {
        label: 'Analytics',
        path: 'dashboard/analytics',
        icon: 'chart',
        condition: 'analytics',
      },
      {
        label: 'Revenue',
        path: 'dashboard/revenue',
        icon: 'currency',
        condition: 'monetization',
      },
    ],
  },
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
  legal: {},
  moderation: {},
  notifications: {},
  search: {},
  settings: {},
  toad: {},
}
