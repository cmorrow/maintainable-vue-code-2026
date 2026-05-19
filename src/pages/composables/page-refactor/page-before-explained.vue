<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import VSubHeading from "@/shared/components/VSubHeading.vue";
import type { Post, User, UserSettings } from "@/types";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserSettings,
} from "@/features/composables/api";

const userId = ref("1");

// ── user ── (this pattern repeats 3×) ─────────────────
const user = ref<User | null>(null);
const userLoading = ref(false);
const userError = ref<string | null>(null);

watchEffect(async () => {
  userLoading.value = true;
  userError.value = null;
  try {
    user.value = await fetchUser(userId.value);
  } catch {
    userError.value = "Failed to load user";
  } finally {
    userLoading.value = false;
  }
});

// ── posts ─────────────────────────────────────────────
const posts = ref<Post[]>([]);
const postsLoading = ref(false);
const postsError = ref<string | null>(null);

watchEffect(async () => {
  postsLoading.value = true;
  postsError.value = null;
  try {
    posts.value = await fetchUserPosts(userId.value);
  } catch {
    postsError.value = "Failed to load posts";
  } finally {
    postsLoading.value = false;
  }
});

// ── settings ──────────────────────────────────────────
const settings = ref<UserSettings | null>(null);
const settingsLoading = ref(false);
const settingsError = ref<string | null>(null);

watchEffect(async () => {
  settingsLoading.value = true;
  settingsError.value = null;
  try {
    settings.value = await fetchUserSettings(userId.value);
  } catch {
    settingsError.value = "Failed to load settings";
  } finally {
    settingsLoading.value = false;
  }
});

function toggleNotifications() {
  if (settings.value) {
    settings.value = {
      ...settings.value,
      notifications: !settings.value.notifications,
    };
  }
}

// ── modal ─────────────────────────────────────────────
const modalOpen = ref(false);
function openModal() {
  modalOpen.value = true;
}
function closeModal() {
  modalOpen.value = false;
}

const users = ["1", "2", "3", "4"];
</script>

<template>
  <div class="demo-page">
    <header class="page-header">
      <div class="page-header-top">
        <VSubHeading>Composables - Page Before Explained</VSubHeading>
        <RouterLink to="/composables">← Overview</RouterLink>
      </div>
      <nav class="page-nav" aria-label="Composables pages">
        <RouterLink to="/composables/page-refactor/page-before"
          >Before</RouterLink
        >
        <RouterLink to="/composables/page-refactor/page-after"
          >After</RouterLink
        >
        <RouterLink
          to="/composables/page-refactor/page-before-explained"
          class="active"
          >Before Explained</RouterLink
        >
        <RouterLink to="/composables/page-refactor/page-after-explained"
          >After Explained</RouterLink
        >
      </nav>
      <h1>Before: all logic inline</h1>
      <p class="lede">
        Every data concern — user, posts, settings, and the modal — is managed
        directly in <code>&lt;script setup&gt;</code>. The pattern repeats three
        times; adding a fourth concern means writing it a fourth time.
      </p>
    </header>

    <section class="code-panel code-panel--bad" aria-label="Script setup code">
      <div class="code-panel-header">
        <span class="badge badge--bad">Before</span>
        <span class="code-panel-stat">57 lines in &lt;script setup&gt;</span>
        <span class="code-panel-note"
          >same fetch/loading/error block repeated 3×</span
        >
      </div>
      <pre class="code-block"><code
>const userId = ref('1')

// ── user ── (this pattern repeats 3×) ─────────────────
const user        = ref&lt;User | null&gt;(null)
const userLoading = ref(false)
const userError   = ref&lt;string | null&gt;(null)

watchEffect(async () => {
  userLoading.value = true
  userError.value = null
  try {
    user.value = await fetchUser(userId.value)
  } catch {
    userError.value = 'Failed to load user'
  } finally {
    userLoading.value = false
  }
})

// ── posts ─────────────────────────────────────────────
const posts        = ref&lt;Post[]&gt;([])
const postsLoading = ref(false)
const postsError   = ref&lt;string | null&gt;(null)

watchEffect(async () => {
  postsLoading.value = true
  postsError.value = null
  try {
    posts.value = await fetchUserPosts(userId.value)
  } catch {
    postsError.value = 'Failed to load posts'
  } finally {
    postsLoading.value = false
  }
})

