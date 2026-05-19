<script setup lang="ts">
import { RouterLink } from "vue-router";
import VSubHeading from "@/shared/components/VSubHeading.vue";
</script>

<template>
  <div class="composables-view">
    <header class="page-header">
      <div class="flex items-center justify-between mb-2">
        <VSubHeading>Composables</VSubHeading>
        <RouterLink
          to="/"
          class="text-sm font-semibold text-[var(--color-accent)] no-underline hover:text-[var(--color-accent-hover)] hover:underline"
        >
          ← Back to home
        </RouterLink>
      </div>
      <h1>Keep reusable logic out of page views</h1>
      <p class="lede">
        Composables extract reactive state and reusable behavior into plain
        functions. The page view stays focused on layout, template wiring, and
        route-specific concerns — not implementation details.
      </p>
    </header>

    <div class="demo-links" aria-label="Live demos">
      <RouterLink
        class="demo-link demo-link--bad"
        to="/composables/page-refactor/page-before"
      >
        <span class="demo-link-label">Before</span>
        <span class="demo-link-desc"
          >All logic inline — 57 lines in &lt;script setup&gt;</span
        >
        <span class="demo-link-arrow">→</span>
      </RouterLink>
      <RouterLink
        class="demo-link demo-link--good"
        to="/composables/page-refactor/page-after"
      >
        <span class="demo-link-label">After</span>
        <span class="demo-link-desc"
          >Logic extracted — 5 lines using composables</span
        >
        <span class="demo-link-arrow">→</span>
      </RouterLink>
    </div>

    <section class="panel" aria-labelledby="advantage-heading">
      <div class="panel-head">
        <h2 id="advantage-heading">Why not keep logic in the page?</h2>
        <p class="panel-desc">
          When a page owns its own data fetching, loading state, error handling,
          and business logic, it becomes a monolith that is hard to scan, test,
          or reuse. Extracting that logic into a composable keeps the page
          component thin and each concern independently testable.
        </p>
      </div>
      <div class="panel-body comparison">
        <div class="compare-col">
          <p class="compare-label compare-label--bad">
            Logic inline in the page
          </p>
          <pre class="code-block" aria-label="Page with inline logic"><code
><!-- UserPage.vue -->
&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchUser } from '@/api'

const route = useRoute()
const user    = ref(null)
const loading = ref(false)
const error   = ref&lt;string | null&gt;(null)

onMounted(async () => {
  loading.value = true
  try {
    user.value = await fetchUser(
      String(route.params.id)
    )
  } catch {
    error.value = 'Failed to load user'
  } finally {
    loading.value = false
  }
})
&lt;/script&gt;</code></pre>
        </div>
        <div class="compare-col">
          <p class="compare-label compare-label--good">
            Logic extracted to a composable
          </p>
          <pre class="code-block" aria-label="Page using a composable"><code
><!-- UserPage.vue -->
&lt;script setup lang="ts"&gt;
import { useRoute } from 'vue-router'
import { useUser } from '@/composables/useUser'

const route = useRoute()
const { user, loading, error }
  = useUser(() => route.params.id)
&lt;/script&gt;

// composables/useUser.ts
export function useUser(
  id: MaybeRefOrGetter&lt;string&gt;
) {
  const user    = ref(null)
  const loading = ref(false)
  const error   = ref&lt;string | null&gt;(null)
  watchEffect(async () => { /* fetch */ })
  return { user, loading, error }
}</code></pre>
        </div>
      </div>
    </section>

    <section class="panel" aria-labelledby="bp-heading">
      <div class="panel-head">
        <h2 id="bp-heading">Best practices</h2>
      </div>
      <div class="panel-body">
        <article class="bp" aria-labelledby="bp1-heading">
          <h3 id="bp1-heading">
            <span class="bp-num">1</span>
            Keep each composable focused on a single concern
          </h3>
          <p class="bp-desc">
            Resist the urge to group unrelated logic under one roof. A
            composable that fetches data, manages form state,
            <em>and</em> controls a modal is three composables trying to escape.
            Small, focused composables stay reusable and easy to name.
          </p>
          <div class="code-pair">
            <div>
              <p class="code-label code-label--bad">Too broad</p>
              <pre class="code-block"><code
>// useUserPage.ts — owns too much
export function useUserPage(id: string) {
  const user     = ref(null)
  const posts    = ref([])
  const settings = ref(null)
  const modal    = ref(false)
  // 100+ lines...
}</code></pre>
            </div>
            <div>
              <p class="code-label code-label--good">Focused</p>
              <pre class="code-block"><code
>// One concern each
const { user }     = useUser(id)
const { posts }    = useUserPosts(id)
const { settings } = useUserSettings(id)
const { open, close, isOpen } = useModal()</code></pre>
            </div>
          </div>
        </article>

        <hr class="bp-divider" />

        <article class="bp" aria-labelledby="bp2-heading">
          <h3 id="bp2-heading">
            <span class="bp-num">2</span>
            Return a minimal, stable public API
          </h3>
          <p class="bp-desc">
            Only expose what callers actually need. Wrapping mutable state as
            <code>readonly()</code> prevents callers from accidentally mutating
            it, and keeping internal helpers out of the return value means you
            can refactor internals without breaking every consumer.
          </p>
          <pre
            class="code-block"
            aria-label="Composable with a lean return value"
          ><code
