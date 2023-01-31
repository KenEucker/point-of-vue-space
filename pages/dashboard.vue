<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>Dashboard<span class="beta-badge">BETA</span></h1>
        <NavStack>
          <NavStackItem
            v-for="link in navLinks"
            :key="link.path"
            :link="`/${link.path}`"
            :label="link.label"
          >
            <DashboardIcon v-if="link.icon === 'dashboard'" />
            <ListIcon v-if="link.icon === 'list'" />
            <ChartIcon v-if="link.icon === 'chart'" />
            <CurrencyIcon v-if="link.icon === 'currency'" />
          </NavStackItem>
        </NavStack>
      </aside>
    </div>
    <div class="normal-page__content">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import NavStack from '~/components/ui/NavStack'
import NavStackItem from '~/components/ui/NavStackItem'

import DashboardIcon from '~/assets/images/utils/dashboard.svg?inline'
import ChartIcon from '~/assets/images/utils/chart.svg?inline'
import CurrencyIcon from '~/assets/images/utils/currency.svg?inline'
import ListIcon from '~/assets/images/utils/list.svg?inline'

import iDb from '~/iDb'

const computeCondition = (condition) => {
  switch (condition) {
    case 'analytics':
      return false
    case 'monetization':
    default:
      return true
  }
}

export default {
  name: 'Dashboard',
  components: {
    NavStack,
    NavStackItem,
    DashboardIcon,
    ChartIcon,
    CurrencyIcon,
    ListIcon,
  },
  data() {
    return {
      iDb,
    }
  },
  computed: {
    navLinks: () => {
      return iDb.pages.dashboard.navLinks.filter((l) =>
        l.condition?.length ? computeCondition(l.condition) : true
      )
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
