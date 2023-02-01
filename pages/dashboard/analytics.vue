<template>
  <div>
    <section class="universal-card">
      <h2>Analytics</h2>
      <p>You found a secret!</p>
      <nuxt-link to="/frog" class="goto-link"
        >Click here for fancy graphs!</nuxt-link
      >
    </section>
  </div>
</template>

<script>
import iDb from '~/iDb/pages'

export default {
  components: {},
  data() {
    return {}
  },
  fetch() {},
  head: {
    title: 'Analytics - ' + iDb.analytics.appName,
  },
  methods: {},
}
</script>
<style lang="scss" scoped></style>
