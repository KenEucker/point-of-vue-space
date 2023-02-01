import tags from '~/generated/state.json'
import { pages } from '~/iDb'
const { moderation } = pages

export const state = () => ({
  categories: tags.categories,
  loaders: tags.loaders,
  platformVersions: tags.platformVersions,
  donationPlatforms: tags.donationPlatforms,
  reportTypes: tags.reportTypes,
  projectTypes: moderation.projectTypes,
  loaderData: moderation.loaderData,
  projectViewModes: moderation.projectViewModes,
  approvedStatuses: moderation.approvedStatuses,
  rejectedStatuses: moderation.rejectedStatuses,
  staffRoles: moderation.staffRoles,
})