// ── settings ──────────────────────────────────────────
const settings        = ref&lt;UserSettings | null&gt;(null)
const settingsLoading = ref(false)
const settingsError   = ref&lt;string | null&gt;(null)

watchEffect(async () => {
  settingsLoading.value = true
  settingsError.value = null
  try {
    settings.value = await fetchUserSettings(userId.value)
  } catch {
    settingsError.value = 'Failed to load settings'
  } finally {
    settingsLoading.value = false
  }
})

function toggleNotifications() {
  if (settings.value) {
    settings.value = { ...settings.value, notifications: !settings.value.notifications }
  }
}

// ── modal ─────────────────────────────────────────────
const modalOpen = ref(false)
function openModal()  { modalOpen.value = true  }
function closeModal() { modalOpen.value = false }</code></pre>
    </section>

    <div class="demo-area">
      <div class="user-switcher" role="group" aria-label="Switch user">
        <span class="switcher-label">Switch user:</span>
        <button
          v-for="id in users"
          :key="id"
          type="button"
          class="switcher-btn"
          :class="{ active: userId === id }"
          @click="userId = id"
        >
          User {{ id }}
        </button>
      </div>

      <div class="profile-layout">
        <section class="profile-card panel" aria-label="User profile">
          <div v-if="userLoading" class="skeleton-block" aria-hidden="true" />
          <p v-else-if="userError" class="error-msg">{{ userError }}</p>
          <template v-else-if="user">
            <div class="avatar" aria-hidden="true">
              {{ user.name.charAt(0) }}
            </div>
            <div class="profile-info">
              <div class="profile-name-row">
                <h2>{{ user.name }}</h2>
                <span class="role-badge" :class="`role-${user.role}`">{{
                  user.role
                }}</span>
                <span v-if="!user.active" class="inactive-badge">inactive</span>
              </div>
              <p class="profile-email">{{ user.email }}</p>
              <p class="profile-bio">{{ user.bio }}</p>
              <p class="profile-meta">Member since {{ user.joinedAt }}</p>
              <button type="button" class="btn-edit" @click="openModal">
                Edit profile
              </button>
            </div>
          </template>
        </section>

        <div class="secondary-panels">
          <section class="panel" aria-labelledby="posts-heading">
            <h3 id="posts-heading" class="panel-title">Posts</h3>
            <div v-if="postsLoading" class="skeleton-list" aria-hidden="true">
              <div class="skeleton-block" />
              <div class="skeleton-block" />
            </div>
            <p v-else-if="postsError" class="error-msg">{{ postsError }}</p>
            <p v-else-if="posts.length === 0" class="empty-msg">
              No posts yet.
            </p>
            <ul v-else class="post-list">
              <li v-for="post in posts" :key="post.id" class="post-item">
                <strong class="post-title">{{ post.title }}</strong>
                <p class="post-excerpt">{{ post.body.slice(0, 100) }}…</p>
                <time class="post-date">{{ post.createdAt }}</time>
              </li>
            </ul>
          </section>

          <section class="panel" aria-labelledby="settings-heading">
            <h3 id="settings-heading" class="panel-title">Settings</h3>
            <div
              v-if="settingsLoading"
              class="skeleton-list"
              aria-hidden="true"
            >
              <div class="skeleton-block" />
            </div>
            <p v-else-if="settingsError" class="error-msg">
              {{ settingsError }}
            </p>
            <dl v-else-if="settings" class="settings-list">
              <div class="settings-row">
                <dt>Theme</dt>
                <dd>
                  <span class="setting-value">{{ settings.theme }}</span>
                </dd>
              </div>
              <div class="settings-row">
                <dt>Notifications</dt>
                <dd>
                  <span
                    class="setting-value"
                    :class="settings.notifications ? 'val-on' : 'val-off'"
                  >
                    {{ settings.notifications ? "On" : "Off" }}
                  </span>
                  <button
                    type="button"
                    class="btn-toggle"
                    @click="toggleNotifications"
                  >
                    Toggle
                  </button>
                </dd>
              </div>
              <div class="settings-row">
                <dt>Language</dt>
                <dd>
                  <span class="setting-value">{{ settings.language }}</span>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="modalOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.self="closeModal"
      >
        <div class="modal">
          <h2 id="modal-title">Edit profile</h2>
          <p v-if="user">
            Editing <strong>{{ user.name }}</strong> ({{ user.email }})
          </p>
          <p class="modal-note">
            This modal state is managed by a plain <code>ref(false)</code> and
            two functions directly in <code>&lt;script setup&gt;</code>.
          </p>
          <button type="button" class="btn-close" @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.demo-page {
  max-width: 960px;
  margin-inline: auto;
  padding-block: 0.5rem 3rem;
  color: var(--color-text);
}

