<template>
  <div
    :class="{
      'search-page': true,
      'normal-page': true,
      'alt-layout': $cosmetics.searchLayout,
    }"
  >
    <aside
      :class="{
        'normal-page__sidebar': true,
        open: sidebarMenuOpen,
      }"
      aria-label="Filters"
    >
      <section class="card filters-card" role="presentation">
        <div
          class="sidebar-menu"
          :class="{ 'sidebar-menu_open': sidebarMenuOpen }"
        >
          <button
            :disabled="
              onlyOpenSource === false &&
              selectedEnvironments.length === 0 &&
              selectedVersions.length === 0 &&
              facets.length === 0 &&
              orFacets.length === 0
            "
            class="iconified-button"
            @click="clearFilters"
          >
            <ClearIcon aria-hidden="true" />
            Clear filters
          </button>

          <CategoriesFilter
            :facets="facets"
            :project-type="projectType.actual"
            @toggleFacet="toggleFacet"
          />

          <LoadersFilter
            :or-facets="orFacets"
            :project-type-actual="projectType.actual"
            :project-type-id="projectType.id"
            @toggleOrFacet="toggleOrFacet"
          />

          <ProxiesFilter
            :or-facets="orFacets"
            :project-type-actual="projectType.actual"
            :project-type-id="projectType.id"
            @toggleOrFacet="toggleOrFacet"
          />

          <EnvironmentsFilter
            :selected-environments="selectedEnvironments"
            :project-type="projectType.id"
            @toggleEnv="toggleEnv"
          />

          <VersionsFilter
            :open-source="onlyOpenSource"
            :versions="selectedVersions"
            :snapshots="showSnapshots"
            @showSnapshots="setShowSnapshots"
            @onlyOpenSource="setOnlyOpenSource"
            @selectedVersions="setSelectedVersions"
            @onSearchChange="onSearchChange"
          />
        </div>
      </section>
    </aside>
    <section class="normal-page__content">
      <ProjectKnotice
        :notice="iDb.modpacksAlphaNotice"
        :project-type="projectType.id"
      />
      <Advertisement
        v-if="iDb.showAdvertisement"
        type="banner"
        small-screen="square"
      />
      <SearchControls
        :project-type-id="projectType.id"
        :project-type-display="projectType.display"
        :max-num-results="maxResults"
        :max-results-for-view="maxResultsForView"
        :sort-types="sortTypes"
        :sort="sortType"
        :query-string="query"
        @setQuery="setQuery"
        @setSortType="setSortType"
        @onSearchChange="onSearchChange"
        @maxResults="setMaxResults"
        @onMaxResultsChange="onMaxResultsChange"
        @sidebarMenuOpen="setSidebarMenuOpen"
        @cycleSearchDisplayMode="cycleSearchDisplayMode"
      />
      <pagination
        :page="currentPage"
        :count="pageCount"
        :link-function="(x) => getSearchUrl(x <= 1 ? 0 : (x - 1) * maxResults)"
        class="pagination-before"
        @switch-page="onSearchChange"
      ></pagination>
      <div class="search-results-container">
        <div v-if="isLoading" class="no-results">
          <BrandLogoAnimated aria-hidden="true" />
          <p>Loading...</p>
        </div>
        <div
          v-else-if="true"
          id="search-results"
          class="project-list"
          :class="
            'display-mode--' + $cosmetics.searchDisplayMode[projectType.id]
          "
          role="list"
          aria-label="Search results"
        >
          <ProjectCard
            v-for="result in results"
            :id="result.slug ? result.slug : result.project_id"
            :key="result.project_id"
            :display="$cosmetics.searchDisplayMode[projectType.id]"
            :featured-image="
              result.featured_gallery
                ? result.featured_gallery
                : result.gallery[0]
            "
            :type="result.project_type"
            :author="result.author"
            :name="result.title"
            :description="result.description"
            :created-at="result.date_created"
            :updated-at="result.date_modified"
            :downloads="result.downloads.toString()"
            :follows="result.follows.toString()"
            :icon-url="result.icon_url"
            :client-side="result.client_side"
            :server-side="result.server_side"
            :categories="result.display_categories"
            :search="true"
            :show-updated-date="sortType.name !== 'newest'"
            :hide-loaders="
              ['resourcepack', 'datapack'].includes(projectType.id)
            "
            :color="result.color"
          />
          <div v-if="results && results.length === 0" class="no-results">
            <p>No results found for your query!</p>
          </div>
        </div>
      </div>
      <pagination
        :page="currentPage"
        :count="pageCount"
        :link-function="(x) => getSearchUrl(x <= 1 ? 0 : (x - 1) * maxResults)"
        class="pagination-after"
        @switch-page="onSearchChangeToTop"
      ></pagination>
    </section>
  </div>
