<template>
  <div class="users-section">
    <div class="section-header">
      <div class="section-label green">For Players</div>
      <h2 class="section-tagline">Discover over 5,000 creations</h2>
      <p class="section-description">
        From magical biomes to cursed dungeons, you can be sure to find content
        to bring your gameplay to the next level.
      </p>
    </div>
    <div class="feature-blob">
      <div class="blob-text">
        <h3>Find what you want, quickly and easily</h3>
        <p>
          Modrinth’s lightning-fast search and powerful filters let you find
          what you want as you type.
        </p>
      </div>
      <div class="blob-demonstration gradient-border bigger">
        <div class="demo-search">
          <div class="search-controls">
            <div class="iconified-input">
              <label class="hidden" for="search">Search</label>
              <SearchIcon aria-hidden="true" />
              <input
                id="search"
                v-model="searchQuery"
                type="search"
                name="search"
                :placeholder="`Search...`"
                autocomplete="off"
                @input="updateSearchProjects"
              />
            </div>
            <div class="sort-by">
              <span class="label">Sort by</span>
              <Multiselect
                v-model="sortType"
                placeholder="Select one"
                class="selector"
                :custom-label="
                  (value) => value.charAt(0).toUpperCase() + value.slice(1)
                "
                :options="[
                  'relevance',
                  'downloads',
                  'follows',
                  'updated',
                  'newest',
                ]"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                :allow-empty="false"
                @input="updateSearchProjects"
              />
            </div>
          </div>
          <div class="results display-mode--list">
            <ProjectCard
              v-for="result in searchProjects"
              :id="result.slug ? result.slug : result.project_id"
              :key="result.project_id"
              class="small-mode gradient-border"
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
              :categories="result.display_categories.slice(0, 3)"
              :search="true"
              :show-updated-date="true"
              :color="result.color"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="feature-blob reverse">
      <div class="blob-text">
        <h3>Follow projects you love</h3>
        <p>
          Get notified every time your favorite projects update and stay in the
          loop
        </p>
      </div>
      <div class="blob-demonstration gradient-border">
        <div class="notifs-demo">
          <h3>Notifications</h3>
          <div class="notifications">
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              class="notification gradient-border"
            >
              <nuxt-link
                :to="`${notification.project_type}/${notification.slug}`"
              >
                <Avatar
                  size="md"
                  :src="notification.icon_url"
                  :alt="notification.title"
                />
              </nuxt-link>
              <div>
                <nuxt-link
                  :to="`${notification.project_type}/${notification.slug}`"
                  class="notif-header"
                >
                  {{ notification.title }} has been updated!
                </nuxt-link>
                <p class="notif-desc">
                  Version {{ ['1.1.2', '1.0.3', '15.1'][index] }} has been
                  released for
                  {{
                    $capitalizeString(
                      notification.display_categories[
                        notification.display_categories.length - 1
                      ]
                    )
                  }}
                  {{ notification.versions[notification.versions.length - 1] }}
                </p>
                <div class="date">
                  <CalendarIcon />
                  <span>
                    Received
                    {{ $dayjs(notification.date_modified).fromNow() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feature-blob">
      <div class="blob-text">
        <h3>Play with your favorite launcher</h3>
        <p>
          Modrinth's open-source API lets launchers add deep integration with
          Modrinth. We're already supported by some of the most popular
          launchers like ATLauncher, MultiMC, and Prism Launcher.
        </p>
      </div>
      <div class="blob-demonstration gradient-border">
        <div class="launcher-view">
          <img
            v-if="$colorMode.value === 'light'"
            src="https://cdn.modrinth.com/landing/launcher-light.png"
            alt="launcher graphic"
            class="minecraft-screen"
          />
          <img
            v-else
            src="https://cdn.modrinth.com/landing/launcher.png"
            alt="launcher graphic"
            class="minecraft-screen"
          />
          <div class="launcher-graphics">
            <a
              rel="noopener noreferrer nofollow"
              href="https://prismlauncher.org/"
              class="graphic gradient-border"
            >
              <img
                src="~/assets/images/external/prism.svg"
                alt="prism launcher logo"
              />
            </a>
            <a
              rel="noopener noreferrer nofollow"
              href="https://multimc.org/"
              class="graphic gradient-border"
            >
              <img
                src="~/assets/images/external/multimc.png"
                alt="multimc launcher logo"
              />
            </a>
            <a
              rel="noopener noreferrer nofollow"
              href="https://atlauncher.com/"
              class="graphic gradient-border"
            >
              <img
                src="~/assets/images/external/atlauncher.svg"
                alt="atlauncher logo"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SearchIcon from '~/assets/images/utils/search.svg?inline'
import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import ProjectCard from '~/components/ui/ProjectCard'
import Avatar from '~/components/ui/Avatar'

export default {
  components: {
    Avatar,
    Multiselect,
    SearchIcon,
    CalendarIcon,
    ProjectCard,
  },
  props: {
    searchProjects: {
      type: Array,
      default: () => [],
      sync: true,
    },
  },
  async asyncData(data) {
    const [projects, baseSearch, updated] = (
      await Promise.all([
        await data.$axios.get('projects_random?count=70'),
        await data.$axios.get('search?limit=3&query=flowers'),
        await data.$axios.get('search?limit=3&query=&index=updated'),
      ])
    ).map((it) => it.data)

    const val = Math.ceil(projects.length / 3)

    return {
      projects: [
        projects.slice(0, val),
        projects.slice(val, val * 2),
        projects.slice(val * 2, val * 3),
      ],
      searchProjects: baseSearch.hits,
      notifications: updated.hits,
    }
  },
  data() {
    return {
      projects: [],
      notifications: [],
      searchQuery: 'flowers',
      sortType: 'relevance',
    }
  },
  methods: {
    async updateSearchProjects() {
      this.props.searchProjects = (
        await this.$axios.get(
          `search?query=${this.searchQuery}&limit=3&index=${this.sortType}`
        )
      ).data.hits
    },
  },
}
</script>
<style lang="scss" scoped>
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
        background: linear-gradient(0deg, #05ce45 0%, rgba(5, 206, 69, 0) 100%);
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
