<script setup lang="ts">
import { useConsoleCapture } from '@/shared/utils/useConsoleCapture'

const { entries, clear } = useConsoleCapture()
</script>

<template>
  <div class="devtools">
    <div class="devtools__toolbar">
      <span class="devtools__title">Console</span>
      <button class="devtools__clear" title="Clear console" @click="clear">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      </button>
    </div>

    <div class="devtools__body">
      <div v-if="entries.length === 0" class="devtools__empty">
        No warnings or errors
      </div>

      <div
        v-for="entry in entries"
        :key="entry.id"
        class="devtools__entry"
        :class="`devtools__entry--${entry.type}`"
      >
        <span class="devtools__icon" aria-hidden="true">
          {{ entry.type === 'warn' ? '⚠' : '⊘' }}
        </span>
        <span class="devtools__message">{{ entry.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.devtools {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  background: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.devtools__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.6rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3c3c3c;
}

.devtools__title {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0a6;
  font-family: var(--font-sans);
}

.devtools__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  background: none;
  border: none;
  border-radius: 3px;
  color: #9aa0a6;
  cursor: pointer;
  transition: color 0.1s ease, background 0.1s ease;
}

.devtools__clear:hover {
  color: #e8eaed;
  background: rgba(255, 255, 255, 0.08);
}

.devtools__body {
  overflow-y: auto;
  max-height: 16rem;
}

.devtools__empty {
  padding: 0.6rem 0.75rem;
  color: #5f6368;
  font-style: italic;
}

.devtools__entry {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  line-height: 1.5;
}

.devtools__entry--warn {
  background: rgba(255, 170, 0, 0.08);
  border-left: 3px solid #ffaa00;
}

.devtools__entry--error {
  background: rgba(217, 48, 37, 0.1);
  border-left: 3px solid #d93025;
}

.devtools__icon {
  flex-shrink: 0;
  margin-top: 0.05em;
  line-height: 1;
}

.devtools__entry--warn .devtools__icon {
  color: #ffaa00;
}

.devtools__entry--error .devtools__icon {
  color: #d93025;
}

.devtools__message {
  color: #e8eaed;
  word-break: break-word;
  white-space: pre-wrap;
}

.devtools__entry--warn .devtools__message {
  color: #fdd663;
}

.devtools__entry--error .devtools__message {
  color: #f28b82;
}
</style>
