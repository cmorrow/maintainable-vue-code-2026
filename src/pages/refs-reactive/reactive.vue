<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const contactFormStarter = {
  name: "",
  email: "",
  message: "",
};

const contactForm = reactive({
  name: "",
  email: "",
  message: "",
});

let brokenForm = reactive({
  name: "",
  email: "",
  message: "",
});

const showBrokenNote = ref(false);

function submitContactForm() {
  window.alert(`Submitted reactive form for ${contactForm.name || "(empty)"}`);
}

function resetContactForm() {
  Object.assign(contactForm, contactFormStarter);
}

function breakReactiveForm() {
  brokenForm = {
    name: "Reassigned",
    email: "broken@example.com",
    message: "This object is no longer reactive.",
  };
  showBrokenNote.value = true;
}

function submitBrokenForm() {
  window.alert(
    `Submitted broken reactive form for ${brokenForm.name || "(empty)"}`,
  );
}
</script>

<template>
  <div class="reactive-page">
    <header class="page-header">
      <h1>Reactive contact form</h1>
      <p>
        `reactive` works well for forms when you mutate properties directly.
        Reassigning the root object breaks tracking.
      </p>
      <RouterLink to="/refs-reactive" class="back-link">← Back</RouterLink>
    </header>

    <section class="form-section">
      <h2>Working reactive form</h2>
      <div class="form-with-preview">
        <form @submit.prevent="submitContactForm">
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
            <button type="button" @click="resetContactForm">Reset</button>
          </div>
        </form>

        <div class="preview-panel">
          <p class="preview-label">Assigned values</p>
          <pre
            class="preview-code"
          ><code>{{ JSON.stringify(contactForm, null, 2) }}</code></pre>
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2>Broken reactive form</h2>
      <p>
        This form is initialized with `reactive`, but then the whole object is
        reassigned. That breaks reactivity for the form bindings.
      </p>
      <div class="form-with-preview">
        <form @submit.prevent="submitBrokenForm">
          <label>
            Name
            <input v-model="brokenForm.name" placeholder="Name" />
          </label>
          <label>
            Email
            <input v-model="brokenForm.email" placeholder="Email" />
          </label>
          <label>
            Message
            <textarea
              v-model="brokenForm.message"
              placeholder="Message"
            ></textarea>
          </label>
          <div class="button-row">
            <button type="button" @click="breakReactiveForm">
              Reassign root object
            </button>
            <button type="submit">Submit</button>
          </div>
          <p v-if="showBrokenNote" class="note">
            Note: the form values will no longer update reactively after the
            object root is reassigned.
          </p>
        </form>

        <div class="preview-panel">
          <p class="preview-label">Assigned values</p>
          <pre
            class="preview-code"
          ><code>{{ JSON.stringify(brokenForm, null, 2) }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reactive-page {
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

.note {
  margin-top: 1rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
</style>
