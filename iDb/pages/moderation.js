module.exports = {
  projectTypes: [
    {
      actual: 'mod',
      id: 'mod',
      display: 'template',
    },
    {
      actual: 'mod',
      id: 'plugin',
      display: 'plugin',
    },
    {
      actual: 'mod',
      id: 'datapack',
      display: 'widget',
    },
    {
      actual: 'shader',
      id: 'shader',
      display: 'vue',
    },
  ],
  loaderData: {
    pluginLoaders: ['bukkit', 'spigot', 'paper', 'purpur', 'sponge'],
    pluginPlatformLoaders: ['bungeecord', 'waterfall', 'velocity'],
    allPluginLoaders: [
      'bukkit',
      'spigot',
      'paper',
      'purpur',
      'sponge',
      'bungeecord',
      'waterfall',
      'velocity',
    ],
    dataPackLoaders: ['datapack'],
    modLoaders: ['forge', 'fabric', 'quilt', 'liteloader', 'modloader', 'rift'],
  },
  projectViewModes: ['list', 'grid', 'gallery'],
  approvedStatuses: ['approved', 'archived', 'unlisted', 'private'],
  rejectedStatuses: ['rejected', 'withheld'],
  staffRoles: ['moderator', 'admin'],
  appName: 'Knossos',
}
