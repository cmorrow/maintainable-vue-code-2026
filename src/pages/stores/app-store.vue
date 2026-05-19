<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useAppStore } from "@/stores/useAppStore";
import type { Role } from "@/stores/useAppStore";

const store = useAppStore();
const { currentUser, isAuthenticated, isAdmin, notifications, theme } =
  storeToRefs(store);

const roles: Role[] = ["admin", "editor", "viewer"];

const stateSnapshot = computed(() =>
  JSON.stringify(
    {
      isAuthenticated: isAuthenticated.value,
      isAdmin: isAdmin.value,
      theme: theme.value,
      currentUser: currentUser.value,
      notifications: notifications.value,
    },
    null,
    2
  )
);
</script>

<template>
  <div class="app-store-page">
    <header class="page-header">
      <div class="heading-row">
        <h1>App / Global Store</h1>
        <RouterLink to="/stores" class="back-link">← Back to Stores</RouterLink>
      </div>
      <p class="lede">
        A <strong>global store</strong> holds state that spans the entire
        application lifetime — data that any component, on any route, might
        need. In Pinia this lives in <code>src/stores/</code> and is consumed
        anywhere via <code>useAppStore()</code> with no wiring required.
      </p>
    </header>

    <!-- Notification toasts -->
    <div
      v-if="notifications.length"
      class="toasts"
      role="status"
      aria-live="polite"
    >
      <div
        v-for="n in notifications"
        :key="n.id"
        class="toast"
        :class="n.type"
      >
        <span>{{ n.message }}</span>
        <button
          class="toast-dismiss"
          aria-label="Dismiss"
          @click="store.dismissNotification(n.id)"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Live demo panel -->
    <section class="panel demo-panel">
      <div class="demo-grid">
        <!-- Auth controls -->
        <div class="controls-col">
          <h2 class="col-heading">Live Demo</h2>

          <div v-if="!isAuthenticated" class="auth-block">
            <p class="control-label">Sign in as:</p>
            <div class="role-buttons">
              <button
                v-for="role in roles"
                :key="role"
                class="role-btn"
                :class="role"
                @click="store.login(role)"
              >
                {{ role }}
              </button>
            </div>
          </div>

          <div v-else class="user-block">
            <div class="user-card">
              <div class="user-avatar">{{ currentUser!.initials }}</div>
              <div class="user-meta">
                <strong class="user-name">{{ currentUser!.name }}</strong>
                <span class="user-email">{{ currentUser!.email }}</span>
                <span class="role-badge" :class="currentUser!.role">{{
                  currentUser!.role
                }}</span>
              </div>
            </div>

            <div class="switch-row">
              <p class="control-label">Switch role:</p>
              <div class="role-buttons">
                <button
                  v-for="role in roles"
                  :key="role"
                  class="role-btn small"
                  :class="[role, { active: currentUser!.role === role }]"
                  @click="store.login(role)"
                >
                  {{ role }}
                </button>
              </div>
            </div>

            <button class="logout-btn" @click="store.logout()">Sign out</button>
          </div>

          <div class="theme-row">
            <p class="control-label">Theme:</p>
            <div class="role-buttons">
              <button
                class="role-btn small"
                :class="{ active: theme === 'dark' }"
                @click="theme = 'dark'"
              >
                Dark
              </button>
              <button
                class="role-btn small"
                :class="{ active: theme === 'light' }"
                @click="theme = 'light'"
              >
                Light
              </button>
            </div>
          </div>
        </div>

        <!-- State inspector -->
        <div class="inspector-col">
          <h3 class="inspector-heading">
            <span class="inspector-dot" />
            Store State
            <span class="inspector-path">src/stores/useAppStore.ts</span>
          </h3>
          <pre class="state-json">{{ stateSnapshot }}</pre>
          <p class="inspector-note">
            Any component on any route calls <code>useAppStore()</code> and
            gets this same reactive object. No parent needed, no provide/inject
            chain.
          </p>
        </div>
      </div>
    </section>

    <!-- Do / Don't guidance -->
    <section class="guidance-section">
      <div class="guidance-grid">
        <div class="guidance-card do">
          <h3 class="guidance-heading">
            <span class="guidance-icon do-icon">✓</span>
            Belongs in a global store
          </h3>
          <ul class="guidance-list">
            <li>Current user &amp; session data</li>
            <li>
              Auth status (<code>isAuthenticated</code>,
              <code>isAdmin</code>)
            </li>
            <li>App-wide notifications and toasts</li>
            <li>UI preferences: theme, locale, timezone</li>
            <li>Feature flags fetched from the server</li>
            <li>Cart or basket (persists across routes)</li>
          </ul>
        </div>

        <div class="guidance-card dont">
          <h3 class="guidance-heading">
            <span class="guidance-icon dont-icon">✗</span>
            Does not belong in a global store
          </h3>
          <ul class="guidance-list">
            <li>Page-specific filters or search queries</li>
            <li>Form state: draft values, validation errors</li>
            <li>Server response cache — use a query library</li>
            <li>Modal or dialog open/close state</li>
            <li>Hover, focus, or other transient UI state</li>
            <li>Data that only a single route ever reads</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app-store-page {
  max-width: 1000px;
  margin-inline: auto;
  padding-block: 0.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

h1 {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.back-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
  white-space: nowrap;
}

.back-link:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

.lede {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.65;
  max-width: 70ch;
}

.lede strong {
  color: var(--color-text);
}

code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-code-bg);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