>export function useUser(id: string) {
  const _data  = ref&lt;User | null&gt;(null)  // private — not returned
  const loading = ref(false)
  const error   = ref&lt;string | null&gt;(null)

  async function refresh() {
    loading.value = true
    try { _data.value = await fetchUser(id) }
    catch { error.value = 'Failed to load' }
    finally { loading.value = false }
  }

  refresh()

  return {
    user: readonly(_data),  // callers read, not write
    loading: readonly(loading),
    error:   readonly(error),
    refresh,                // the one action callers need
  }
}</code></pre>
        </article>

        <hr class="bp-divider" />

        <article class="bp" aria-labelledby="bp3-heading">
          <h3 id="bp3-heading">
            <span class="bp-num">3</span>
            Accept reactive arguments with <code>toValue()</code>
          </h3>
          <p class="bp-desc">
            Using <code>MaybeRefOrGetter&lt;T&gt;</code> and resolving arguments
            with <code>toValue()</code> inside a <code>watchEffect</code> makes
            a composable work with plain values, refs, <em>and</em> getter
            functions — so it re-runs automatically whenever the argument
            changes, without placing that burden on the caller.
          </p>
          <pre
            class="code-block"
            aria-label="Composable that accepts refs or plain values"
          ><code
>import { toValue, type MaybeRefOrGetter } from 'vue'

export function useUser(
  id: MaybeRefOrGetter&lt;string&gt;
) {
  const user = ref&lt;User | null&gt;(null)

  watchEffect(async () => {
    const resolvedId = toValue(id) // ref, getter, or plain value
    user.value = await fetchUser(resolvedId)
  })

  return { user }
}

// All three call styles work and stay reactive:
useUser('abc-123')               // plain string
useUser(selectedId)              // Ref&lt;string&gt;
useUser(() => route.params.id)   // getter — re-fetches on navigation</code></pre>
        </article>
      </div>
    </section>

    <footer class="page-footer">
      <RouterLink class="home-link" to="/">← Back to home</RouterLink>
      <div class="quick-links">
        <span>Other topics:</span>
        <RouterLink to="/props">/props</RouterLink>
        <RouterLink to="/provide-and-inject">/provide-and-inject</RouterLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.composables-view {
  max-width: 960px;
  margin-inline: auto;
  padding-block: 0.5rem 2rem;
  color: var(--color-text);
}

.page-header {
  margin-bottom: 2rem;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--color-accent);
}

.lede,
.panel-desc {
  margin: 0;
  max-width: 65ch;
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

/* ── demo links ── */
.demo-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.75rem;
}

@media (max-width: 560px) {
  .demo-links {
    grid-template-columns: 1fr;
  }
}

.demo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-lg);
  border: 1px solid;
  text-decoration: none;
  transition: box-shadow 0.15s ease, transform 0.12s ease;
}

.demo-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
}

.demo-link--bad {
  border-color: rgba(231, 76, 60, 0.35);
  background: rgba(231, 76, 60, 0.04);
}

.demo-link--bad .demo-link-label {
  color: var(--color-danger);
}

.demo-link--good {
  border-color: rgba(0, 227, 152, 0.35);
  background: rgba(0, 227, 152, 0.04);
}

.demo-link--good .demo-link-label {
  color: var(--color-accent);
}

.demo-link-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  flex-shrink: 0;
}

.demo-link-desc {
  flex: 1;
  font-size: 0.83rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.demo-link-arrow {
  font-size: 1rem;
  color: var(--color-text-subtle);
  flex-shrink: 0;
  transition: transform 0.12s ease;
}

.demo-link:hover .demo-link-arrow {
  transform: translateX(3px);
}

.panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.panel-head {
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.panel-head h2 {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  color: var(--color-text);
}

.panel-desc {
  margin-top: 0.25rem;
}

.panel-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

/* before / after comparison */
.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 640px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.compare-label,
.code-label {
  margin: 0 0 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.compare-label--bad,
.code-label--bad {
  color: var(--color-danger);
}

.compare-label--good,
.code-label--good {
  color: var(--color-accent);
}

/* best practices */
.bp {
  padding-block: 0.25rem;
}

.bp h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.6rem;
  font-size: 1.05rem;
  color: var(--color-text);
  font-weight: 700;
}

.bp-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-accent);
  color: #010409;
  font-size: 0.8rem;
  font-weight: 800;
}

.bp-desc {
  margin: 0 0 1rem;
  max-width: 68ch;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.bp-divider {
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  margin: 1.5rem 0;
}

.code-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .code-pair {
    grid-template-columns: 1fr;
  }
}

.code-block {
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  background: var(--color-code-bg);
  border: 1px solid var(--color-border-subtle);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  white-space: pre;
}

.code-block code {
  padding: 0;
  background: none;
  font-size: inherit;
  border-radius: 0;
}

.page-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-subtle);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.home-link,
.quick-links a {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
}

.home-link:hover,
.quick-links a:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  color: var(--color-text-muted);
}

.quick-links span {
  margin-right: 0.35rem;
}
</style>
