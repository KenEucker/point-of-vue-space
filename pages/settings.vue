<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>Settings</h1>
        <NavStack>
          <NavStackItem
            v-for="link in iDb.navLinks"
            :key="link.path"
            :link="`/${link.path}`"
            :label="link.label"
          >
            <PaintbrushIcon v-if="link.icon === 'settings'" />
          </NavStackItem>
          <template v-if="$auth.user">
            <h3>User settings</h3>
            <NavStackItem
              v-for="link in iDb.authedNavLinks"
              :key="link.path"
              :link="`/${link.path}`"
              :label="link.label"
            >
              <CurrencyIcon v-if="link.icon === 'currency'" />
              <UserIcon v-if="link.icon === 'user'" />
              <HeartIcon v-if="link.icon === 'heart'" />
            </NavStackItem>
          </template>
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

import PaintbrushIcon from '~/assets/images/utils/paintbrush.svg?inline'
import UserIcon from '~/assets/images/utils/user.svg?inline'
import HeartIcon from '~/assets/images/utils/heart.svg?inline'
import CurrencyIcon from '~/assets/images/utils/currency.svg?inline'

import iDb from '~/iDb/pages/settings'

export default {
  name: 'Settings',
  components: {
    NavStack,
    NavStackItem,
    PaintbrushIcon,
    UserIcon,
    HeartIcon,
    CurrencyIcon,
  },
  data() {
    return {
      iDb,
    }
  },
}
</script>

<style lang="scss" scoped></style>
