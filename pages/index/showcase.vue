<template>
  <div class="projects-showcase">
    <div v-for="(row, index) in projects" :key="index" class="row">
      <div
        v-for="n in 2"
        :key="n"
        class="row__content"
        :aria-hidden="n === 1"
        :class="{ offset: index % 2 }"
      >
        <nuxt-link
          v-for="project in row"
          :key="project.id"
          class="project button-animation"
          :to="`/${project.project_type}/${project.slug}`"
        >
          <Avatar
            :src="project.icon_url"
            :alt="project.title"
            size="sm"
            loading="lazy"
          />
          <div class="project-info">
            <span class="title">
              {{ project.title }}
            </span>
            <span class="description">
              {{ project.description }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '~/components/ui/Avatar'

export default {
  components: {
    Avatar,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  fetch() {},
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

.users-section-outer {
  position: relative;
  background: var(--landing-maze-outer-bg);
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(
      180deg,
      var(--landing-transition-gradient-end) 0%,
      var(--landing-transition-gradient-start) 100%
    );
    height: 12.5rem;
    width: 100%;
  }

  .projects-transition {
    position: absolute;
    top: calc(-12.5rem);
    width: 100%;
    height: 12.5rem;
    background: linear-gradient(
      0deg,
      var(--landing-transition-gradient-end) 0%,
      var(--landing-transition-gradient-start) 100%
    );
  }

  .projects-showcase {
    position: absolute;
    z-index: 2;
    top: -11rem;

    .row {
      --gap: 1.5rem;

      width: 100vw;
      gap: var(--gap);
      margin-bottom: var(--gap);

      display: flex;
      overflow: hidden;
      user-select: none;

      &:hover {
        .row__content {
          animation-play-state: paused !important;
        }
      }

      .row__content {
        flex-shrink: 0;
        display: flex;
        min-width: 100%;
        gap: var(--gap);
        animation: scroll 100s linear infinite;

        @media (prefers-reduced-motion) {
          animation-play-state: paused !important;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100%));
          }
        }

        &.offset {
          animation: scroll-inverse 100s linear infinite;
          transform: translateX(-100%);

          @keyframes scroll-inverse {
            from {
              transform: translateX(calc(-100%));
            }
            to {
              transform: translateX(calc(0%));
            }
          }
        }
      }

      .project {
        position: relative;
        display: flex;

        cursor: pointer;
        padding: 1rem;
        gap: 1rem;
        border-radius: 1rem;
        border: 1px solid var(--landing-border-color);
        transition: background 0.5s ease-in-out, transform 0.05s ease-in-out;
        // Removed due to lag on mobile :(

        &:hover {
          z-index: -2;
          background: var(--landing-hover-card-gradient);
        }

        img {
          height: 3rem;
        }

        .project-info {
          box-sizing: border-box;
        }

        .title {
          color: var(--landing-color-heading);
          max-width: 13.75rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 110%;
          display: block;
        }

        .description {
          width: 13.75rem;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;

          font-weight: 500;
          font-size: 0.875rem;
          line-height: 125%;
          margin: 0.25rem 0 0;
        }
      }
    }
  }

  .users-section {
    width: 100%;
    padding-top: 10rem;
    padding-bottom: 5rem;

    background: var(--landing-maze-gradient-bg);
    background-size: cover;
    background-blend-mode: multiply;

    .feature-blob {
      display: flex;
      padding: 1.25rem 1rem;
      justify-content: center;
      flex-wrap: wrap;
      column-gap: 4.375rem;
      margin: 0 0.75rem 0.75rem 0.75rem;

      &.reverse {
        flex-direction: row-reverse;
      }

      .blob-text {
        margin-top: 2.5rem;
        width: 32.5rem;
        max-width: 32.5rem;
        text-align: center;

        h3 {
          font-weight: 500;
          font-size: 2rem;
          line-height: 110%;
          color: var(--landing-color-heading);
        }

        p {
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 125%;
          color: var(--landing-color-subheading);
          line-break: loose;
        }
      }

      @media screen and (min-width: 1238px) {
        padding: 5rem 1rem;

        .blob-text {
          margin-top: 5rem;
          text-align: left;
        }
      }

      .blob-demonstration {
        position: relative;
        width: 35rem;
        max-width: 35rem;
        background: var(--landing-blob-gradient);
        box-shadow: var(--landing-blob-shadow);
        // backdrop-filter: blur(6px);
        background-blend-mode: multiply;
        padding: 1rem;
        z-index: 1;

        &:after {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0;
          background: linear-gradient(
            0deg,
            #05ce45 0%,
            rgba(5, 206, 69, 0) 100%
          );
          opacity: 0.2;
          border-radius: 1rem;
          left: -0.75rem;
          bottom: -0.75rem;
          margin-top: auto;
          width: calc(100% + 1.5rem);
          height: 55%;
        }

        .demo-search {
          height: max-content;

          .search-controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            gap: 1rem;

            .iconified-input {
              width: 100%;

              svg {
                opacity: 1;
                color: var(--color-button-text-active);
              }

              input {
                box-shadow: inset 0 0 0 transparent,
                  0 0 0 0.25rem var(--color-brand-shadow);
                color: var(--color-button-text-active);
              }
            }

            .sort-by {
              display: flex;
              gap: 0.75rem;
              align-items: center;
              min-width: 12.25rem;

              .selector {
                max-width: 8rem;
              }

              @media screen and (max-width: 500px) {
                display: none;
              }
            }
          }

          .results {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .small-mode {
              background: var(--landing-card-bg);
              box-shadow: var(--landing-card-shadow);
              background-blend-mode: multiply;
              // backdrop-filter: blur(4px);
            }

            @media screen and (max-width: 450px) {
              .small-mode:nth-child(n + 2) {
                display: none;
              }
            }

            @media screen and (max-width: 500px) {
              .small-mode:nth-child(n + 3) {
                display: none;
              }
            }
          }
        }

        .notifs-demo {
          h3 {
            font-weight: 600;
            font-size: 1.5rem;
            margin: 0 0 0.75rem;
          }

          .notifications {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .notification {
              display: flex;
              gap: 1rem;
              padding: 0.75rem;
              background: var(--landing-card-bg);
              box-shadow: var(--landing-card-shadow);

              img {
                width: 4rem;
                height: 4rem;
              }

              .notif-header {
                margin: 0;
                font-weight: 600;
                font-size: 1.25rem;
              }

              .notif-desc {
                margin: 0.5rem 0;
                font-weight: 500;
                font-size: 1rem;
              }

              .date {
                display: flex;
                align-items: center;
                gap: 0.25rem;

                span {
                  font-size: 12px;
                  font-weight: 700;
                }
              }
            }
          }
        }

        .launcher-view {
          .minecraft-screen {
            width: 100%;
            border-radius: 0.5rem;
          }

          .launcher-graphics {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            gap: 0.5rem;

            .graphic {
              padding: 1.25rem;
              display: flex;
              align-items: center;
              background: var(--landing-card-bg);
              box-shadow: var(--landing-card-shadow);
              //backdrop-filter: blur(4px);
              margin: 0 auto;

              img {
                width: 4.25rem;
                height: auto;
                image-rendering: crisp-edges;
              }
            }
          }
        }
      }
    }
  }
}

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

