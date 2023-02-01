module.exports = {
  platformVersionHeading: 'Game versions',
  packageMod: {
    enabled: true,
    description:
      'Package your data pack as a mod. This will create a new version with support for the selected mod loaders. You will be redirected to the new version and can edit it to your liking.',
    loadersHeading: 'Mod loaders',
    loadersDescription:
      'The mod loaders you would like to package your data pack for.',
    buttonText: 'Package as mod',
  },
  enforcePlatformVersion: {
    enabled: true,
    versionNumber: 'Your version must have a version number.',
    versionSupport:
      'Your version must have the supported Minecraft versions selected.',
    versionFile: 'Your version must have a file uploaded.',
    versionLoaders:
      'Your version must have the supported mod loaders selected.',
  },
  supportDependencies: {
    enabled: true,
  },
  supportMetadata: {
    enabled: true,
  },
}
