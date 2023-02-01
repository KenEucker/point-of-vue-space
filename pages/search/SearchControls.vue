<template>
  <div class="card search-controls">
    <div class="search-filter-container">
      <button
        class="iconified-button sidebar-menu-close-button"
        :class="{ open: sidebarMenuOpen }"
        @click="sidebarMenuOpen = !sidebarMenuOpen"
      >
        <FilterIcon aria-hidden="true" />
        Filters...
      </button>
      <div class="iconified-input">
        <label class="hidden" for="search">Search</label>
        <SearchIcon aria-hidden="true" />
        <input
          id="search"
          v-model="query"
          type="search"
          name="search"
          :placeholder="`Search ${projectTypeDisplay}s...`"
          autocomplete="off"
          @input="$emit('onSearchChange', 1)"
        />
      </div>
    </div>
    <div class="sort-controls">
      <div class="labeled-control">
        <span class="labeled-control__label">Sort by</span>
        <Multiselect
          v-model="sortType"
          placeholder="Select one"
          class="search-controls__sorting labeled-control__control"
          track-by="display"
          label="display"
          :options="sortTypes"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          @input="$emit('onSearchChange', 1)"
        >
          <template slot="singleLabel" slot-scope="{ option }">{{
            option.display
          }}</template>
        </Multiselect>
      </div>
      <div class="labeled-control">
        <span class="labeled-control__label">Show per page</span>
        <Multiselect
          v-model="maxResults"
          placeholder="Select one"
          class="labeled-control__control"
          :options="
            maxResultsForView[$cosmetics.searchDisplayMode[projectTypeId]]
          "
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
          @input="$emit('onMaxResultsChange', currentPage)"
        />
      </div>
      <button
        v-tooltip="
          $capitalizeString($cosmetics.searchDisplayMode[projectTypeId]) +
          ' view'
        "
        :aria-label="
          $capitalizeString($cosmetics.searchDisplayMode[projectTypeId]) +
          ' view'
        "
        class="square-button"
        @click="$emit('cycleSearchDisplayMode')"
      >
        <GridIcon
          v-if="$cosmetics.searchDisplayMode[projectTypeId] === 'grid'"
        />
        <ImageIcon
          v-else-if="$cosmetics.searchDisplayMode[projectTypeId] === 'gallery'"
        />
        <ListIcon v-else />
      </button>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import SearchIcon from '~/assets/images/utils/search.svg?inline'
import FilterIcon from '~/assets/images/utils/filter.svg?inline'
import GridIcon from '~/assets/images/utils/grid.svg?inline'
import ListIcon from '~/assets/images/utils/list.svg?inline'
import ImageIcon from '~/assets/images/utils/image.svg?inline'

export default {
  name: 'ModrinthNotice',
  components: {
    Multiselect,
    SearchIcon,
    FilterIcon,
    GridIcon,
    ListIcon,
    ImageIcon,
  },
  props: {
    projectTypeId: {
      type: String,
      default: null,
      sync: true,
    },
    projectTypeDisplay: {
      type: String,
      default: null,
      sync: true,
    },
    notice: {
      type: String,
      default: null,
      sync: true,
    },
    sort: {
      type: String,
      default: null,
      sync: true,
    },
    queryString: {
      type: String,
      default: null,
      sync: true,
    },
    sortTypes: {
      type: Array,
      default: () => [],
      sync: true,
    },
    maxResultsForView: {
      type: Object,
      default: () => ({
        list: [5, 10, 15, 20, 50, 100],
        grid: [6, 12, 18, 24, 48, 96],
        gallery: [6, 10, 16, 20, 50, 100],
      }),
      sync: true,
    },
  },
  emits: [
    'sidebarMenuOpen',
    'maxResults',
    'onSearchChange',
    'onMaxResultsChange',
    'cycleSearchDisplayMode',
    'setSortType',
    'setQuery',
  ],
  data() {
    return {
      sidebarIsOpen: false,
      maxNumberOfResults: 1,
    }
  },
  computed: {
    sidebarMenuOpen: {
      get() {
        return this.sidebarIsOpen
      },
      set(v) {
        this.$emit('sidebarMenuOpen', v)
      },
    },
    maxResults: {
      get() {
        return this.maxNumberOfResults
      },
      set(v) {
        this.$emit('maxResults', v)
      },
    },
    sortType: {
      get() {
        return this.sort
      },
      set(v) {
        this.$emit('setSortType', v)
      },
    },
    query: {
      get() {
        return this.queryString
      },
      set(v) {
        this.$emit('setQuery', v)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.search-controls {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-card-md);
  flex-wrap: wrap;
  padding: var(--spacing-card-md);
  grid-row: 2;

  .search-filter-container {
    display: flex;
    width: 100%;
    align-items: center;

    .sidebar-menu-close-button {
      max-height: none;
      // match height of the search field
      height: 40px;
      transition: box-shadow 0.1s ease-in-out;
      margin-right: var(--spacing-card-md);

      &.open {
        color: var(--color-button-text-active);
        background-color: var(--color-brand-highlight);
        box-shadow: inset 0 0 0 transparent, 0 0 0 2px var(--color-brand);
      }
    }

    .iconified-input {
      flex: 1;

      input {
        width: 100%;
        margin: 0;
      }
    }
  }

  .sort-controls {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-card-md);
    flex-wrap: wrap;
    align-items: center;

    .labeled-control {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      .labeled-control__label {
        white-space: nowrap;
      }
    }

    .square-button {
      margin-top: auto;
      margin-bottom: 0.25rem;
    }
  }
}

.search-controls__sorting {
  min-width: 14rem;
}

.labeled-control__label,
.labeled-control__control {
  display: block;
}

@media screen and (min-width: 750px) {
  .search-controls {
    flex-wrap: nowrap;
    flex-direction: row;
  }

  .sort-controls {
    min-width: fit-content;
    max-width: fit-content;
    flex-wrap: nowrap;
  }

  .labeled-control {
    align-items: center;
    display: flex;
    flex-direction: column !important;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: fit-content;
  }

  .labeled-control__label {
    flex-shrink: 0;
    margin-bottom: 0 !important;
  }
}

@media screen and (min-width: 860px) {
  .labeled-control {
    flex-wrap: nowrap !important;
    flex-direction: row !important;
  }
}

@media screen and (min-width: 1024px) {
  .sidebar-menu-close-button {
    display: none;
  }

  .labeled-control {
    flex-wrap: wrap !important;
    flex-direction: column !important;
  }
}

@media screen and (min-width: 1100px) {
  .labeled-control {
    flex-wrap: nowrap !important;
    flex-direction: row !important;
  }
}
</style>
