<script setup lang="ts">
import { RouterLink } from "vue-router";
import VCardLink from "@/shared/components/VCardLink.vue";
</script>

<template>
  <div class="home-page">
    <h1>VueJS Maintainable Code samples</h1>
    <p class="lede">
      Sample code from the Maintainable Vue talk at VueConf US 2026.
    </p>
    <nav class="home-nav" aria-label="Sample routes">
      <VCardLink to="/refs-reactive">Refs vs Reactive</VCardLink>
      <VCardLink to="/props">Props</VCardLink>
      <VCardLink to="/provide-and-inject">Provide &amp; Inject</VCardLink>
      <VCardLink to="/composables">Composables</VCardLink>
      <VCardLink to="/styles">Styles</VCardLink>
      <VCardLink to="/stores">Pinia Stores</VCardLink>
      <VCardLink to="/typescript">TypeScript</VCardLink>
    </nav>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 42rem;
  margin-inline: auto;
  text-align: center;
}

h1 {
  margin: 0 0 1rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.home-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  justify-items: stretch;
  align-items: stretch;
}

.home-nav > * {
  width: 100%;
}
</style>
