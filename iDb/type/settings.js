module.exports = {
  description: {
    description1:
      'You can type an extended description of your mod here. This editor supports',
    split: 'Markdown',
    splitLink: 'https://guides.github.com/features/mastering-markdown/',
    description2:
      'HTML can also be used inside your description, not including styles, scripts, and iframes (though YouTube iframes are allowed).',
  },
  subdescription: {
    description1:
      'The description must clearly and honestly describe the purpose and function of the project. See section 2.1 of the',
    split: 'Content Rules',
    splitLink: '/legal/rules',
    description2: 'for the full requirements.',
  },
  projectVisibility:
    'Set the visibility of your project. Listed and archived projects are visible in search. Unlisted projects are published, but not visible in search or on user profiles. Private projects are only accessible by members of the project.',
  defaultProjectUrl: 'https://modrinth.com/mod/',
  clientSideField: {
    enabled: true,
    description1: 'Select based on if the',
    description2:
      " has functionality on the client side. Just because a mod works in Singleplayer doesn't mean it has actual client-side functionality.",
  },
  serverSideField: {
    enabled: true,
    description1: 'Select based on if the',
    description2:
      ' has functionality on the <strong>logical</strong> server. Remember that Singleplayer contains an integrated server.',
  },
  projectDelete:
    "Removes your project from Knossos's servers and search. Clicking on this will delete your project, so be extra careful!",
  license: {
    description1: 'It is very important to choose a proper license for your',
    preSplit: 'Enter a valid ',
    split: 'SPDX license identifier',
    splitLink: '/legal/rules',
    postSplit:
      ' in the marked area. If your license does not have a SPDX identifier (for example, if you created the license yourself or if the license is Minecraft-specific), simply check the box and enter the name of the license instead.',
    description2:
      '. You may choose one from our list or provide a custom license. You may also provide a custom URL to your chosen license; otherwise, the license text will be displayed.',
    licensingGuideLink: 'https://blog.modrinth.com/licensing-guide/',
  },
  members: {
    description:
      "Enter the Knossos username of the person you'd like to invite to be a member of this project.",
    monetization: {
      enabled: true,
    },
  },
}
