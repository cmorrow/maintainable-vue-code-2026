<script setup lang="ts">
import VPageHeader from "@/shared/components/VPageHeader.vue";
import ComponentCodeDisplay from "@/shared/components/ComponentCodeDisplay.vue";

const baseCode = `// Both describe the same object shape
interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

type UserType = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
};`;

const derivedCode = `type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
};

// Omit — strip properties, no copy-pasting
type NewUser = Omit<User, "id" | "createdAt">;
// { name: string; email: string; role: "admin" | "editor" | "viewer" }

// Pick — keep only what you need
type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string }

// Intersection — add new properties on top
type AdminUser = User & {
  permissions: string[];
  lastLogin: Date;
};

// Partial — make all properties optional (patches, form state)
type UserPatch = Partial<User>;
// { id?: number; name?: string; email?: string; ... }`;

const interfaceProblemCode = `interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

// ❌ With interface — must manually re-declare every property
interface NewUser {
  name: string;                          // copied from User
  email: string;                         // copied from User
  role: "admin" | "editor" | "viewer";  // copied from User
  // If User adds a field, this won't update — silent drift
}

// ✅ With type — single source of truth, always in sync
type NewUserDerived = Omit<User, "id" | "createdAt">;`;
</script>

<template>
  <div class="type-vs-interface">
    <header class="page-header">
      <VPageHeader title="type vs interface" :canToggleDescription="false" />
    </header>

    <div class="examples">
      <section class="example">
        <h2 class="example-heading">
          <span class="badge badge--neutral">≈ Equivalent</span>
          For a plain object shape, both work
        </h2>
        <ComponentCodeDisplay :code="baseCode">
          <div class="annotation">
            <p>
              For describing a plain object shape, <code>type</code> and
              <code>interface</code> are interchangeable. Either compiles
              correctly and gives full autocomplete.
            </p>
            <p>
              The difference appears when you need to
              <strong>derive a new type</strong> from an existing one.
            </p>
          </div>
        </ComponentCodeDisplay>
      </section>

      <section class="example">
        <h2 class="example-heading">
          <span class="badge badge--good">✅ type</span>
          Derived types: Omit, Pick, intersection, Partial
        </h2>
        <ComponentCodeDisplay :code="derivedCode">
          <div class="annotation">
            <p>
              <code>type</code> composes with TypeScript's built-in utility
              types. Every derived type stays in sync with its source — change
              <code>User</code> once and all derived types update automatically.
            </p>
            <ul>
              <li><code>Omit&lt;T, K&gt;</code> — remove specific properties</li>
              <li><code>Pick&lt;T, K&gt;</code> — keep specific properties</li>
              <li><code>T &amp; U</code> — merge two types together</li>
              <li><code>Partial&lt;T&gt;</code> — make all properties optional</li>
            </ul>
          </div>
        </ComponentCodeDisplay>
      </section>

      <section class="example">
        <h2 class="example-heading">
          <span class="badge badge--bad">❌ interface</span>
          No shorthand for derived shapes — manual duplication
        </h2>
        <ComponentCodeDisplay :code="interfaceProblemCode">
          <div class="annotation">
            <p>
              <code>interface</code> cannot use <code>Omit</code>, <code>Pick</code>,
              or mapped types directly. Deriving a subset requires manually
              re-declaring every property.
            </p>
            <p>
              When the source type changes, the manual copy
              <strong>silently drifts</strong> — TypeScript won't warn you
              that the two are out of sync.
            </p>
          </div>
        </ComponentCodeDisplay>
      </section>
    </div>
  </div>
</template>

<style scoped>
.type-vs-interface {
  max-width: 64rem;
  margin-inline: auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 2.5rem;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.example-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
}

.example-heading code {
  font-size: 1rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.badge--good {
  background: rgba(0, 227, 152, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(0, 227, 152, 0.3);
}

.badge--bad {
  background: rgba(255, 80, 80, 0.1);
  color: #ff6b6b;
  border: 1px solid rgba(255, 80, 80, 0.25);
}

.badge--neutral {
  background: rgba(150, 150, 255, 0.1);
  color: #a0a0ff;
  border: 1px solid rgba(150, 150, 255, 0.25);
}

.annotation {
  padding: 1.25rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: var(--color-surface-elevated);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  height: 100%;
  box-sizing: border-box;
}

.annotation p {
  margin: 0 0 0.75rem;
}

.annotation p:last-child {
  margin-bottom: 0;
}

.annotation ul {
  margin: 0;
  padding-left: 1.25rem;
}

.annotation li {
  margin-bottom: 0.3rem;
}

.annotation strong {
  color: var(--color-text);
}

.annotation code {
  font-size: 0.8rem;
  background: var(--color-surface);
  padding: 0.1em 0.35em;
  border-radius: 4px;
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text);
}
</style>
