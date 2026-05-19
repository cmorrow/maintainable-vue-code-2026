<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="css-module-page">
    <div class="page-header">
      <h1>CSS Modules</h1>
      <RouterLink to="/styles" class="back-link"
        >← Scoped CSS Example</RouterLink
      >
    </div>

    <div :class="$style.moduleExample">
      <article :class="$style.card">
        <h3 :class="$style.title">Maintainable Vue</h3>
        <p :class="$style.description">
          Keep components focused, simple, and easy to change.
        </p>
        <button :class="$style.button">Learn More</button>
      </article>
    </div>
  </div>
</template>

<style module>
.moduleExample h3 {
  color: red;
  font-weight: bold;
}

.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fdfdfd;
}

.title {
  color: black;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.description {
  color: #555;
  margin: 0 0 1rem;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: #2e8ef7;
  color: white;
  cursor: pointer;
}
</style>
