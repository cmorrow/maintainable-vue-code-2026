<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { getSingletonHighlighter } from "shiki";

type Lang = "typescript" | "vue" | "vue-html";

const props = defineProps<{
  code: string;
  lang?: Lang;
}>();

const highlightedHtml = ref("");
const isModalOpen = ref(false);

async function highlight(code: string) {
  const lang = props.lang ?? "typescript";
  const highlighter = await getSingletonHighlighter({
    themes: ["monokai"],
    langs: ["typescript", "vue", "vue-html"],
  });
  highlightedHtml.value = highlighter.codeToHtml(code, {
    lang,
    theme: "monokai",
  });
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && isModalOpen.value) isModalOpen.value = false;
}

onMounted(() => {
  highlight(props.code);
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

watch([() => props.code, () => props.lang], ([code]) => highlight(code));
</script>

<template>
  <div class="code-display">
    <div class="code-display__preview">
      <slot />
    </div>
    <div class="code-display__code">
      <button class="expand-btn" title="View fullscreen" @click="isModalOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
      <div class="code-display__shiki" v-html="highlightedHtml" />
    </div>
  </div>

  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
      <div class="modal">
        <button class="modal-close" @click="isModalOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div class="modal-shiki" v-html="highlightedHtml" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.code-display {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  align-items: start;
}

.code-display__preview {
  min-width: 0;
}

.code-display__code {
  position: relative;
  min-width: 0;
}

.expand-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.expand-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.code-display__shiki :deep(pre) {
  margin: 0;
  padding: 1.25rem;
  border-radius: 12px;
  font-family: "Fira Code", "Cascadia Code", ui-monospace, monospace;
  font-size: 0.8rem;
  line-height: 1.6;
  overflow-x: auto;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  position: relative;
  width: 95vw;
  height: 92.5vh;
  background: #272822;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: #f8f8f2;
  cursor: pointer;
  z-index: 1;
  transition: background 0.15s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.15);
}

.modal-shiki {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}

.modal-shiki :deep(pre) {
  margin: 0;
  padding: 1.5rem;
  height: 100%;
  font-family: "Fira Code", "Cascadia Code", ui-monospace, monospace;
  font-size: 1rem;
  line-height: 1.7;
  background: transparent !important;
}
</style>
