<template>
  <div>
    <Landing />
    <Users />
    <Creators />
    <Banner />
  </div>
</template>

<script>
import Banner from '~/components/modrinth/pages/IndexBanner'
import Users from '~/components/modrinth/pages/IndexUsers'
import Landing from '~/components/modrinth/pages/IndexLanding'
import Creators from '~/components/modrinth/pages/IndexCreators'

import iDb from '~/iDb'

export default {
  components: {
    Landing,
    Creators,
    Banner,
    Users,
  },
  auth: false,
  data() {
    return {
      iDb,
    }
  },
}
</script>

<style lang="scss">
.section-header {
  text-align: center;
  margin: 2rem;

  .section-label {
    margin: 1.5rem auto;
    width: fit-content;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
    line-height: 125%;

    &.green {
      background: var(--landing-green-label-bg);
      color: var(--landing-green-label);
    }
    &.blue {
      background: var(--landing-blue-label-bg);
      color: var(--landing-blue-label);
    }
  }

  .section-tagline,
  .section-description {
    font-weight: 400;
    font-size: 1.25rem;
    line-break: loose;
    line-height: 125%;
    max-width: 50rem;
  }

  .section-tagline {
    margin: 0 auto;
    color: var(--landing-color-heading);
  }

  .section-description {
    margin: 0.375rem auto;
    color: var(--landing-color-subheading);
  }
}

.main-header {
  color: var(--landing-color-heading);
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 100%;
  margin: 0 0 0.25rem;
}

.main-header-strong {
  font-weight: 600;
  background-color: #00bd3c;
  background-image: linear-gradient(180deg, #a7d0ff 0%, var(--color-brand) 60%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  color: transparent;
}

@media screen and (min-width: 560px) {
  .section-header {
    .section-tagline,
    .section-description {
      font-size: 1.5rem;
    }
  }

  .main-header {
    font-size: 4rem;
  }
}

@media screen and (min-width: 1024px) {
  .section-header {
    .section-tagline,
    .section-description {
      font-size: 1.625rem;
    }
  }

  .main-header {
    font-size: 5.25rem;
  }
}
</style>