</template>

<script>
import CategoriesFilter from '~/components/pages/search/CategoriesFilter'
import LoadersFilter from '~/components/pages/search/LoadersFilter'
import ProxiesFilter from '~/components/pages/search/ProxiesFilter'
import EnvironmentsFilter from '~/components/pages/search/EnvironmentsFilter'
import VersionsFilter from '~/components/pages/search/VersionsFilter'
import ProjectKnotice from '~/components/pages/search/ProjectKnotice'
import SearchControls from '~/components/pages/search/SearchControls'

import ProjectCard from '~/components/ui/ProjectCard'
import Pagination from '~/components/ui/Pagination'
import ClearIcon from '~/assets/images/utils/clear.svg?inline'

import iDb from '~/iDb/pages/search'

import Advertisement from '~/components/ads/Advertisement'

export default {
  auth: false,
  components: {
    Advertisement,
    CategoriesFilter,
    LoadersFilter,
    ProxiesFilter,
    EnvironmentsFilter,
    VersionsFilter,
    SearchControls,
    ProjectKnotice,
    ProjectCard,
    Pagination,
    ClearIcon,
  },
  data() {
    return {
      iDb,

      query: '',

      onlyOpenSource: false,

      showSnapshots: false,
      selectedVersions: [],

      selectedEnvironments: [],

      facets: [],
      orFacets: [],
      results: null,
      pageCount: 1,
      currentPage: 1,

      projectType: { id: 'mod', display: 'mod', actual: 'mod' },

      sortTypes: [
        { display: 'Relevance', name: 'relevance' },
        { display: 'Download count', name: 'downloads' },
        { display: 'Follow count', name: 'follows' },
        { display: 'Recently published', name: 'newest' },
        { display: 'Recently updated', name: 'updated' },
      ],
      sortType: { display: 'Relevance', name: 'relevance' },

      maxResults: 20,
      previousMaxResults: 20,

      maxResultsForView: {
        list: [5, 10, 15, 20, 50, 100],
        grid: [6, 12, 18, 24, 48, 96],
        gallery: [6, 10, 16, 20, 50, 100],
      },

      sidebarMenuOpen: false,

      skipLink: '#search-results',

      isLoading: true,
    }
  },
  async fetch() {
    if (this.$route.query.q) this.query = this.$route.query.q
    if (this.$route.query.f) {
      const facets = this.$route.query.f.split(',')

      for (const facet of facets) await this.toggleFacet(facet, true)
    }
    if (this.$route.query.g) {
      const orFacets = this.$route.query.g.split(',')

      for (const orFacet of orFacets) await this.toggleOrFacet(orFacet, true)
    }
    if (this.$route.query.v)
      this.selectedVersions = this.$route.query.v.split(',')
    if (this.$route.query.l)
      this.onlyOpenSource = this.$route.query.l === 'true'
    if (this.$route.query.h) this.showSnapshots = this.$route.query.h === 'true'
    if (this.$route.query.e)
      this.selectedEnvironments = this.$route.query.e.split(',')
    if (this.$route.query.s) {
      this.sortType.name = this.$route.query.s

      switch (this.sortType.name) {
        case 'relevance':
          this.sortType.display = 'Relevance'
          break
        case 'downloads':
          this.sortType.display = 'Downloads'
          break
        case 'newest':
          this.sortType.display = 'Recently published'
          break
        case 'updated':
          this.sortType.display = 'Recently updated'
          break
        case 'follows':
          this.sortType.display = 'Follow count'
          break
      }
    }

    if (this.$route.query.m) {
      this.maxResults = Number(this.$route.query.m)
    }
    if (this.$route.query.o) {
      this.currentPage =
        Math.ceil(Number(this.$route.query.o) / this.maxResults) + 1
    }

    this.projectType = this.$tag.projectTypes.find(
      (x) => x.id === this.$route.name.substring(0, this.$route.name.length - 1)
    )

    await this.onSearchChange(this.currentPage)

    this.isLoading = false
  },
  head() {
    const name = this.$route.name.substring(0, this.$route.name.length - 1)

    return {
      title: `Search ${this.$formatProjectType(name)}s - ${iDb.appName}`,
      meta: [
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: `Search ${this.$formatProjectType(name)}s`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Search ${this.$formatProjectType(name)}s`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${iDb.head.meta.description.content1} ${name} ${iDb.head.meta.description.content2} ${name}s.\n`,
        },
      ],
    }
  },
  watch: {
    '$route.path': {
      async handler() {
        this.isLoading = true
        this.projectType = this.$tag.projectTypes.find(
          (x) =>
            x.id === this.$route.name.substring(0, this.$route.name.length - 1)
        )

        this.results = null
        this.pageCount = 1
        this.currentPage = 1
        this.query = ''
        this.maxResults = 20
        this.sortType = { display: 'Relevance', name: 'relevance' }
        // this.showAllLoaders = false
        this.sidebarMenuOpen = false

        await this.clearFilters()

        this.isLoading = false

        this.setClosestMaxResults()

        return false
      },
    },
  },
  created() {
    // This is currently using the global event bus as I couldn't figure out how to use the local one
    this.$nuxt.$emit('registerSkipLink', {
      id: '#search-results',
      text: 'Skip to Search Results',
    })
  },
  destroyed() {
    // Not sure about this
    this.$nuxt.$emit('registerSkipLink')
  },
  methods: {
    setMaxResults(v) {
      this.maxResults = v
    },
    setQuery(v) {
      this.query = v
    },
    setSortType(v) {
      this.sortType = v
    },
    setSidebarMenuOpen(v) {
      this.sidebarMenuOpen = v
    },
    setShowSnapshots(v) {
      this.showSnapshots = v
    },
    setOnlyOpenSource(v) {
      this.onlyOpenSource = v
    },
    setSelectedVersions(v) {
      this.selectedVersions = v
    },
    async clearFilters() {
      for (const facet of [...this.facets]) await this.toggleFacet(facet, true)
      for (const facet of [...this.orFacets])
        await this.toggleOrFacet(facet, true)

      this.onlyOpenSource = false
      this.selectedVersions = []
      this.selectedEnvironments = []
      await this.onSearchChange(1)
    },
    async toggleFacet(elementName, doNotSendRequest) {
      const index = this.facets.indexOf(elementName)
      if (index !== -1) {
        this.facets.splice(index, 1)
      } else {
        this.facets.push(elementName)
      }

      if (!doNotSendRequest) await this.onSearchChange(1)
    },
    async toggleOrFacet(elementName, doNotSendRequest) {
      const index = this.orFacets.indexOf(elementName)
      if (index !== -1) {
        this.orFacets.splice(index, 1)
      } else {
        if (elementName === 'categories:purpur') {
          if (!this.orFacets.includes('categories:paper'))
            this.orFacets.push('categories:paper')
          if (!this.orFacets.includes('categories:spigot'))
            this.orFacets.push('categories:spigot')
          if (!this.orFacets.includes('categories:bukkit'))
            this.orFacets.push('categories:bukkit')
        } else if (elementName === 'categories:paper') {
          if (!this.orFacets.includes('categories:spigot'))
            this.orFacets.push('categories:spigot')
          if (!this.orFacets.includes('categories:bukkit'))
            this.orFacets.push('categories:bukkit')
        } else if (elementName === 'categories:spigot') {
          if (!this.orFacets.includes('categories:bukkit'))
            this.orFacets.push('categories:bukkit')
        } else if (elementName === 'categories:waterfall') {
          if (!this.orFacets.includes('categories:bungeecord'))
            this.orFacets.push('categories:bungeecord')
        }
        this.orFacets.push(elementName)
      }

      if (!doNotSendRequest) await this.onSearchChange(1)
    },
    async toggleEnv(environment, sendRequest) {
      const index = this.selectedEnvironments.indexOf(environment)
      if (index !== -1) {
        this.selectedEnvironments.splice(index, 1)
      } else {
        this.selectedEnvironments.push(environment)
      }

      if (!sendRequest) await this.onSearchChange(1)
    },
    async onSearchChangeToTop(newPageNumber) {
      if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })

      await this.onSearchChange(newPageNumber)
    },
    async onMaxResultsChange() {
      const newPageNumber = Math.max(
        1,
        Math.min(
          Math.floor(
            this.currentPage / (this.maxResults / this.previousMaxResults)
          ),
          this.pageCount
        )
      )
      this.previousMaxResults = this.maxResults
      await this.onSearchChange(newPageNumber)
    },
    async onSearchChange(newPageNumber) {
      this.currentPage = newPageNumber

      if (this.query === null) return

      try {
        const params = [
          `limit=${this.maxResults}`,
          `index=${this.sortType.name}`,
        ]

        if (this.query.length > 0) {
          params.push(`query=${this.query.replace(/ /g, '+')}`)
        }

        if (
          this.facets.length > 0 ||
          this.orFacets.length > 0 ||
          this.selectedVersions.length > 0 ||
          this.selectedEnvironments.length > 0 ||
          this.projectType
        ) {
          let formattedFacets = []
          for (const facet of this.facets) {
            formattedFacets.push([facet])
          }

          // loaders specifier
          if (this.orFacets.length > 0) {
            formattedFacets.push(this.orFacets)
          } else if (this.projectType.id === 'plugin') {
            formattedFacets.push(
              this.$tag.loaderData.allPluginLoaders.map(
                (x) => `categories:'${encodeURIComponent(x)}'`
              )
            )
          } else if (this.projectType.id === 'mod') {
            formattedFacets.push(
              this.$tag.loaderData.modLoaders.map(
                (x) => `categories:'${encodeURIComponent(x)}'`
              )
            )
          } else if (this.projectType.id === 'datapack') {
            formattedFacets.push(
              this.$tag.loaderData.dataPackLoaders.map(
                (x) => `categories:'${encodeURIComponent(x)}'`
              )
            )
          }

          if (this.selectedVersions.length > 0) {
            const versionFacets = []
            for (const facet of this.selectedVersions) {
              versionFacets.push('versions:' + facet)
            }
            formattedFacets.push(versionFacets)
          }

          if (this.onlyOpenSource) formattedFacets.push(['open_source:true'])

          if (this.selectedEnvironments.length > 0) {
            let environmentFacets = []

            const includesClient = this.selectedEnvironments.includes('client')
            const includesServer = this.selectedEnvironments.includes('server')
            if (includesClient && includesServer) {
              environmentFacets = [
                ['client_side:required'],
                ['server_side:required'],
              ]
            } else {
              if (includesClient) {
                environmentFacets = [
                  ['client_side:optional', 'client_side:required'],
                  ['server_side:optional', 'server_side:unsupported'],
                ]
              }
              if (includesServer) {
                environmentFacets = [
                  ['client_side:optional', 'client_side:unsupported'],
                  ['server_side:optional', 'server_side:required'],
                ]
              }
            }

            formattedFacets = [...formattedFacets, ...environmentFacets]
          }

          if (this.projectType)
            formattedFacets.push([`project_type:${this.projectType.actual}`])

          params.push(`facets=${JSON.stringify(formattedFacets)}`)
        }

        const offset = (newPageNumber - 1) * this.maxResults
        if (newPageNumber !== 1) {
          params.push(`offset=${offset}`)
        }

        let url = 'search'

        if (params.length > 0) {
          for (let i = 0; i < params.length; i++) {
            url += i === 0 ? `?${params[i]}` : `&${params[i]}`
          }
        }

        const res = await this.$axios.get(url, this.$defaultHeaders())
        this.results = res.data.hits

        this.pageCount = Math.ceil(res.data.total_hits / res.data.limit)

        if (process.client) {
          url = this.getSearchUrl(offset)
          const currentUrl = `/${this.$route.name}`

          if (currentUrl !== url) {
            await this.$router.replace({ path: url })
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    getSearchUrl(offset) {
      const queryItems = []

      if (this.query) queryItems.push(`q=${encodeURIComponent(this.query)}`)
      if (offset > 0) queryItems.push(`o=${offset}`)
      if (this.facets.length > 0)
        queryItems.push(`f=${encodeURIComponent(this.facets)}`)
      if (this.orFacets.length > 0)
        queryItems.push(`g=${encodeURIComponent(this.orFacets)}`)
      if (this.selectedVersions.length > 0)
        queryItems.push(`v=${encodeURIComponent(this.selectedVersions)}`)
      if (this.onlyOpenSource) queryItems.push(`l=true`)
      if (this.showSnapshots) queryItems.push(`h=true`)
      if (this.selectedEnvironments.length > 0)
        queryItems.push(`e=${encodeURIComponent(this.selectedEnvironments)}`)
      if (this.sortType.name !== 'relevance')
        queryItems.push(`s=${encodeURIComponent(this.sortType.name)}`)
      if (this.maxResults !== 20)
        queryItems.push(`m=${encodeURIComponent(this.maxResults)}`)

      let url = `${this.$route.path}`

      if (queryItems.length > 0) {
        url += `?${queryItems[0]}`

        for (let i = 1; i < queryItems.length; i++) {
          url += `&${queryItems[i]}`
        }
      }

      return url
    },
    async cycleSearchDisplayMode() {
      const value = this.$cosmetics.searchDisplayMode[this.projectType.id]
      const newValue = this.$cycleValue(value, this.$tag.projectViewModes)
      await this.$store.dispatch('cosmetics/saveSearchDisplayMode', {
        projectType: this.projectType.id,
        mode: newValue,
        $cookies: this.$cookies,
      })
      this.setClosestMaxResults()
    },
    setClosestMaxResults() {
      const view = this.$cosmetics.searchDisplayMode[this.projectType.id]
      const maxResultsOptions = this.maxResultsForView[view] ?? [20]
      const currentMax = this.maxResults
      if (!maxResultsOptions.includes(currentMax)) {
        this.maxResults = maxResultsOptions.reduce(function (prev, curr) {
          return Math.abs(curr - currentMax) <= Math.abs(prev - currentMax)
            ? curr
            : prev
        })
      }
    },
  },
}
</script>

<style lang="scss">
.normal-page__content {
  // Passthrough children as grid items on mobile
  display: contents;

  @media screen and (min-width: 1024px) {
    display: block;
  }
}

// Move the filters "sidebar" on mobile underneath the search card
.normal-page__sidebar {
  grid-row: 3;

  // Hide on mobile unless open
  @media screen and (max-width: 1024px) {
    display: none;

    &.open {
      display: block;
    }
  }
}

.filters-card {
  padding: var(--spacing-card-md);

  @media screen and (min-width: 1024px) {
    padding: var(--spacing-card-lg);
  }
}

.sidebar-menu {
  display: none;
}

.sidebar-menu_open {
  display: block;
}

.sidebar-menu-heading {
  margin: 1.5rem 0 0.5rem 0;
}

.pagination-before {
  grid-row: 4;
}

.search-results-container {
  grid-row: 5;
}

.pagination-after {
  grid-row: 6;
}

.no-results {
  text-align: center;
}

@media screen and (min-width: 1024px) {
  .sidebar-menu {
    display: block;
    margin-top: 0;
  }
}
</style>
