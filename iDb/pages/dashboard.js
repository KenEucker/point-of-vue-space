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
}
