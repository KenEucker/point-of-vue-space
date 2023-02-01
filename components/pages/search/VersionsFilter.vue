<template>
  <section aria-label="Platform filters">
    <h3 class="sidebar-menu-heading">Minecraft versions</h3>
    <Checkbox
      v-model="showSnapshots"
      label="Include snapshots"
      description="Include snapshots"
      style="margin-bottom: 0.5rem"
      :border="false"
    />
    <Multiselect
      v-model="selectedVersions"
      :options="
        showSnapshots
          ? $tag.platformVersions.map((x) => x.version)
          : $tag.platformVersions
              .filter((it) => it.version_type === 'release')
              .map((x) => x.version)
      "
      :multiple="true"
      :searchable="true"
      :show-no-results="false"
      :close-on-select="false"
      :clear-search-on-select="false"
      :show-labels="false"
      :selectable="() => selectedVersions.length <= 6"
      placeholder="Choose versions..."
      @input="$emit('onSearchChange', 1)"
    ></Multiselect>
    <h3 class="sidebar-menu-heading">Open source</h3>
    <Checkbox
      v-model="onlyOpenSource"
      label="Open source only"
      style="margin-bottom: 0.5rem"
      :border="false"
      @input="$emit('onSearchChange', 1)"
    />
  </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Checkbox from '~/components/ui/Checkbox'

export default {
  name: 'VersionsFilter',
  components: {
    Multiselect,
    Checkbox,
  },
  props: {
    modelValue: Boolean,
    snapshots: {
      type: Boolean,
      default: false,
      sync: true,
    },
    openSource: {
      type: Boolean,
      default: false,
      sync: true,
    },
    versions: {
      type: Array,
      default: () => [],
      sync: true,
    },
  },
  emits: ['onlyOpenSource', 'selectedVersions', 'showSnapshots'],
  computed: {
    showSnapshots: {
      set(v) {
        this.$emit('showSnapshots', v)
      },
      get() {
        return this.snapshots
      },
    },
    selectedVersions: {
      set(v) {
        this.$emit('selectedVersions', v)
      },
      get() {
        return this.versions
      },
    },
    onlyOpenSource: {
      set(v) {
        this.$emit('onlyOpenSource', v)
      },
      get() {
        return this.openSource
      },
    },
  },
}
</script>
