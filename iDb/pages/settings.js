module.exports = {
  appName: 'Knossos',
  discordLink: 'https://discord.gg/EUHuJHt',
  head: {
    meta: {
      'og:url': {
        content: 'https://modrinth.com/legal/privacy',
      },
    },
  },

  navLinks: [{ label: 'User settings', path: 'settings', icon: 'settings' }],
  authedNavLinks: [
    { label: 'Account', path: 'settings/account', icon: 'user' },
    { label: 'Followed projects', path: 'settings/follows', icon: 'heart' },
    { label: 'Monetization', path: 'settings/monetization', icon: 'currency' },
  ],
}
