<template>
  <p class="eyebrow"><slot /></p>
</template>

<style scoped>
.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-accent);
}
</style>