/* ── header ── */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.page-header-top a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.page-header-top a:hover {
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  font-size: 0.875rem;
}

.nav-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  color: var(--color-text);
}

.link-after {
  color: var(--color-accent) !important;
}

.page-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.12s, color 0.12s;
}

.page-nav a:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.page-nav a.active {
  color: var(--color-accent);
  background: rgba(0, 227, 152, 0.1);
}

h1 {
  margin: 0.25rem 0 0.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-danger);
}

.lede {
  margin: 0;
  max-width: 68ch;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-code-bg);
  color: var(--color-text);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

/* ── code panel ── */
.code-panel {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid;
  margin-bottom: 1.75rem;
}

.code-panel--bad {
  border-color: rgba(231, 76, 60, 0.45);
  background: rgba(231, 76, 60, 0.04);
}

.code-panel-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-bottom: 1px solid rgba(231, 76, 60, 0.2);
  background: rgba(231, 76, 60, 0.07);
}

.badge {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2em 0.6em;
  border-radius: 4px;
}

.badge--bad {
  background: rgba(231, 76, 60, 0.18);
  color: var(--color-danger);
}

.code-panel-stat {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-danger);
  font-family: var(--font-mono);
}

.code-panel-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-left: auto;
}

.code-block {
  margin: 0;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  max-height: 28rem;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.55;
  background: var(--color-code-bg);
}

.code-block code {
  padding: 0;
  background: none;
  border-radius: 0;
  font-size: inherit;
}

/* ── demo area ── */
.user-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.switcher-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.switcher-btn {
  appearance: none;
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.35rem 0.8rem;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.switcher-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border);
}

.switcher-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: start;
}

@media (max-width: 640px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 1.25rem;
  overflow: hidden;
}

/* ── profile card ── */
.profile-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  grid-row: span 1;
}

.avatar {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--color-accent);
  color: #010409;
  font-size: 1.2rem;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.profile-info {
  min-width: 0;
}

.profile-name-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.profile-name-row h2 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-text);
}

.role-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  background: rgba(0, 227, 152, 0.15);
  color: var(--color-accent);
}

.role-badge.role-editor {
  background: rgba(100, 149, 237, 0.15);
  color: #6495ed;
}

.role-badge.role-viewer {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
}

.inactive-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  background: rgba(231, 76, 60, 0.15);
  color: var(--color-danger);
}

.profile-email {
  margin: 0 0 0.4rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.profile-bio {
  margin: 0 0 0.4rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.profile-meta {
  margin: 0 0 0.75rem;
  font-size: 0.76rem;
  color: var(--color-text-subtle);
}

.btn-edit {
  appearance: none;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  border-radius: var(--radius);
  padding: 0.4rem 0.85rem;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.btn-edit:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* ── secondary panels ── */
.secondary-panels {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-title {
  margin: 0 0 0.85rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* skeleton */
.skeleton-block {
  height: 4rem;
  border-radius: var(--radius);
  background: linear-gradient(
    90deg,
    var(--color-surface-elevated) 25%,
    rgba(255, 255, 255, 0.05) 50%,
    var(--color-surface-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  margin-bottom: 0.5rem;
}

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.error-msg {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-danger);
}

.empty-msg {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* posts */
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.post-item {
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.post-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.post-title {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

.post-excerpt {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.post-date {
  font-size: 0.74rem;
  color: var(--color-text-subtle);
}

/* settings */
.settings-list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.settings-row dt {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.settings-row dd {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.setting-value {
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: var(--color-text);
}

.val-on {
  color: var(--color-accent);
}
.val-off {
  color: var(--color-text-muted);
}

.btn-toggle {
  appearance: none;
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-elevated);
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.btn-toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>

<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(1, 4, 9, 0.78);
  backdrop-filter: blur(4px);
}

.modal {
  width: min(100%, 28rem);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0d1117;
  color: #e6edf3;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
}

.modal h2 {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
}

.modal p {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: #8b949e;
  line-height: 1.5;
}

.modal .modal-note {
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.82rem;
}

.modal code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  font-size: 0.82em;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

.btn-close {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: #e6edf3;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-close:hover {
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
