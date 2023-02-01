<template>
  <div>
    <section class="universal-card">
      <label for="project-description">
        <span class="label__title size-card-header">Description</span>
        <span class="label__description">
          {{ iDb.description.description1 }}
          <a
            class="text-link"
            :href="iDb.description.splitLink"
            target="_blank"
            rel="noopener noreferrer"
            >{{ iDb.description.split }}</a
          >
          {{ iDb.description.description2 }}
          <span class="label__subdescription">
            {{ iDb.subdescription.description1 }}

            <nuxt-link
              :to="iDb.subdescription.splitLink"
              class="text-link"
              target="_blank"
              >{{ iDb.subdescription.split }}</nuxt-link
            >
            {{ iDb.subdescription.description2 }}
          </span>
        </span>
      </label>
      <Chips v-model="bodyViewMode" :items="['source', 'preview']" />
      <div v-if="bodyViewMode === 'source'" class="resizable-textarea-wrapper">
        <textarea
          id="project-description"
          v-model="description"
          :disabled="(currentMember.permissions & EDIT_BODY) !== EDIT_BODY"
        />
      </div>
      <div
        v-else-if="bodyViewMode === 'preview'"
        v-highlightjs
        class="markdown-body"
        v-html="
          description ? $xss($md.render(description)) : 'No body specified.'
        "
      ></div>
      <div class="input-group">
        <button
          type="button"
          class="iconified-button brand-button"
          :disabled="!hasChanges"
          @click="saveChanges()"
        >
          <SaveIcon />
          Save changes
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import Chips from '~/components/ui/Chips'

import SaveIcon from '~/assets/images/utils/save.svg?inline'

import iDb from '~/iDb/type/settings'

export default {
  components: {
    Chips,
    SaveIcon,
  },
  props: {
    project: {
      type: Object,
      default() {
        return {}
      },
    },
    allMembers: {
      type: Array,
      default() {
        return []
      },
    },
    currentMember: {
      type: Object,
      default() {
        return null
      },
    },
    patchProject: {
      type: Function,
      default() {
        return () => {
          this.$notify({
            group: 'main',
            title: 'An error occurred',
            text: 'Patch project function not found',
            type: 'error',
          })
        }
      },
    },
  },
  data() {
    return {
      iDb,

      description: '',
      bodyViewMode: 'source',
    }
  },
  fetch() {
    this.description = this.project.body
  },
  computed: {
    patchData() {
      const data = {}

      if (this.description !== this.project.body) {
        data.body = this.description
      }

      return data
    },
    hasChanges() {
      return Object.keys(this.patchData).length > 0
    },
  },
  created() {
    this.EDIT_BODY = 1 << 3
  },
  methods: {
    saveChanges() {
      if (this.hasChanges) {
        this.patchProject(this.patchData)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.resizable-textarea-wrapper textarea {
  min-height: 40rem;
}

.markdown-body {
  margin-bottom: var(--spacing-card-md);
}
</style>
