import { ref, onUnmounted } from 'vue'

export interface ConsoleEntry {
  id: number
  type: 'warn' | 'error'
  message: string
}

const entries = ref<ConsoleEntry[]>([])
let activeCount = 0
let idCounter = 0
let originalWarn: (typeof console)['warn'] | null = null
let originalError: (typeof console)['error'] | null = null

function patch() {
  originalWarn = console.warn
  originalError = console.error

  console.warn = (...args: unknown[]) => {
    entries.value.push({ id: idCounter++, type: 'warn', message: args.map(String).join(' ') })
    originalWarn!(...args)
  }

  console.error = (...args: unknown[]) => {
    entries.value.push({ id: idCounter++, type: 'error', message: args.map(String).join(' ') })
    originalError!(...args)
  }
}

function unpatch() {
  if (originalWarn) console.warn = originalWarn
  if (originalError) console.error = originalError
  originalWarn = null
  originalError = null
}

export function useConsoleCapture() {
  if (activeCount === 0) patch()
  activeCount++

  onUnmounted(() => {
    activeCount--
    if (activeCount === 0) unpatch()
  })

  function clear() {
    entries.value = []
  }

  return { entries, clear }
}
