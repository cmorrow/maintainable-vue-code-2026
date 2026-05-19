<script setup lang="ts">
import { RouterLink } from "vue-router";
import CssModule from "./css-module.vue";
</script>

<template>
  <div class="styles-page">
    <div class="page-header">
      <h1>Styles</h1>
      <RouterLink to="/" class="back-link">← Back to home</RouterLink>
    </div>

    <p class="intro">
      Vue supports different component-level styling options. Below are two
      common patterns: scoped CSS and CSS Modules.
    </p>
    <RouterLink to="/styles/css-module" class="back-link"
      >View CSS Modules example →</RouterLink
    >

    <section class="example">
      <h2>Scoped CSS</h2>
      <div class="scoped-card">
        <h3>Scoped card</h3>
        <p>
          Styles in this section are defined with
          <code>&lt;style scoped&gt;</code>, so they only apply to this
          component.
        </p>
        <button class="scoped-button">Scoped Button</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.styles-page {
  max-width: 56rem;
  margin-inline: auto;
  padding: 2rem 1rem;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.page-header h1 {
  margin: 0;
}

.intro {
  margin: 0 0 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.example {
  margin-bottom: 2.5rem;
}

.scoped-card {
  padding: 1.25rem;
  border: 1px solid #d6d6d6;
  border-radius: 14px;
  background: white;
}

h3 {
  color: black;
  font-size: 1.5rem;
  margin-top: 0;
}

.scoped-card p {
  margin: 0.5rem 0 1rem;
  color: #555;
}

.scoped-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  border: none;
  border-radius: 10px;
  background: var(--color-accent);
  color: white;
  cursor: pointer;
}

.back-link {
  display: inline-block;
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
}
</style>
