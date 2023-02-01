module.exports = {
  appName: 'Modrinth',
  navSettingsLinks: [
    { label: 'General', path: 'settings', icon: 'settings' },
    { label: 'Tags', path: 'settings/tags', icon: 'categories' },
    { label: 'Description', path: 'settings/description', icon: 'description' },
    { label: 'License', path: 'settings/license', icon: 'license' },
    { label: 'Links', path: 'settings/links', icon: 'links' },
    { label: 'Members', path: 'settings/members', icon: 'users' },
  ],
  navRelevantLinks: [
    { label: 'View project', path: '', icon: 'eye' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
    { label: 'Versions', path: 'versions', icon: 'versions' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
    { label: 'Gallery', path: 'gallery', icon: 'gallery' },
  ],
  withheldWarning: {
    description1:
      ' is not viewable in search because it has been found to be in violation of one of',
    split: "Modrinth's content rules",
    splitLink: '/legal/rules',
    description2: 'Modrinth makes no guarantees as to whether ',
    description3: ' is safe for use in a multiplayer context.',
  },
  modpackInformation: {
    docsLink: 'https://docs.modrinth.com/docs/modpacks/playing_modpacks/',
    description1: 'which provides instructions on using',
    split2: 'ATLauncher',
    split2Link: 'https://atlauncher.com/about',
    description2: ',',
    split3: 'MultiMC',
    split3Link: 'https://multimc.org/',
    description3: ', and',
    split4: 'Prism Launcher',
    split4Link: 'https://prismlauncher.org',
  },
  galleryImagePlaceholder: 'https://cdn.modrinth.com/placeholder-banner.svg',
  head: {
    meta: {
      description: {
        content1: ' - Download the Minecraft',
        content2: 'on Modrinth',
      },
      'og:image': {
        content: 'https://cdn.modrinth.com/placeholder.png',
      },
    },
  },
}
