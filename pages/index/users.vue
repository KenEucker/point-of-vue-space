<template>
  <div class="users-section-outer">
    <div class="projects-showcase">
      <div v-for="(row, index) in rows" :key="index" class="row">
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
    <div class="projects-transition"></div>
    <div class="users-section">
      <div class="section-header">
        <div class="section-label green">For Players</div>
        <h2 class="section-tagline">Discover over 5,000 creations</h2>
        <p class="section-description">
          From magical biomes to cursed dungeons, you can be sure to find
          content to bring your gameplay to the next level.
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
            Get notified every time your favorite projects update and stay in
            the loop
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
                    {{
                      notification.versions[notification.versions.length - 1]
                    }}
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
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Avatar from '~/components/ui/Avatar'
import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import ProjectCard from '~/components/ui/ProjectCard'
import SearchIcon from '~/assets/images/utils/search.svg?inline'

export default {
  components: {
    Avatar,
    CalendarIcon,
    ProjectCard,
    Multiselect,
    SearchIcon,
  },
  data() {
    return {
      searchQuery: 'flowers',
      sortType: 'relevance',
      searchProjects: [],
      notifications: [],
      rows: [],
    }
  },
  async fetch() {
    const [projects, baseSearch, updated] = (
      await Promise.all([
        await this.$axios.get('projects_random?count=70'),
        await this.$axios.get('search?limit=3&query=flowers'),
        await this.$axios.get('search?limit=3&query=&index=updated'),
      ])
    ).map((it) => it.data)

    const val = Math.ceil(projects.length / 3)

    this.rows = [
      projects.slice(0, val),
      projects.slice(val, val * 2),
      projects.slice(val * 2, val * 3),
    ]
    this.searchProjects = baseSearch.hits
    this.notifications = updated.hits
  },
  methods: {
    async updateSearchProjects() {
      this.searchProjects = (
        await this.$axios.get(
          `search?query=${this.searchQuery}&limit=3&index=${this.sortType}`
        )
      ).data.hits
    },
  },
}
</script>
<style lang="scss" scoped>
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

@media screen and (min-width: 560px) {
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
}

@media screen and (min-width: 1024px) {
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
}
</style>
