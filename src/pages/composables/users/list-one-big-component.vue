<script setup lang="ts">
// 😬 ONE BIG COMPONENT — every concern lives here
// ~200 lines of script, zero composables, zero tests possible.
// Every change risks breaking something unrelated.

import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { mockUsers } from '@/mocks/db'
import type { User, UserRole } from '@/types'

// ─── "local DB" duplicated inline ─────────────────────────────────────────────
// No abstraction. If another page needs user storage, this gets copy-pasted.
// When the storage key changes, you have to find every copy.
const STORAGE_KEY = 'vue-demo-users'

function loadFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as User[]
  } catch {}
  return mockUsers.map(u => ({ ...u }))
}

function saveToStorage(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function delay(ms = 400): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
// ──────────────────────────────────────────────────────────────────────────────

// ─── user list state ───────────────────────────────────────────────────────────
const users = ref<User[]>([])
const loading = ref(false)

// ⚠️ ONE error ref shared across ALL operations (load, save, delete).
// When a delete fails right after a failed load, the error message is gone.
// You cannot tell which operation actually failed without extra flags.
const error = ref<string | null>(null)

// ⚠️ watch + immediate:true instead of just calling load() directly.
// This works, but now "when does this run?" is non-obvious.
// If userId ever became reactive, this would silently re-run — hidden side effect.
// Try testing this: you'd have to mount the full component to trigger this watcher.
const _loadTrigger = ref(0)
watch(
  _loadTrigger,
  async () => {
    loading.value = true
    error.value = null  // ⚠️ wipes out any existing error (save error, delete error…)
    try {
      await delay(300)
      users.value = loadFromStorage()
    } catch {
      error.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)

function refresh() {
  _loadTrigger.value++
}

// ─── shared mutation state ─────────────────────────────────────────────────────
// ⚠️ ONE saving flag for create, update, AND delete.
// The UI can't distinguish "saving a new user" from "deleting one",
// so every button disables together even when they're unrelated.
const saving = ref(false)

// ─── form / modal state ────────────────────────────────────────────────────────
const formOpen = ref(false)
const editingUserId = ref<string | null>(null)

// ⚠️ Flat form fields — not grouped, not typed as a unit.
// To pass this to a helper you'd spread 5 separate arguments.
const formName = ref('')
const formEmail = ref('')
const formRole = ref<UserRole>('viewer')
const formBio = ref('')
const formActive = ref(true)

// ⚠️ A watch just to clear the form error when the modal closes.
// This reactive chain is invisible: formOpen changes → error clears.
// Debugging "why did my error disappear?" leads here after a long search.
watch(formOpen, (isOpen) => {
  if (!isOpen) error.value = null
})

// ⚠️ Another watch to detect when editingUserId changes and populate form fields.
// Now form population is split across two places: openEdit() sets editingUserId,
// this watcher reacts to that by setting the fields. Two hops to trace one action.
watch(editingUserId, (id) => {
  if (id === null) {
    formName.value = ''
    formEmail.value = ''
    formRole.value = 'viewer'
    formBio.value = ''
    formActive.value = true
  } else {
    const user = users.value.find(u => u.id === id)
    if (user) {
      formName.value = user.name
      formEmail.value = user.email
      formRole.value = user.role
      formBio.value = user.bio
      formActive.value = user.active
    }
  }
})

function openCreate() {
  editingUserId.value = null  // triggers the watcher above to clear fields
  formOpen.value = true
}

function openEdit(user: User) {
  editingUserId.value = user.id  // triggers the watcher above to populate fields
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  // editingUserId intentionally left set — cleaned up next time openCreate runs.
  // ⚠️ Stale state. If the component re-renders between close and reopen,
  // editingUserId still holds the old id. The watcher above only reacts to *changes*,
  // so if you open the same user twice in a row, fields never reset.
}

// ⚠️ saveUser does create AND update in one function.
// There is no way to test "create a user" without also testing "update a user" —
// they share state, the same saving flag, and the same error slot.
async function saveUser() {
  saving.value = true
  error.value = null
  try {
    await delay(400)
    const all = loadFromStorage()
    if (editingUserId.value) {
      // update
      const idx = all.findIndex(u => u.id === editingUserId.value)
      if (idx === -1) throw new Error('User not found')
      all[idx] = {
        ...all[idx],
        name: formName.value,
        email: formEmail.value,
        role: formRole.value,
        bio: formBio.value,
        active: formActive.value,
      }
      saveToStorage(all)
    } else {
      // create
      const newUser: User = {
        id: crypto.randomUUID(),
        joinedAt: new Date().toISOString().slice(0, 10),
        name: formName.value,
        email: formEmail.value,
        role: formRole.value,
        bio: formBio.value,
        active: formActive.value,
      }
      saveToStorage([...all, newUser])
    }
    formOpen.value = false
    refresh()
  } catch {
    // ⚠️ Save error stored in the same ref as load/delete errors.
    // If the list auto-refreshes in the background right now, this error vanishes.
    error.value = 'Failed to save user'
  } finally {
    saving.value = false
  }
}

// ─── delete state ──────────────────────────────────────────────────────────────
// ⚠️ Delete "dialog" tracked with a separate ref from the form, but they share
// the same error, saving, and (accidentally) the same formOpen close logic above.
// Adding a third modal later means a third set of booleans and more shared state.
const deletingUser = ref<User | null>(null)

function confirmDelete(user: User) {
  deletingUser.value = user
}

function cancelDelete() {
  deletingUser.value = null
  error.value = null  // ⚠️ manual cleanup — easy to forget in the next handler
}

async function executeDelete() {
  if (!deletingUser.value) return
  saving.value = true  // ⚠️ disables the form Save button too, even though it's unrelated
  error.value = null
  try {
    await delay(300)
    const all = loadFromStorage()
    const filtered = all.filter(u => u.id !== deletingUser.value!.id)
    if (filtered.length === all.length) throw new Error('User not found')
    saveToStorage(filtered)
    deletingUser.value = null
    refresh()
  } catch {
    error.value = 'Failed to delete user'
  } finally {
    saving.value = false
  }
}

// ─── reset ────────────────────────────────────────────────────────────────────
function resetData() {
  localStorage.removeItem(STORAGE_KEY)
  // ⚠️ Also need to close any open modals, clear errors, clear pending deletes —
  // because all this state is flat and no one owns cleanup.
  formOpen.value = false
  deletingUser.value = null
  error.value = null
  refresh()
}
</script>

<template>
  <div class="demo-page">
    <header class="page-header">
      <div class="page-header-top">
        <h1 class="page-title">User Management</h1>
        <RouterLink to="/composables/users" class="back-link">← Users</RouterLink>
      </div>
      <p class="page-lede">
        Same feature as the composables version — but all logic is embedded
        directly in this component. No composables, no separation of concerns.
      </p>
    </header>

    <div class="problem-banner" aria-label="Code smell callout">
      <strong>⚠️ What's wrong here?</strong>
      <ul>
        <li>~200 lines of <code>&lt;script setup&gt;</code> — impossible to scan at a glance</li>
        <li>Shared <code>error</code> &amp; <code>saving</code> refs — any operation can silently overwrite another's state</li>
        <li>Watchers chain load → form populate → error clear in invisible sequence</li>
        <li>Zero testable units — you must mount the whole component to test any behavior</li>
        <li>Copy-pasted localStorage logic — change the key in one place, break another</li>
      </ul>
    </div>

    <div class="toolbar">
      <button type="button" class="btn-primary" :disabled="saving" @click="openCreate">+ New User</button>
      <button type="button" class="btn-ghost" :disabled="saving" @click="resetData">Reset data</button>
    </div>

    <div v-if="loading" class="skeleton-list" aria-label="Loading users">
      <div v-for="n in 4" :key="n" class="skeleton-row" />
    </div>

    <!-- ⚠️ error is shared — could be a load, save, or delete error. No way to tell. -->
    <p v-else-if="error && !formOpen && !deletingUser" class="error-msg">{{ error }}</p>

    <table v-else class="user-table" aria-label="Users">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Joined</th>
          <th class="actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="name-cell">
            <span class="avatar" aria-hidden="true">{{ user.name.charAt(0) }}</span>
            {{ user.name }}
          </td>
          <td class="muted">{{ user.email }}</td>
          <td>
            <span class="role-badge" :class="`role-${user.role}`">{{ user.role }}</span>
          </td>
          <td>
            <span class="status-badge" :class="user.active ? 'status-active' : 'status-inactive'">
              {{ user.active ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td class="muted mono">{{ user.joinedAt }}</td>
          <td class="actions-cell">
            <!-- ⚠️ saving disables BOTH buttons even when delete is the operation in flight -->
            <button type="button" class="btn-action" :disabled="saving" @click="openEdit(user)">Edit</button>
            <button type="button" class="btn-action btn-danger" :disabled="saving" @click="confirmDelete(user)">Delete</button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="6" class="empty-row">No users yet. Create one above.</td>
        </tr>
      </tbody>
    </table>

    <!-- Form modal -->
    <Teleport to="body">
      <div
        v-if="formOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        @click.self="closeForm"
      >
        <div class="modal">
          <h2 id="form-title">{{ editingUserId ? 'Edit User' : 'New User' }}</h2>

          <form class="user-form" @submit.prevent="saveUser">
            <label class="field">
              <span>Name</span>
              <!-- ⚠️ 5 separate v-model bindings instead of one reactive form object -->
              <input v-model="formName" type="text" required placeholder="Full name" />
            </label>
            <label class="field">
              <span>Email</span>
              <input v-model="formEmail" type="email" required placeholder="user@example.com" />
            </label>
            <label class="field">
              <span>Role</span>
              <select v-model="formRole">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>
            <label class="field">
              <span>Bio</span>
              <textarea v-model="formBio" rows="3" placeholder="Short bio…" />
            </label>
            <label class="field field-inline">
              <input v-model="formActive" type="checkbox" />
              <span>Active</span>
            </label>

            <p v-if="error" class="error-msg">{{ error }}</p>

            <div class="form-actions">
              <button type="button" class="btn-ghost" :disabled="saving" @click="closeForm">Cancel</button>
              <!-- ⚠️ button label logic lives in the template, not in a typed function -->
              <button type="submit" class="btn-primary" :disabled="saving">
                {{ saving ? 'Saving…' : editingUserId ? 'Save Changes' : 'Create User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete confirmation -->
    <Teleport to="body">
      <div
        v-if="deletingUser"
        class="modal-backdrop"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        @click.self="cancelDelete"
      >
        <div class="modal modal-narrow">
          <h2 id="confirm-title">Delete user?</h2>
          <p class="confirm-body">
            <strong>{{ deletingUser.name }}</strong> will be permanently removed.
          </p>
          <p v-if="error" class="error-msg">{{ error }}</p>
          <div class="form-actions">
            <button type="button" class="btn-ghost" :disabled="saving" @click="cancelDelete">Cancel</button>
            <button type="button" class="btn-primary btn-destructive" :disabled="saving" @click="executeDelete">
              {{ saving ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
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

.page-header {
  margin-bottom: 1.25rem;
}

.page-header-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.page-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-danger);
}

.back-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.back-link:hover { color: var(--color-text); }

.page-lede {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

/* ── problem banner ── */
.problem-banner {
  margin-bottom: 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  background: rgba(231, 76, 60, 0.07);
  border: 1px solid rgba(231, 76, 60, 0.25);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.problem-banner strong {
  display: block;
  color: var(--color-danger);
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
}

.problem-banner ul {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.problem-banner code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* ── toolbar ── */
.toolbar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}

/* ── skeleton ── */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-row {
  height: 3rem;
  border-radius: var(--radius);
  background: linear-gradient(
    90deg,
    var(--color-surface-elevated) 25%,
    rgba(255, 255, 255, 0.05) 50%,
    var(--color-surface-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── table ── */
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.user-table th {
  text-align: left;
  padding: 0.5rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.user-table td {
  padding: 0.7rem 0.75rem;
  border-bottom: 1px solid var(--color-border-subtle);
  vertical-align: middle;
}

.user-table tbody tr:last-child td { border-bottom: none; }
.user-table tbody tr:hover td { background: rgba(255, 255, 255, 0.02); }

.name-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
}

.avatar {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--color-accent);
  color: #010409;
  font-size: 0.8rem;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.muted { color: var(--color-text-muted); }
.mono { font-family: var(--font-mono); font-size: 0.8rem; }

.actions-col { text-align: right; }
.actions-cell {
  text-align: right;
  white-space: nowrap;
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;
}

/* ── badges ── */
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

.role-badge.role-editor { background: rgba(100, 149, 237, 0.15); color: #6495ed; }
.role-badge.role-viewer { background: rgba(255, 255, 255, 0.08); color: var(--color-text-muted); }

.status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15em 0.5em;
  border-radius: 4px;
}

.status-active { background: rgba(0, 227, 152, 0.1); color: var(--color-accent); }
.status-inactive { background: rgba(231, 76, 60, 0.12); color: var(--color-danger); }

.empty-row {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  padding: 2rem 0 !important;
}

.error-msg {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: var(--color-danger);
}

/* ── buttons ── */
.btn-primary {
  appearance: none;
  border: none;
  background: var(--color-accent);
  color: #010409;
  border-radius: var(--radius);
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.12s;
}

.btn-primary:hover:not(:disabled) { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary.btn-destructive { background: var(--color-danger); color: #fff; }

.btn-ghost {
  appearance: none;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.btn-ghost:hover:not(:disabled) { color: var(--color-text); }
.btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-action {
  appearance: none;
  border: 1px solid var(--color-border-subtle);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius);
  padding: 0.2rem 0.6rem;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;
}

.btn-action:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-action:hover:not(:disabled) { border-color: var(--color-accent); color: var(--color-accent); }
.btn-action.btn-danger:hover:not(:disabled) { border-color: var(--color-danger); color: var(--color-danger); }
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
  width: min(100%, 32rem);
  padding: 1.75rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0d1117;
  color: #e6edf3;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
}

.modal.modal-narrow { width: min(100%, 22rem); }
.modal h2 { margin: 0 0 1rem; font-size: 1.1rem; font-weight: 700; }

.confirm-body {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: #8b949e;
  line-height: 1.5;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.82rem;
  color: #8b949e;
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 0.45rem 0.65rem;
  color: #e6edf3;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.12s;
  font-family: inherit;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus { border-color: rgba(0, 227, 152, 0.5); }

.field-inline { flex-direction: row; align-items: center; gap: 0.5rem; }
.field-inline input[type="checkbox"] { width: 1rem; height: 1rem; accent-color: #00e398; cursor: pointer; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.4rem;
}
</style>
