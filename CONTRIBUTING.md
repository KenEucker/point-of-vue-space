# Contributing to Modrinth

The vast majority of Modrinth, including everything from our <a href="https://github.com/modrinth/labrinth" target="_blank" rel="noopener noreferrer">API/backend</a> and <a href="https://github.com/modrinth/knossos" target="_blank" rel="noopener noreferrer">frontend</a> to the <a href="https://github.com/modrinth/minotaur" target="_blank" rel="noopener noreferrer">Minotaur plugin</a> and <a href="https://github.com/modrinth/ariadne" target="_blank" rel="noopener noreferrer">analytics service</a>, is released under free and open source licenses on our <a href="https://github.com/modrinth" target="_blank" rel="noopener noreferrer">GitHub</a>. As such, we love contributions from community members! Before proceeding to do so, though, there are a number of things you'll want to keep in mind throughout the process, as well as some details specific to certain projects.

# Things to keep in mind

## Consult people on Discord

There are a number of reasons to want to consult with people on our <a href="https://discord.gg/EUHuJHt" target="_blank" rel="noopener noreferrer">Discord</a> before making a pull request. For example, if you're not sure whether something is a good idea or not, if you're not sure how to implement something, or if you can't get something working, these would all be good opportunities to create a thread in the <code>#development</code> forum channel.

If you intend to work on new features, to make significant codebase changes, or to make UI/design changes, please open a discussion thread first to ensure your work is put to its best use.

## Don't get discouraged

At times, pull requests may be rejected or left unmerged for a variation of reasons. Don't take it personally, and don't get discouraged! Sometimes a contribution just isn't the right fit for the time, or it might have just been lost in the mess of other things to do. Remember, the core Modrinth team are often busy, whether it be on a specific project/task or on external factors such as offline responsibilities. It all falls back to the same thing: don't get discouraged!

## Code isn't the only way to contribute

You don't need to know how to program to contribute to Modrinth. Quality assurance, supporting the community, coming up with feature ideas, and making sure your voice is heard in public decisions are all great ways to contribute to Modrinth. If you find bugs, reporting them on the appropriate issue tracker is your responsibility; however, remember that potential security breaches and exploits must instead be reported in accordance with our <a href="https://modrinth.com/legal/security" target="_blank" rel="noopener noreferrer">security policy</a>.

## Modrinth currently does not accept monetary donations.

## Project-specific details

If you wish to contribute code to a specific project, here's the place to start. Most of Modrinth is written in the <a href="https://www.rust-lang.org" target="_blank" rel="noopener noreferrer">Rust language</a>, but some things are written in other languages/frameworks like <a href="https://nuxtjs.org" target="_blank" rel="noopener noreferrer">Nuxt.js</a> or Java.

## labrinth (backend and API)

<a href="https://github.com/modrinth/labrinth" target="_blank" rel="noopener noreferrer">labrinth</a> is the Rust-based backend serving Modrinth's API with the help of the <a href="https://actix.rs" target="_blank" rel="noopener noreferrer">Actix</a> framework. To get started with a labrinth instance, install docker, docker-compose, and cargo. The initial startup can be done simply with the command <code>docker-compose up</code>. That will deploy a PostgreSQL database on port 5432 and a MeiliSearch instance on port 7700.

Now, you'll have to install the sqlx CLI, which can be done with cargo:

<code>cargo install --git https://github.com/launchbadge/sqlx sqlx-cli --no-default-features --features postgres,rustls</code>

From there, you can create the database and perform all database migrations with one simple command:

<code>sqlx database setup</code>

The majority of configuration is done at runtime using <a href="https://crates.io/crates/dotenvy" target="_blank" rel="noopener noreferrer">dotenvy</a> and the <code>.env</code> file. Each of the variables and what they do can be found in the dropdown below. Additionally, there are three command line options that can be used to specify to MeiliSearch what you want to do.

## .env variables & command line options

### Basic configuration

