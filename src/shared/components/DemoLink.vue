<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
  label: string;
  description?: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex flex-col text-left gap-4 w-full max-w-sm px-8 py-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg no-underline text-[var(--color-text)] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-md"
  >
    <span class="font-semibold text-xl text-[var(--color-accent)]">
      {{ label }}
    </span>
    <span class="flex-1 text-left text-[var(--color-text-muted)] text-lg">
      {{ description }}
    </span>
    <span
      class="text-xl text-right text-[var(--color-accent)] transition-transform duration-150 group-hover:translate-x-1"
    >
      →
    </span>
  </RouterLink>
</template>
