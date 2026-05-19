<script setup lang="ts">
import { ref } from "vue";
import VLink from "@/shared/components/VLink.vue";
import VPageHeader from "@/shared/components/VPageHeader.vue";
import ComponentCodeDisplay from "@/shared/components/ComponentCodeDisplay.vue";
import PropsRuntime from "@/features/props/PropsRuntime.vue";
import PropMultipleTypes from "@/pages/props/multiple-types.vue?raw";
import { extractTemplate } from "@/shared/utils/extractTemplate";

const code = extractTemplate(PropMultipleTypes, true);
const countString = ref("42");
</script>

<template>
  <div>
    <header class="page-header">
      <VPageHeader title="Props — String Count">
        <div>
          Demonstrating how <code>type: [Number, String]</code> allows a count
          prop to accept a string value and coerce it at runtime.
        </div>
        <RouterLink to="/props">← Back to Props</RouterLink>
      </VPageHeader>
    </header>
    <ComponentCodeDisplay :code="code" lang="vue-html">
      <PropsRuntime title="TS Runtime Count Types" :count="2" />
    </ComponentCodeDisplay>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.control-group input[type="text"] {
  width: 8rem;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
}
</style>
