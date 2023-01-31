<template>
  <div class="creator-section">
    <div class="section-header">
      <div class="section-label blue">For Creators</div>
      <h2 class="section-tagline">Share your content with the world</h2>
      <p class="section-description">
        Give an online home to your creations and reach a massive audience of
        dedicated players
      </p>
      <Features />
    </div>
  </div>
</template>

<script>
import Features from './features'

export default {
  components: {
    Features,
  },
  data() {
    return {}
  },
  fetch() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.creator-section {
  width: 100%;
  background: var(--landing-creator-gradient);
  padding: 2.5rem 0;

  .features {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    max-width: 81.25rem;
    justify-content: center;
    margin: 5rem auto 0 auto;
    row-gap: 3.5rem;
    column-gap: 3rem;
    padding: 1rem;

    .feature {
      width: 34.375rem;
      padding: 1.25rem;
      z-index: 1;
      background: var(--landing-card-bg);

      .icon {
        z-index: 2;
        margin: -3.25rem 0 0.75rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        background: #020305;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.16), inset 2px 2px 32px #393d5e;
        border-radius: 0.75rem;

        svg {
          width: 2rem;
          height: auto;
        }
      }

      .additional-label {
        width: fit-content;
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
        background: var(--landing-blue-label-bg);
        color: var(--landing-blue-label);
        border-radius: 6px;
        font-weight: 700;
        font-size: 1rem;
      }

      h4,
      p {
        font-weight: 500;
        line-height: 125%;
        margin: 0;
      }

      h4 {
        font-size: 1.25rem;
        color: var(--landing-color-heading);
        margin-bottom: 0.375rem;
      }

      p {
        font-size: 1.25rem;
        color: var(--landing-color-subheading);
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .creator-section {
    .features {
      margin-top: 7rem;
      row-gap: 5.5rem;

      .feature {
        min-height: 12rem;

        .icon {
          margin-bottom: 1.25rem;
          width: 5rem;
          height: 5rem;

          svg {
            width: 2.25rem;
          }
        }

        .additional-label {
          position: absolute;
          top: 12px;
          left: 112px;
          margin-bottom: 0;
        }

        h4 {
          font-size: 1.75rem;
        }

        p {
          font-size: 1.25rem;
        }
      }
    }
  }

  .section-header {
    .section-tagline,
    .section-description {
      font-size: 1.625rem;
    }
  }
}
</style>
