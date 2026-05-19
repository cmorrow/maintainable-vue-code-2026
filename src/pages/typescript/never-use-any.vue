<script setup lang="ts">
import { RouterLink } from "vue-router";
import VPageHeader from "@/shared/components/VPageHeader.vue";
import ComponentCodeDisplay from "@/shared/components/ComponentCodeDisplay.vue";

const typedCode = `interface Pet {
  name: string;
  species: "dog" | "cat" | "rabbit";
  age: number;
  vaccinated: boolean;
}

function describePet(pet: Pet): string {
  return \`\${pet.name} is a \${pet.age}-year-old \${pet.species}\`;
}

// ✅ TypeScript catches these mistakes at compile time:

// Error: "hamster" is not assignable to "dog" | "cat" | "rabbit"
const badSpecies: Pet = { name: "Rex", species: "hamster", age: 1, vaccinated: false };

// Error: string is not assignable to type number
const badAge: Pet = { name: "Rex", species: "dog", age: "three", vaccinated: false };`;

const anyCode = `function describePetAny(pet: any): string {
  // ❌ No autocomplete — you have to remember every property yourself
  // ❌ Typos are invisible: pet.naem, pet.speces — TypeScript says nothing
  // ❌ Wrong method calls are invisible: .toUpperCase() on a number
  return \`\${pet.naem} is a \${pet.age.toUpperCase()}-year-old \${pet.speces}\`;
}

// ❌ None of these produce a TypeScript error — all crash or misbehave at runtime
describePetAny("not a pet at all");
describePetAny(42);
describePetAny(null);`;
</script>

<template>
  <div class="never-use-any">
    <header class="page-header">
      <VPageHeader title="Never Use any" :canToggleDescription="false" />
    </header>

    <div class="examples">
      <section class="example">
        <h2 class="example-heading">
          <span class="badge badge--good">✅ Do</span>
          Type your parameters with an interface
        </h2>
        <ComponentCodeDisplay :code="typedCode">
          <div class="annotation">
            <p>
              When <code>pet</code> is typed as <code>Pet</code>, TypeScript
              knows every property's name and type. Typos, wrong values, and
              missing fields are caught <strong>before you run the code</strong>.
            </p>
            <ul>
              <li>Full autocomplete on every property</li>
              <li>Compile-time errors on bad values</li>
              <li>Union types restrict <code>species</code> to valid options</li>
            </ul>
          </div>
        </ComponentCodeDisplay>
      </section>

      <section class="example">
        <h2 class="example-heading">
          <span class="badge badge--bad">❌ Avoid</span>
          Using <code>any</code>
        </h2>
        <ComponentCodeDisplay :code="anyCode">
          <div class="annotation">
            <p>
              <code>any</code> tells TypeScript to stop checking. Every property
              access, method call, and argument is accepted without question —
              errors hide until <strong>runtime</strong>.
            </p>
            <ul>
              <li>No autocomplete</li>
              <li>Typos in property names compile silently</li>
              <li>Wrong types, wrong methods — no warnings</li>
            </ul>
          </div>
        </ComponentCodeDisplay>
      </section>
    </div>
  </div>
</template>

<style scoped>
.never-use-any {
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
