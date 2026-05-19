<script setup lang="ts">
import { ref } from "vue";
import PropsJS from "@/features/props/PropsJS.vue";
import PropsTSVerbose from "@/features/props/PropsTSVerbose.vue";
import PropsTSVerboseImproved from "@/features/props/PropsTSVerboseImproved.vue";
import PropsTypeBased from "@/features/props/PropsTypeBased.vue";
import VPageHeader from "@/shared/components/VPageHeader.vue";

const tabs = ["JS", "TS Concise", "TS Verbose", "TS Verbose Improved"] as const;
type Tab = (typeof tabs)[number];
const activeTab = ref<Tab>("JS");
</script>

<template>
  <div>
    <header class="page-header">
      <VPageHeader title="Props">
        <p class="lede">
          Multiple ways to define props<br />
          <a href="https://vuejs.org/guide/components/props.html#props"
            >https://vuejs.org/guide/components/props.html#props</a
          >
        </p>
      </VPageHeader>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-btn"
        :class="{ 'tab-btn--active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="tab-panel">
      <PropsJS v-if="activeTab === 'JS'" :title="activeTab" :count="5" />
      <PropsTypeBased
        v-else-if="activeTab === 'TS Concise'"
        :title="activeTab"
        :count="12"
      />
      <PropsTSVerbose
        v-else-if="activeTab === 'TS Verbose'"
        :title="activeTab"
        :count="2"
      />
      <PropsTSVerboseImproved
        v-else-if="activeTab === 'TS Verbose Improved'"
        :title="activeTab"
        :count="2"
      />
    </div>
  </div>
</template>

<style scoped>
.lede {
  margin: 0 0 2rem;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0;
}

.tab-btn {
  padding: 0.45rem 1rem;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn--active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

.tab-panel {
  max-width: 28rem;
}
</style>
