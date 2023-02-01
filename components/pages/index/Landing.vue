<template>
  <div class="landing-hero">
    <LogoIcon />
    <h1 class="main-header">
      {{ iDb.index.mainHeader }}
      <div class="animate-strong">
        <span>
          <strong
            v-for="projectType in $tag.projectTypes"
            :key="projectType.id"
            class="main-header-strong"
          >
            {{ projectType.display }}s <br />
          </strong>
          <strong class="main-header-strong">{{
            iDb.index.mainHeaderMod
          }}</strong>
        </span>
      </div>
    </h1>
    <h2>
      {{ iDb.index.secondaryHeader }}
    </h2>
    <div class="button-group">
      <nuxt-link
        :to="iDb.index.buttons.discover.to"
        class="iconified-button"
        :class="`${
          iDb.index.buttons.discover.class
            ? iDb.index.buttons.discover.class
            : ' outline-button'
        }`"
      >
        {{ iDb.index.buttons.discover.label }}
      </nuxt-link>
      <a
        v-if="!$auth.user"
        :href="authUrl"
        class="iconified-button"
        :class="`${
          iDb.index.buttons.signup.class
            ? iDb.index.buttons.signup.class
            : ' outline-button'
        }`"
      >
        {{ iDb.index.buttons.signup.label }}
      </a>
      <nuxt-link
        v-else
        to="/dashboard/projects"
        class="iconified-button"
        :class="`${
          iDb.index.buttons.dashboard.class
            ? iDb.index.buttons.dashboard.class
            : ' outline-button'
        }`"
      >
        {{ iDb.index.buttons.dashboard.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import LogoIcon from '~/assets/images/logo.svg?inline'
import iDb from '~/iDb/pages'

export default {
  components: {
    LogoIcon,
  },
  data() {
    return {
      iDb,
    }
  },
  fetch() {},
  computed: {
    authUrl() {
      return `${process.env.authURLBase}auth/init?url=${process.env.domain}/`
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.landing-hero {
  background-image: var(--landing-maze-bg);
  background-size: cover;
  object-fit: contain;
  padding: 6rem 1rem 12rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  svg {
    width: 13rem;
    height: 13rem;
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.25rem;
    line-height: 125%;
    margin: 0 0 1.625rem;
    font-weight: 400;
    line-break: loose;
    color: var(--landing-color-subheading);
    max-width: 50rem;
  }

  .button-group {
    width: fit-content;
    gap: 1.25rem;
    margin: 0 auto 5rem;
    justify-content: center;

    // TODO: work for both themes and move to components.scss
    .outline-button {
      color: var(--landing-color-heading);
      background: none;
      border: 1px var(--landing-color-heading) solid;
    }
  }
}

.animate-strong {
  height: 1.2em;
  line-height: 120%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;

  > span {
    position: absolute;
    top: 0;
    animation: slide 10s infinite;

    @media (prefers-reduced-motion) {
      animation-play-state: paused !important;
    }
  }

  @keyframes slide {
    0%,
    13% {
      top: 0;
    }
    17%,
    30% {
      top: -1.2em;
    }
    33%,
    46% {
      top: -2.4em;
    }
    50%,
    63% {
      top: -3.6em;
    }
    66%,
    79% {
      top: -4.8em;
    }
    83%,
    96% {
      top: -6em;
    }
    99.99997%,
    99.99998% {
      top: -7.2em;
    }
    99.99999% {
      top: 0;
    }
  }
}

.iconified-button {
  font-weight: 600;
  min-height: 3rem;
}

@media screen and (min-width: 560px) {
  .landing-hero {
    h2 {
      font-size: 1.5rem;
    }
  }
}

@media screen and (min-width: 1024px) {
  .landing-hero {
    h2 {
      font-size: 1.625rem;
    }

    padding: 12rem 1rem;
    // Magic number to cover header (space in rem header occupies)
    margin-top: -5.75rem;
  }
}
</style>
