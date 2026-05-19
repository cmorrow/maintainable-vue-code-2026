<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserList } from "@/features/composables/users/composables/useUserList";
import { useUserMutation } from "@/features/composables/users/composables/useUserMutation";
import { useUserForm } from "@/features/composables/users/composables/useUserForm";
import { useUserDeleteConfirm } from "@/features/composables/users/composables/useUserDeleteConfirm";
import { dbReset } from "@/features/composables/users/composables/usersDb";

const { users, loading, error, refresh } = useUserList();
const {
  saving,
  error: mutationError,
  createUser,
  updateUser,
  deleteUser,
} = useUserMutation();
const {
  isOpen: formOpen,
  editingId,
  form,
  openCreate,
  openEdit,
  close: closeForm,
} = useUserForm();
const {
  pendingUser,
  confirm: confirmDelete,
  cancel: cancelDelete,
} = useUserDeleteConfirm();

async function submitForm() {
  const succeeded = editingId.value
    ? await updateUser(editingId.value, form)
    : await createUser(form);
  if (succeeded) {
    closeForm();
    refresh();
  }
}

async function executeDelete() {
  if (!pendingUser.value) return;
  const succeeded = await deleteUser(pendingUser.value.id);
  if (succeeded) {
    cancelDelete();
    refresh();
  }
}

function resetData() {
  dbReset();
  refresh();
}

const sortDir = ref<"asc" | "desc">("asc");

const sortedUsers = computed(() => {
  const lastName = (name: string) => name.split(" ").at(-1) ?? name;
  return [...users.value].sort((a, b) => {
    const cmp = lastName(a.name).localeCompare(lastName(b.name));
    return sortDir.value === "asc" ? cmp : -cmp;
  });
});

function toggleNameSort() {
  sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
}
</script>

