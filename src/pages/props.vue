<script setup lang="ts">
import { shallowRef, ref, watch } from "vue";
import type { Component } from "vue";
import { useRoute, useRouter } from "vue-router";
import PropsJS from "@/features/props/PropsJS.vue";
import PropsJSRaw from "@/features/props/PropsJS.vue?raw";
import PropsRuntime from "@/features/props/PropsRuntime.vue";
import PropsRuntimeRaw from "@/features/props/PropsRuntime.vue?raw";
import PropsTypeBased from "@/features/props/PropsTypeBased.vue";
import PropsTypeBasedRaw from "@/features/props/PropsTypeBased.vue?raw";
import PropsTypeBasedInterface from "@/features/props/PropsTypeBasedInterface.vue";
import PropsTypeBasedInterfaceRaw from "@/features/props/PropsTypeBasedInterface.vue?raw";
import VPageHeader from "@/shared/components/VPageHeader.vue";
import ComponentCodeDisplay from "@/shared/components/ComponentCodeDisplay.vue";
import VLink from "@/shared/components/VLink.vue";
import { extractScript } from "@/shared/utils/extractScript";

interface TabConfig {
  title: string;
  component: Component;
  code: string;
  count: number;
}

const tabs: TabConfig[] = [
  {
    title: "JS",
    component: PropsJS,
    code: extractScript(PropsJSRaw),
    count: 5,
  },
  {
    title: "TS Runtime",
    component: PropsRuntime,
    code: extractScript(PropsRuntimeRaw),
    count: 5,
  },
  {
    title: "TS Type-Based",
    component: PropsTypeBased,
    code: extractScript(PropsTypeBasedRaw),
    count: 12,
  },
  {
    title: "TS Type-Based Interface",
    component: PropsTypeBasedInterface,
    code: extractScript(PropsTypeBasedInterfaceRaw),
    count: 12,
  },
];

const route = useRoute();
const router = useRouter();

function findTab(title: string | undefined) {
  return tabs.find((t) => t.title === title) ?? tabs[0];
}

const activeTab = shallowRef<TabConfig>(findTab(route.query.tab as string));

function selectTab(tab: TabConfig) {
  activeTab.value = tab;
  router.push({ query: { tab: tab.title } });
}

watch(
  () => route.query.tab,
  (title) => {
    activeTab.value = findTab(title as string);
  },
);

const statusOptions = [
  "pending",
  "success",
  "failed",
  "syncing",
  "error",
  "whoops",
] as const;
type Status = (typeof statusOptions)[number];

const count = ref(activeTab.value.count);
const status = ref<Status | null>(null);

watch(activeTab, (tab) => {
  count.value = tab.count;
});
</script>

<template>
  <div>
    <header class="page-header">
      <VPageHeader title="Props">
        <div class="flex items-center justify-between">
          <div>
            <div>
              Exploring multiple ways to define props; including runtime and
              type-based
            </div>
            <a
              href="https://vuejs.org/guide/components/props.html#props"
              target="_blank"
              >https://vuejs.org/guide/components/props.html#props</a
            >
          </div>
          <div>
            <VLink to="/props/multiple-types" class="mt-3"
              >Count: Multiple Types Demo</VLink
            >
          </div>
        </div>
      </VPageHeader>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.title"
        class="tab-btn"
        :class="{ 'tab-btn--active': activeTab === tab }"
        @click="selectTab(tab)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="controls">
      <div class="control-group">
        <label for="count-input">Count</label>
        <input
          id="count-input"
          v-model.number="count"
          type="number"
          min="0"
          max="100"
        />
      </div>
      <div class="control-group">
        <label>Status</label>
        <div class="status-options">
          <button
            v-for="s in statusOptions"
            :key="s"
            class="status-btn"
            :class="{ 'status-btn--active': status === s }"
            @click="status = s"
          >
            {{ s }}
          </button>
        </div>
      </div>
    </div>

    <div class="tab-panel">
      <ComponentCodeDisplay :code="activeTab.code">
        <component
          :is="activeTab.component"
          :title="activeTab.title"
          :count="count"
          v-bind="status !== null ? { status } : {}"
        />
      </ComponentCodeDisplay>
    </div>
  </div>
</template>

<style scoped>
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
  width: 100%;
}

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

.control-group input[type="number"] {
  width: 5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
}

.status-options {
  display: flex;
  gap: 0.35rem;
}

.status-btn {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.status-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text);
}

.status-btn--active {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: rgba(0, 227, 152, 0.08);
}
</style>