.logo-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--landing-raw-bg);
  padding: 1rem 1rem 2rem 1rem;
  overflow: hidden;

  svg {
    z-index: 2;
    width: auto;
    height: 32rem;
  }

  .overlay {
    z-index: 3;
    position: absolute;
    bottom: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
}

.gradient-border {
  position: relative;
  border-radius: 1rem;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    z-index: -1;
    border-radius: 1rem;
    background: var(--landing-border-gradient);

    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
}

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

  .users-section-outer {
    .users-section {
      .feature-blob {
        .blob-text {
          h3 {
            font-size: 3rem;
          }
          p {
            font-size: 1.5rem;
          }
        }
        .blob-demonstration {
          .demo-search {
            height: 37.5rem;
          }

          .launcher-view {
            .launcher-graphics {
              .graphic {
                margin: 0;
                padding: 1.25rem 2.75rem;
              }
            }
          }

          .notifs-demo {
            .notifications .notification {
              img {
                width: 5rem;
                height: 5rem;
              }
            }
          }
        }
      }
    }
  }

  .logo-banner {
    padding: 3rem 1rem 3.75rem 1rem;

    .overlay {
      bottom: 3.5rem;
    }
  }

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
  .landing-hero {
    h2 {
      font-size: 1.625rem;
    }

    padding: 12rem 1rem;
    // Magic number to cover header (space in rem header occupies)
    margin-top: -5.75rem;
  }

  .users-section-outer {
    .users-section {
      .feature-blob {
        .blob-text {
          h3 {
            font-size: 4rem;
          }
          p {
            font-size: 1.625rem;
          }
        }
      }
    }
  }

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

  .logo-banner {
    padding: 4rem 1rem 6.75rem 1rem;

    .overlay {
      bottom: 5rem;
    }
  }

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
