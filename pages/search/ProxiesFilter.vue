<template>
  <section
    v-if="projectTypeId === 'plugin'"
    aria-label="Platform loader filters"
  >
    <h3
      v-if="
        $tag.loaders.filter((x) =>
          x.supported_project_types.includes(projectTypeActual)
        ).length > 0
      "
      class="sidebar-menu-heading"
    >
      Proxies
    </h3>
    <SearchFilter
      v-for="loader in $tag.loaders.filter((x) =>
        $tag.loaderData.pluginPlatformLoaders.includes(x.name)
      )"
      :key="loader.name"
      :active-filters="orFacets"
      :display-name="$formatCategory(loader.name)"
      :facet-name="`categories:'${encodeURIComponent(loader.name)}'`"
      :icon="loader.icon"
      @toggle="
        $emit(
          'toggleOrFacet',
          `categories:'${encodeURIComponent(loader.name)}'`
        )
      "
    />
  </section>
</template>

<script>
import SearchFilter from '~/components/ui/search/SearchFilter'

export default {
  name: 'ProxiesFilter',
  components: {
    SearchFilter,
  },
  props: {
    orFacets: {
      type: Array,
      default: () => [],
      deep: true,
      sync: true,
    },
    projectTypeId: {
      type: String,
      default: null,
    },
    projectTypeActual: {
      type: String,
      default: null,
    },
  },
  emits: ['toggleFacet'],
}
</script>
