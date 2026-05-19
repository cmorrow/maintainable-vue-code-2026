<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const name = ref("");
const email = ref("");
const message = ref("");
const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

const nestedContactForm = ref({
  name: {
    firstName: "",
    lastName: "",
  },
  email: "",
  message: "",
});

function submitPrimitiveForm() {
  window.alert(`Submitted primitive refs for ${name.value || "(empty)"}`);
}

function submitObjectForm() {
  window.alert(
    `Submitted object ref for ${contactForm.value.name || "(empty)"}`,
  );
}

function submitNestedObjectForm() {
  window.alert(
    `Submitted nested object ref for ${nestedContactForm.value.name.firstName || "(empty)"} ${nestedContactForm.value.name.lastName || ""}`,
  );
}

function resetPrimitiveForm() {
  name.value = "";
  email.value = "";
  message.value = "";
}

function resetObjectForm() {
  contactForm.value = {
    name: "",
    email: "",
    message: "",
  };
}

function resetNestedObjectForm() {
  nestedContactForm.value = {
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    message: "",
  };
}
</script>

<template>
  <div class="ref-page">
    <header class="page-header">
      <h1>Ref contact form</h1>
      <p>
        `ref` is safe for both primitive fields and object-based form state,
        including complete reassignment.
      </p>
      <RouterLink to="/refs-reactive" class="back-link">← Back</RouterLink>
    </header>

    <section class="form-section">
      <h2>Primitive refs</h2>
      <p>Each field has its own `ref`, and every assignment stays reactive.</p>
      <div class="form-with-preview">
        <form @submit.prevent="submitPrimitiveForm">
          <label>
            Name
            <input v-model="name" placeholder="Name" />
          </label>
          <label>
            Email
            <input v-model="email" placeholder="Email" />
          </label>
          <label>
            Message
            <textarea v-model="message" placeholder="Message"></textarea>
          </label>
          <div class="button-row">
            <button type="submit">Submit</button>
            <button type="button" @click="resetPrimitiveForm">Reset</button>
          </div>
        </form>

        <div class="preview-panel">
          <p class="preview-label">Assigned values</p>
          <pre class="preview-code"><code>{{ JSON.stringify({ name, email, message }, null, 2) }}</code></pre>
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2>Object ref</h2>
      <p>
        A single `ref` wraps the form object. Replacing the whole object is
        still safe.
      </p>
      <div class="form-with-preview">
        <form @submit.prevent="submitObjectForm">
          <label>
            Name
            <input v-model="contactForm.name" placeholder="Name" />
          </label>
          <label>
            Email
            <input v-model="contactForm.email" placeholder="Email" />
          </label>
          <label>
            Message
            <textarea
              v-model="contactForm.message"
              placeholder="Message"
            ></textarea>
          </label>
          <div class="button-row">
            <button type="submit">Submit</button>
            <button type="button" @click="resetObjectForm">Reset</button>
          </div>
        </form>

        <div class="preview-panel">
          <p class="preview-label">Assigned values</p>
          <pre class="preview-code"><code>{{ JSON.stringify(contactForm, null, 2) }}</code></pre>
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2>Nested object ref</h2>
      <p>
        A nested object inside a `ref` is still reactive. Use `name.firstName`
        and `name.lastName` properties directly in the template.
      </p>
      <div class="form-with-preview">
        <form @submit.prevent="submitNestedObjectForm">
          <label>
            First name
            <input v-model="nestedContactForm.name.firstName" placeholder="First name" />
          </label>
          <label>
            Last name
            <input v-model="nestedContactForm.name.lastName" placeholder="Last name" />
          </label>
          <label>
            Email
            <input v-model="nestedContactForm.email" placeholder="Email" />
          </label>
          <label>
            Message
            <textarea
              v-model="nestedContactForm.message"
              placeholder="Message"
            ></textarea>
          </label>
          <div class="button-row">
            <button type="submit">Submit</button>
            <button type="button" @click="resetNestedObjectForm">Reset</button>
          </div>
        </form>

        <div class="preview-panel">
          <p class="preview-label">Assigned values</p>
          <pre class="preview-code"><code>{{ JSON.stringify(nestedContactForm, null, 2) }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ref-page {
  margin-inline: auto;
  padding-block: 2rem 4rem;
}

.page-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--color-accent);
  text-decoration: none;
}

.form-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
}

h2 {
  margin-top: 0;
  color: var(--color-accent);
}

label {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

input,
textarea {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
}

textarea {
  min-height: 7rem;
}

.button-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

button {
  padding: 0.8rem 1.1rem;
  border: none;
  border-radius: var(--radius);
  background: var(--color-accent);
  color: white;
  cursor: pointer;
}

button[type="button"] {
  background: var(--color-border);
  color: var(--color-text);
}

.form-with-preview {
  display: grid;
  gap: 1.5rem;
  align-items: start;
  grid-template-columns: 1fr 1fr;
}

.preview-panel {
  padding: 1rem;
  border-radius: var(--radius);
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.preview-label {
  margin: 0 0 0.75rem;
  font-weight: 700;
  color: var(--color-text);
}

.preview-code {
  margin: 0;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: var(--radius);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
</style>