<pre>
<code>DEBUG: Whether debugging tools should be enabled</code>
<code>RUST_LOG: Specifies what information to log, from rust's env-logger; a reasonable default is info,sqlx::query=warn</code>
<code>SITE_URL: The main URL to be used for CORS</code>
<code>CDN_URL: The publicly accessible base URL for files uploaded to the CDN</code>
<code>MODERATION_DISCORD_WEBHOOK: The URL for a Discord webhook where projects pending approval will be sent</code>
<code>CLOUDFLARE_INTEGRATION: Whether labrinth should integrate with Cloudflare's spam protection</code>
<code>DATABASE_URL: The URL for the PostgreSQL database</code>
<code>DATABASE_MIN_CONNECTIONS: The minimum number of concurrent connections allowed to the database at the same time</code>
<code>DATABASE_MAX_CONNECTIONS: The maximum number of concurrent connections allowed to the database at the same time</code>
<code>MEILISEARCH_ADDR: The URL for the MeiliSearch instance used for search</code>
<code>MEILISEARCH_KEY: The name that MeiliSearch is given</code>
<code>BIND_ADDR: The bind address for the server. Supports both IPv4 and IPv6</code>
<code>MOCK_FILE_PATH: The path used to store uploaded files; this has no default value and will panic if unspecified</code>
</pre>

## CDN options

STORAGE_BACKEND: Controls what storage backend is used. This can be either local, backblaze, or s3, but defaults to local

The Backblaze and S3 configuration options are fairly self-explanatory in name, so here's simply their names:
BACKBLAZE_KEY_ID, BACKBLAZE_KEY, BACKBLAZE_BUCKET_ID
S3_ACCESS_TOKEN, S3_SECRET, S3_URL, S3_REGION, S3_BUCKET_NAME

## Search, OAuth, and miscellaneous options

LOCAL_INDEX_INTERVAL: The interval, in seconds, at which the local database is reindexed for searching. Defaults to 3600 seconds (1 hour).
VERSION_INDEX_INTERVAL: The interval, in seconds, at which versions are reindexed for searching. Defaults to 1800 seconds (30 minutes).

The two GitHub OAuth configuration options are also fairly self-explanatory.
GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

RATE_LIMIT_IGNORE_IPS: An array of IPs that should have a lower rate limit factor. This can be useful for allowing the front-end to have a lower rate limit to prevent accidental timeouts.

## Command line options

--skip-first-index: Skips indexing the local database on startup. This is useful to prevent doing unnecessary work when frequently restarting.
--reconfigure-indices: Resets the MeiliSearch settings for the search indices and exits.
--reset-indices: Resets the MeiliSearch indices and exits; this clears all previously indexed mods.

## knossos (frontend)

<a href="https://github.com/modrinth/knossos" target="_blank" rel="noopener noreferrer">knossos</a> is the Nuxt.js frontend. While you're able to use Docker here, you may find it faster to just install <a href="https://www.npmjs.com" target="_blank" rel="noopener noreferrer">npm</a> and run the standard commands from there:

<pre>
npm install
npm run dev
</pre>

Once that's done, you'll be serving knossos on <code>localhost:3000</code> with hot reloading. You can replace the <code>dev</code> in <code>npm run dev</code> with <code>build</code> to build for a production server and <code>start</code> to start the server. You can also use <code>npm run lint</code> to find any eslint problems, and <code>npm run fix</code> to try automatically fixing those problems.

## theseus (launcher), daedalus (metadata host), minos (authentication provider), and ariadne (analytics system)

These Rust programs are still in early development. Before attempting to contribute, ask for info in Discord.

## minotaur (Gradle plugin)

<a href="https://github.com/modrinth/minotaur" target="_blank" rel="noopener noreferrer">Minotaur</a> is the Gradle plugin used to automatically publish artifacts to Modrinth. To run your copy of the plugin in a project, publish it to your local Maven with <code>./gradlew publishToMavenLocal</code> and add <code>mavenLocal()</code> to your buildscript.

Minotaur contains two test environments within it - one with ForgeGradle and one with Fabric Loom. You may tweak with these environments to test whatever you may be trying; just make sure that the <code>modrinth</code> task within each still functions properly. GitHub Actions will validate this if you're making a pull request, so you may want to use <a href="https://github.com/nektos/act" target="_blank" rel="noopener noreferrer"><code>act pull_request</code></a> to test them locally.

# Documentation

The <a href="https://github.com/modrinth/docs" target="_blank" rel="noopener noreferrer">documentation</a> (which you are reading right now!) is the place to find any and all general information about Modrinth and its API. The instructions are largely the same as <a href="#knossos-frontend">knossos</a>, except for the lint commands.
