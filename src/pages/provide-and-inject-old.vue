<script setup lang="ts">
import { computed, ref } from "vue";
import type { Component } from "vue";
import { RouterLink } from "vue-router";
import VPageHeader from "@/shared/components/VPageHeader.vue";
import VSubHeading from "@/shared/components/VSubHeading.vue";
import UsersPage from "@/features/provide-inject-old/01-props-emits/UsersPage.vue";
import DashboardPage from "@/features/provide-inject-old/02-basic-provide-inject/DashboardPage.vue";
import ModalExample from "@/features/provide-inject-old/03-modal-context/ModalExample.vue";
import FormExample from "@/features/provide-inject-old/04-form-context/FormExample.vue";
import TabsExample from "@/features/provide-inject-old/05-tabs-context/TabsExample.vue";

const demos = {
  "props-emits": UsersPage,
  dashboard: DashboardPage,
  modal: ModalExample,
  form: FormExample,
  "tabs-context": TabsExample,
} as const satisfies Record<string, Component>;

type DemoTabId = keyof typeof demos;
type TabId = DemoTabId | "decision-guide";

const tabs: { id: TabId; label: string; description: string }[] = [
  {
    id: "props-emits",
    label: "Props & emits",
    description:
      "Direct parent-to-child data and child-to-parent events. From shared/DecisionGuide.md: use props when the child needs data from its direct parent, and emits when the child tells its direct parent something happened.",
  },
  {
    id: "dashboard",
    label: "Provide / inject",
    description:
      "Tree-scoped context: the layout and sidebar no longer forward currentUser. A descendant injects the same context the root of the feature provides.",
  },
  {
    id: "modal",
    label: "Modal",
    description:
      "Feature-local UI state: open/close actions and readonly open state are provided once; buttons and teleported modal consume the same context.",
  },
  {
    id: "form",
    label: "Form",
    description:
      "Fields register with the form on mount; validateForm walks registered validators—classic inject pattern for compound form components.",
  },
  {
    id: "tabs-context",
    label: "Tabs",
    description:
      "Active tab and setActiveTab live on the parent; tab buttons and panels inject shared context instead of threading props through every layer.",
  },
  {
    id: "decision-guide",
    label: "Decision guide",
    description:
      "Condensed rules from features/provide-inject/shared/DecisionGuide.md for choosing props, emits, provide/inject, or Pinia.",
  },
];

const activeTab = ref<TabId>("props-emits");

const activePanelMeta = computed(
  () => tabs.find((t) => t.id === activeTab.value) ?? tabs[0],
);

/** When set, the active tab is a live demo (not the markdown decision guide). */
const activeDemoId = computed(() =>
  activeTab.value === "decision-guide" ? null : activeTab.value,
);

const tablistId = "provide-inject-tablist";
</script>

<template>
  <div class="provide-inject-view">
    <header class="page-header">
      <VPageHeader title="Provide & Inject">
        <div>
          Samples from
          <code>features/provide-inject</code>: props and emits stay the default
          for direct relationships; provide/inject carries shared context down
          the tree; Pinia fits app-wide state (see the decision guide tab).
        </div>
        <a
          href="https://vuejs.org/guide/components/provide-inject.html#provide-inject"
          target="_blank"
          >https://vuejs.org/guide/components/provide-inject.html#provide-inject</a
        >
      </VPageHeader>
    </header>

    <div class="tabs-shell panel">
      <div
        class="tablist-wrap"
        role="tablist"
        :id="tablistId"
        aria-label="Provide and inject samples"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="tab-trigger"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :id="`tab-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-panel-wrap">
        <p class="tab-lede">{{ activePanelMeta.description }}</p>

        <p v-if="activeTab === 'dashboard'" class="tab-detail">
          In <code>DashboardPage.vue</code>, the <code>currentUser</code> ref is
          created and passed to
          <code>provide(currentUserKey, currentUser)</code>. That same ref is
          read in <code>UserMenu.vue</code> via
          <code>inject(currentUserKey)</code>—so
          <code>DashboardLayout.vue</code> and <code>Sidebar.vue</code> never
          receive or forward <code>currentUser</code> as a prop; only the
          ancestor that owns the state and the deep child that needs it are
          involved.
        </p>

        <div
          v-if="activeDemoId"
          :id="`panel-${activeDemoId}`"
          class="demo-stage"
          role="tabpanel"
          :aria-labelledby="`tab-${activeDemoId}`"
          tabindex="0"
        >
          <KeepAlive>
            <component :is="demos[activeDemoId]" :key="activeDemoId" />
          </KeepAlive>
        </div>

        <article
          v-show="activeTab === 'decision-guide'"
          id="panel-decision-guide"
          class="decision-guide"
          role="tabpanel"
          aria-labelledby="tab-decision-guide"
          tabindex="0"
        >
          <p class="decision-guide-intro">
            The following matches
            <code>shared/DecisionGuide.md</code> in this feature folder.
          </p>

          <section aria-labelledby="dg-props">
            <h2 id="dg-props">Use props when</h2>
            <p>The child needs data from its direct parent.</p>
            <pre
              class="code-block"
              aria-label="Example"
            ><code>&lt;UserCard :user="user" /&gt;</code></pre>
          </section>

          <section aria-labelledby="dg-emits">
            <h2 id="dg-emits">Use emits when</h2>
            <p>
              The child needs to tell its direct parent that something happened.
            </p>
            <pre
              class="code-block"
              aria-label="Example"
            ><code>&lt;UserCard @edit="editUser" /&gt;</code></pre>
          </section>

          <section aria-labelledby="dg-provide">
            <h2 id="dg-provide">Use provide/inject when</h2>
            <p>
              A deeply nested descendant needs shared context from an ancestor.
            </p>
            <pre
              class="code-block"
              aria-label="provide example"
            ><code>provide(currentUserKey, currentUser)</code></pre>
            <pre
              class="code-block"
              aria-label="inject example"
            ><code>const currentUser = inject(currentUserKey)</code></pre>
          </section>

          <section aria-labelledby="dg-pinia">
            <h2 id="dg-pinia">Use Pinia when</h2>
            <p>
              The state is app-wide, shared across unrelated routes/features, or
              needs devtools-friendly centralized management.
            </p>
            <p class="list-label">Examples:</p>
            <ul>
              <li>Logged-in user</li>
              <li>Cart</li>
              <li>Permissions</li>
              <li>Notifications</li>
              <li>App settings</li>
              <li>Cached API data</li>
              <li>Cross-page filters</li>
            </ul>
          </section>
        </article>
      </div>
    </div>

    <footer class="page-footer">
      <RouterLink class="home-link" to="/">← Back to home</RouterLink>
      <div class="quick-links">
        <span>Other topics:</span>
        <RouterLink to="/props">/props</RouterLink>
      </div>
    </footer>
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

