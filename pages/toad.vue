<template>
  <div class="card">
    <h1>Toad</h1>
    <p>You've been toad! 🐸</p>
    <img
      src="https://cdn.modrinth.com/frog.png"
      alt="a photorealistic painting of a frog labyrinth"
    />
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style lang="scss" scoped>
.card {
  width: calc(100% - 2 * var(--spacing-card-md));
  max-width: 1280px;
  margin-inline: auto;
  text-align: center;
  box-sizing: border-box;
  margin-block: var(--spacing-card-md);
}

img {
  margin-block: 0 1.5rem;
  width: 60%;
  max-width: 40rem;
}
</style>
