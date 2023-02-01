<template>
  <section
    v-if="
      !['resourcepack', 'plugin', 'shader', 'datapack'].includes(projectType)
    "
    aria-label="Environment filters"
  >
    <h3 class="sidebar-menu-heading">Environments</h3>
    <SearchFilter
      :active-filters="selectedEnvironments"
      display-name="Client"
      facet-name="client"
      @toggle="$emit('toggleEnv')"
    >
      <ClientIcon aria-hidden="true" />
    </SearchFilter>
    <SearchFilter
      :active-filters="selectedEnvironments"
      display-name="Server"
      facet-name="server"
      @toggle="$emit('toggleEnv')"
    >
      <ServerIcon aria-hidden="true" />
    </SearchFilter>
  </section>
</template>

<script>
import SearchFilter from '~/components/ui/search/SearchFilter'
import ClientIcon from '~/assets/images/categories/client.svg?inline'
import ServerIcon from '~/assets/images/categories/server.svg?inline'

export default {
  name: 'EnvironmentsFilter',
  components: {
    ClientIcon,
    SearchFilter,
    ServerIcon,
  },
  props: {
    selectedEnvironments: {
      type: Array,
      default: () => [],
      deep: true,
      sync: true,
    },
    projectType: {
      type: String,
      default: null,
    },
  },
  emits: ['toggleEnv'],
}
</script>
