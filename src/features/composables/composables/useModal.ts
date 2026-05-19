import { readonly, ref } from 'vue'

export function useModal() {
  const _open = ref(false)

  return {
    isOpen: readonly(_open),
    open: () => { _open.value = true },
    close: () => { _open.value = false },
    toggle: () => { _open.value = !_open.value },
  }
}