<template>
  <div class="demo-page">
    <header class="page-header">
      <div class="page-header-top">
        <h1 class="page-title">User Management</h1>
        <RouterLink to="/composables/users" class="back-link"
          >← Users</RouterLink
        >
      </div>
      <p class="page-lede">
        A full CRUD list powered entirely by composables. The page component
        contains zero business logic — it only wires together four focused
        composables.
      </p>
    </header>

    <div class="composables-legend">
      <span class="legend-item">
        <code>useUserList</code> — fetch &amp; refresh
      </span>
      <span class="legend-item">
        <code>useUserMutation</code> — create / update / delete
      </span>
      <span class="legend-item">
        <code>useUserForm</code> — form state &amp; modal
      </span>
      <span class="legend-item">
        <code>useDeleteConfirm</code> — confirm dialog
      </span>
    </div>

    <div class="toolbar">
      <button type="button" class="btn-primary" @click="openCreate">
        + New User
      </button>
      <button type="button" class="btn-ghost" @click="resetData">
        Reset data
      </button>
    </div>

    <div v-if="loading" class="skeleton-list" aria-label="Loading users">
      <div v-for="n in 4" :key="n" class="skeleton-row" />
    </div>

    <p v-else-if="error" class="error-msg">{{ error }}</p>

    <table v-else class="user-table" aria-label="Users">
      <thead>
        <tr>
          <th class="sortable-col" @click="toggleNameSort">
            Name <span class="sort-arrow">{{ sortDir === "asc" ? "▲" : "▼" }}</span>
          </th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Joined</th>
          <th class="actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.id">
          <td class="name-cell">
            {{ user.name }}
          </td>
          <td class="muted">{{ user.email }}</td>
          <td>
            <span class="role-badge" :class="`role-${user.role}`">{{
              user.role
            }}</span>
          </td>
          <td>
            <span
              class="status-badge"
              :class="user.active ? 'status-active' : 'status-inactive'"
            >
              {{ user.active ? "Active" : "Inactive" }}
            </span>
          </td>
          <td class="muted mono">{{ user.joinedAt }}</td>
          <td class="actions-cell">
            <button type="button" class="btn-action" @click="openEdit(user)">
              Edit
            </button>
            <button
              type="button"
              class="btn-action btn-danger"
              @click="confirmDelete(user)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="sortedUsers.length === 0">
          <td colspan="6" class="empty-row">No users yet. Create one above.</td>
        </tr>
      </tbody>
    </table>

    <!-- Form modal (create / edit) -->
    <Teleport to="body">
      <div
        v-if="formOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="editingId ? 'form-title-edit' : 'form-title-create'"
        @click.self="closeForm"
      >
        <div class="modal">
          <h2 :id="editingId ? 'form-title-edit' : 'form-title-create'">
            {{ editingId ? "Edit User" : "New User" }}
          </h2>

          <form class="user-form" @submit.prevent="submitForm">
            <label class="field">
              <span>Name</span>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Full name"
              />
            </label>

            <label class="field">
              <span>Email</span>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="user@example.com"
              />
            </label>

            <label class="field">
              <span>Role</span>
              <select v-model="form.role">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>

            <label class="field">
              <span>Bio</span>
              <textarea v-model="form.bio" rows="3" placeholder="Short bio…" />
            </label>

            <label class="field field-inline">
              <input v-model="form.active" type="checkbox" />
              <span>Active</span>
            </label>

            <p v-if="mutationError" class="error-msg">{{ mutationError }}</p>

            <div class="form-actions">
              <button
                type="button"
                class="btn-ghost"
                :disabled="saving"
                @click="closeForm"
              >
                Cancel
              </button>
              <button type="submit" class="btn-primary" :disabled="saving">
                {{
                  saving
                    ? "Saving…"
                    : editingId
                    ? "Save Changes"
                    : "Create User"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete confirmation dialog -->
    <Teleport to="body">
      <div
        v-if="pendingUser"
        class="modal-backdrop"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        @click.self="cancelDelete"
      >
        <div class="modal modal-narrow">
          <h2 id="confirm-title">Delete user?</h2>
          <p class="confirm-body">
            <strong>{{ pendingUser.name }}</strong> will be permanently removed.
            This cannot be undone.
          </p>
          <p v-if="mutationError" class="error-msg">{{ mutationError }}</p>
          <div class="form-actions">
            <button
              type="button"
              class="btn-ghost"
              :disabled="saving"
              @click="cancelDelete"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn-primary btn-destructive"
              :disabled="saving"
              @click="executeDelete"
            >
              {{ saving ? "Deleting…" : "Delete" }}
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

/* ── header ── */
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
  color: var(--color-accent);
}

.back-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.back-link:hover {
  color: var(--color-text);
}

.page-lede {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

/* ── legend ── */
.composables-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.legend-item {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius);
  padding: 0.2rem 0.6rem;
}

.legend-item code {
  font-family: var(--font-mono);
  color: var(--color-accent);
  font-size: 0.8em;
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
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ── sortable column ── */
.sortable-col {
  cursor: pointer;
  user-select: none;
}

.sortable-col:hover {
  color: var(--color-text);
}

.sort-arrow {
  margin-left: 0.25rem;
  opacity: 0.6;
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

.user-table tbody tr:last-child td {
  border-bottom: none;
}

.user-table tbody tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

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

.muted {
  color: var(--color-text-muted);
}

.mono {
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.actions-col {
  text-align: right;
}

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

.role-badge.role-editor {
  background: rgba(100, 149, 237, 0.15);
  color: #6495ed;
}

.role-badge.role-viewer {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
}

.status-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15em 0.5em;
  border-radius: 4px;
}

.status-active {
  background: rgba(0, 227, 152, 0.1);
  color: var(--color-accent);
}

.status-inactive {
  background: rgba(231, 76, 60, 0.12);
  color: var(--color-danger);
}

/* ── empty row ── */
.empty-row {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  padding: 2rem 0 !important;
}

/* ── error ── */
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

.btn-primary:hover:not(:disabled) {
  opacity: 0.88;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary.btn-destructive {
  background: var(--color-danger);
  color: #fff;
}

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

.btn-ghost:hover:not(:disabled) {
  border-color: var(--color-border);
  color: var(--color-text);
}

.btn-ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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

.btn-action:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn-action.btn-danger:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}
</style>

<style>
/* ── modal (global so Teleport can reach it) ── */
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

.modal.modal-narrow {
  width: min(100%, 22rem);
}

.modal h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.confirm-body {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: #8b949e;
  line-height: 1.5;
}

/* ── form ── */
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
.field textarea:focus {
  border-color: rgba(0, 227, 152, 0.5);
}

.field-inline {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.field-inline input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: #00e398;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.4rem;
}
</style>