h1 {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--color-accent);
}

.lede {
  margin: 0;
  max-width: 70ch;
  line-height: 1.55;
  color: var(--color-text-muted);
  font-size: 0.95rem;
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
  transition: color 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}

.tab-trigger:hover {
  color: var(--color-text);
}

.tab-trigger[aria-selected="true"] {
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

.tab-detail {
  margin: 0 0 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-width: 72ch;
}

.tab-detail code {
  font-size: 0.82em;
}

.demo-stage {
  min-height: 8rem;
}

.decision-guide {
  max-width: 65ch;
}

.decision-guide-intro {
  margin: 0 0 1.25rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.decision-guide section {
  margin-bottom: 1.5rem;
}

.decision-guide h2 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  color: var(--color-text);
}

.decision-guide p {
  margin: 0 0 0.65rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.list-label {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.decision-guide ul {
  margin: 0.35rem 0 0;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-block {
  margin: 0.5rem 0 0;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  background: var(--color-code-bg);
  border: 1px solid var(--color-border-subtle);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.45;
}

.code-block code {
  padding: 0;
  background: none;
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

/* 01 — UserCard list */
:deep(.user-card) {
  padding: 1rem 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  margin-bottom: 0.75rem;
  max-width: 22rem;
}

:deep(.user-card h3) {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  color: var(--color-text);
}

:deep(.user-card p) {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

:deep(.user-card button) {
  appearance: none;
  border: none;
  border-radius: var(--radius);
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--color-accent);
  color: #010409;
}

/* 02 — Dashboard */
:deep(.dashboard-layout) {
  display: grid;
  grid-template-columns: minmax(10rem, 14rem) 1fr;
  gap: 1.5rem;
  align-items: start;
}

:deep(.dashboard-layout aside) {
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
}

:deep(.user-menu) {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

:deep(.user-menu strong) {
  color: var(--color-text);
}

:deep(.dashboard-layout section h1) {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--color-text);
}

:deep(.dashboard-layout section p) {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.5;
  font-size: 0.9rem;
}

/* 03 — Modal trigger (backdrop is teleported; see second style block) */
:deep(button:not([aria-selected])) {
  font: inherit;
}

.provide-inject-view :deep(button:not([aria-selected])) {
  appearance: none;
  border: none;
  border-radius: var(--radius);
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--color-accent);
  color: #010409;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.provide-inject-view :deep(button:not([aria-selected]):hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 227, 152, 0.25);
}

/* 04 — Form */
:deep(form) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 24rem;
}

:deep(form label) {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

:deep(form input) {
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-size: 0.9rem;
}

:deep(form span:not(:empty)) {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-danger);
}

:deep(form button[type="submit"]) {
  align-self: flex-start;
}

/* 05 — Tabs sample */
:deep(.tabs) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.tab-list) {
  display: flex;
  gap: 0.5rem;
}

:deep(.tab-list button) {
  appearance: none;
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text-muted);
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

:deep(.tab-list button[aria-selected="true"]) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent);
}

:deep(.tabs section h2) {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  color: var(--color-text);
}

:deep(.tabs section p) {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>

<style>
/* AppModal teleports to document.body — scoped styles do not apply */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(1, 4, 9, 0.72);
  backdrop-filter: blur(4px);
}

.modal {
  width: min(100%, 26rem);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0d1117;
  color: #e6edf3;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
}

.modal h2 {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
}

.modal p {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #8b949e;
  line-height: 1.5;
}

.modal button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #3fb950;
  font-weight: 600;
  padding: 0.45rem 0.95rem;
  border-radius: 8px;
  cursor: pointer;
}

.modal button:hover {
  border-color: #3fb950;
}
</style>