/* Toasts */
.toasts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 1rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  border: 1px solid transparent;
}

.toast.success {
  background: rgba(var(--color-accent-rgb) / 0.1);
  border-color: rgba(var(--color-accent-rgb) / 0.3);
  color: var(--color-accent);
}

.toast.info {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--color-border-subtle);
  color: var(--color-text-muted);
}

.toast.warning {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.toast-dismiss {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 1.1rem;
  line-height: 1;
  opacity: 0.7;
  padding: 0;
}

.toast-dismiss:hover {
  opacity: 1;
}

/* Panel */
.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.demo-panel {
  padding: 1.75rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 680px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

/* Controls column */
.controls-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.col-heading {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.control-label {
  margin: 0 0 0.5rem;
  font-size: 0.775rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-subtle);
}

.auth-block,
.user-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-buttons {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.role-btn {
  padding: 0.45rem 1rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  background: var(--color-surface-elevated);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.12s;
}

.role-btn.small {
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
}

.role-btn:hover,
.role-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb) / 0.08);
}

.role-btn.admin:hover,
.role-btn.admin.active {
  border-color: #a78bfa;
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.08);
}

.role-btn.editor:hover,
.role-btn.editor.active {
  border-color: #60a5fa;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.08);
}

.role-btn.viewer:hover,
.role-btn.viewer.active {
  border-color: var(--color-text-muted);
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(var(--color-accent-rgb) / 0.15);
  border: 1px solid rgba(var(--color-accent-rgb) / 0.3);
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.user-name {
  font-size: 0.9rem;
  color: var(--color-text);
}

.user-email {
  font-size: 0.775rem;
  color: var(--color-text-subtle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.role-badge {
  align-self: flex-start;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  background: rgba(var(--color-accent-rgb) / 0.12);
  color: var(--color-accent);
}

.role-badge.admin {
  background: rgba(167, 139, 250, 0.12);
  color: #a78bfa;
}

.role-badge.editor {
  background: rgba(96, 165, 250, 0.12);
  color: #60a5fa;
}

.switch-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.theme-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border-subtle);
}

.logout-btn {
  align-self: flex-start;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-text-subtle);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.12s;
}

.logout-btn:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

/* State inspector */
.inspector-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.inspector-heading {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-subtle);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.inspector-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.inspector-path {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  margin-left: auto;
}

.state-json {
  margin: 0;
  padding: 1rem;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  overflow: auto;
  white-space: pre;
  flex: 1;
}

.inspector-note {
  margin: 0;
  font-size: 0.775rem;
  line-height: 1.55;
  color: var(--color-text-subtle);
}

/* Guidance section */
.guidance-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guidance-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .guidance-grid {
    grid-template-columns: 1fr;
  }
}

.guidance-card {
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid;
}

.guidance-card.do {
  background: rgba(var(--color-accent-rgb) / 0.04);
  border-color: rgba(var(--color-accent-rgb) / 0.2);
}

.guidance-card.dont {
  background: rgba(231, 76, 60, 0.04);
  border-color: rgba(231, 76, 60, 0.2);
}

.guidance-heading {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
}

.guidance-icon {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 900;
  flex-shrink: 0;
}

.do-icon {
  background: rgba(var(--color-accent-rgb) / 0.15);
  color: var(--color-accent);
}

.dont-icon {
  background: rgba(231, 76, 60, 0.15);
  color: var(--color-danger);
}

.guidance-list {
  margin: 0;
  padding: 0 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.guidance-list li {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}
</style>
