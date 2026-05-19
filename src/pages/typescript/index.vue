<script setup lang="ts">
import DemoLink from "@/shared/components/DemoLink.vue";
import VPageHeader from "@/shared/components/VPageHeader.vue";
</script>

<template>
  <div class="typescript-index">
    <header class="page-header">
      <VPageHeader title="TypeScript Best Practices" :canToggleDescription="false" />
    </header>

    <nav class="demo-links" aria-label="TypeScript demos">
      <DemoLink
        to="/typescript/never-use-any"
        label="Never Use any"
        description="How any silently removes type safety and how typed interfaces catch bugs at compile time"
      />
      <DemoLink
        to="/typescript/type-vs-interface"
        label="type vs interface"
        description="Why type enables derived types (Omit, Pick, Partial) while interface forces manual duplication"
      />
    </nav>
  </div>
</template>

<style scoped>
.typescript-index {
  margin-inline: auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 3rem;
}

.demo-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
}
</style>
