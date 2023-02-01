<template>
  <section aria-label="Category filters">
    <div v-for="(categories, header) in categoriesMap" :key="header">
      <h3
        v-if="
          categories.filter((x) => x.project_type === projectType).length > 0
        "
        class="sidebar-menu-heading"
      >
        {{ $formatCategoryHeader(header) }}
      </h3>

      <SearchFilter
        v-for="category in categories.filter(
          (x) => x.project_type === projectType
        )"
        :key="category.name"
        :active-filters="facets"
        :display-name="$formatCategory(category.name)"
        :facet-name="`categories:'${encodeURIComponent(category.name)}'`"
        :icon="header === 'resolutions' ? null : category.icon"
        @toggle="
          $emit(
            'toggleFacet',
            `categories:'${encodeURIComponent(category.name)}'`
          )
        "
      />
    </div>
  </section>
</template>

<script>
import SearchFilter from '~/components/ui/search/SearchFilter'

export default {
  name: 'CategoriesFilter',
  components: {
    SearchFilter,
  },
  props: {
    facets: {
      type: Array,
      default: () => [],
      deep: true,
      sync: true,
    },
    projectType: {
      type: String,
      default: null,
      sync: true,
    },
  },
  emits: ['toggleFacet'],
  computed: {
    categoriesMap() {
      const categories = {}

      for (const category of this.$sortedCategories) {
        if (categories[category.header]) {
          categories[category.header].push(category)
        } else {
          categories[category.header] = [category]
        }
      }

      const newVals = Object.keys(categories).reduce((obj, key) => {
        obj[key] = categories[key]
        return obj
      }, {})

      return newVals
    },
  },
}
</script>
