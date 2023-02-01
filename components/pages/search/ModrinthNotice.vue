<template>
  <div
    v-if="
      projectType === 'modpack' && $orElse($cosmetics.modpacksAlphaNotice, true)
    "
    class="card warning"
    aria-label="Warning"
  >
    {{ props.notice }}
    <a
      href="https://docs.modrinth.com/docs/modpacks/playing_modpacks/"
      :target="$external()"
      >playing modpacks</a
    >
    with
    <a
      rel="noopener noreferrer nofollow"
      href="https://atlauncher.com/about"
      :target="$external()"
      >ATLauncher</a
    >,
    <a
      rel="noopener noreferrer nofollow"
      href="https://multimc.org/"
      :target="$external()"
      >MultiMC</a
    >, and
    <a
      rel="noopener noreferrer nofollow"
      href="https://prismlauncher.org"
      :target="$external()"
    >
      Prism Launcher</a
    >. Pack creators can reference our documentation on
    <a
      href="https://docs.modrinth.com/docs/modpacks/creating_modpacks/"
      :target="$external()"
      >creating modpacks</a
    >. Join us on
    <a
      rel="noopener noreferrer nofollow"
      href="https://discord.gg/EUHuJHt"
      :target="$external()"
      >Discord</a
    >
    for support.
  </div>
</template>
<script>
export default {
  name: 'ModrinthNotice',
  props: {
    projectType: {
      type: String,
      default: null,
      sync: true,
    },
    notice: {
      type: String,
      default: null,
      sync: true,
    },
  },
}
</script>
