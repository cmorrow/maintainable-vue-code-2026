<script setup lang="ts">
import { RouterLink } from "vue-router";
import VPageHeader from "@/shared/components/VPageHeader.vue";
import DashboardPage from "@/features/provide-inject/dashboard-user-context/DashboardPage.vue";
import { provideInjectTabs as tabs } from "@/features/provide-inject/tabs";

const description =
  "A typed Symbol injection key from currentUserContext.ts. DashboardPage provides readonly state and an update action; CurrentUserRoleEditor injects it four levels deep. The Symbol is unique (no accidental collisions), and InjectionKey<CurrentUserContext> lets TypeScript verify the provided and injected shapes.";
</script>

<template>
  <div class="provide-inject-view">
    <header class="page-header">
      <VPageHeader title="Provide & Inject">
        <p>{{ description }}</p>
        <a
          href="https://vuejs.org/guide/components/provide-inject.html#provide-inject"
          target="_blank"
          >https://vuejs.org/guide/components/provide-inject.html#provide-inject</a
        >
      </VPageHeader>
    </header>

    <div class="tabs-shell panel">
      <nav class="tablist-wrap" aria-label="Provide and inject samples">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.path"
          :to="tab.path"
          class="tab-trigger"
        >
          {{ tab.label }}
        </RouterLink>
      </nav>

      <div class="tab-panel-wrap">
        <div class="demo-stage">
          <DashboardPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.provide-inject-view {
  max-width: 960px;
  margin-inline: auto;
  padding-block: 0.5rem 2rem;
  color: var(--color-text);
}

.page-header {
  margin-bottom: 1.5rem;
}

code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-code-bg);
  color: var(--color-text);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

.panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}

.tabs-shell {
  display: flex;
  flex-direction: column;
}

.tablist-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.75rem 0.75rem 0;
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
}

.tab-trigger {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius) var(--radius) 0 0;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}

.tab-trigger:hover {
  color: var(--color-text);
}

.tab-trigger.router-link-exact-active {
  color: var(--color-accent);
  background: var(--color-surface);
  border-color: var(--color-border-subtle);
  border-bottom-color: var(--color-surface);
  margin-bottom: -1px;
}

.tab-panel-wrap {
  padding: 1.25rem 1.5rem 1.5rem;
}

.tab-lede {
  margin: 0 0 1.25rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-width: 72ch;
}

.component-label {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.demo-stage {
  min-height: 8rem;
}

.page-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-subtle);
  font-size: 0.9rem;
}

.home-link {
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
}

.home-link:hover {
  text-decoration: underline;
  color: var(--color-accent-hover);
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  color: var(--color-text-muted);
}

.quick-links a {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
}

.quick-links a:hover {
  text-decoration: underline;
  color: var(--color-accent-hover);
}

:deep(.dashboard-layout) {
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 1.5rem;
  align-items: start;
}

:deep(.dashboard-sidebar) {
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
}

:deep(.dashboard-main) {
  padding: 0.5rem 0;
}

:deep(.dashboard-main h1) {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

:deep(.dashboard-main p) {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

:deep(.dashboard-user-menu h2) {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
}

:deep(.current-user-role-editor p) {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

:deep(.current-user-role-editor p strong) {
  color: var(--color-text);
}

:deep(.current-user-role-editor label) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

:deep(.current-user-role-editor select) {
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
}

:deep(.current-user-role-editor select:focus) {
  outline: none;
  box-shadow: none;
}
</style>
