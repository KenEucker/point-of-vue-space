<template>
  <section
    v-if="projectTypeId !== 'resourcepack' && projectTypeId !== 'datapack'"
    aria-label="Loader filters"
  >
    <h3
      v-if="
        $tag.loaders.filter((x) =>
          x.supported_project_types.includes(projectTypeActual)
        ).length > 0
      "
      class="sidebar-menu-heading"
    >
      Loaders
    </h3>
    <SearchFilter
      v-for="loader in $tag.loaders.filter((x) => {
        if (
          projectTypeId === 'mod' &&
          !showAllLoaders &&
          x.name !== 'forge' &&
          x.name !== 'fabric' &&
          x.name !== 'quilt'
        ) {
          return false
        } else if (projectTypeId === 'mod' && showAllLoaders) {
          return $tag.loaderData.modLoaders.includes(x.name)
        } else if (projectTypeId === 'plugin') {
          return $tag.loaderData.pluginLoaders.includes(x.name)
        } else if (projectTypeId === 'datapack') {
          return $tag.loaderData.dataPackLoaders.includes(x.name)
        } else {
          return x.supported_project_types.includes(projectTypeActual)
        }
      })"
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
    <Checkbox
      v-if="projectTypeId === 'mod'"
      v-model="showAllLoaders"
      :label="showAllLoaders ? 'Less' : 'More'"
      description="Show all loaders"
      style="margin-bottom: 0.5rem"
      :border="false"
      :collapsing-toggle-style="true"
    />
  </section>
</template>

<script>
import Checkbox from '~/components/ui/Checkbox'
import SearchFilter from '~/components/ui/search/SearchFilter'

export default {
  name: 'LoadersFilter',
  components: {
    SearchFilter,
    Checkbox,
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
  emits: ['toggleOrFacet'],
  data() {
    return {
      showAllLoaders: false,
    }
  },
  computed: {},
}
</script>
