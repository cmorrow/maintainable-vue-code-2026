import { readonly, ref } from 'vue'
import type { User } from '@/types'

export function useUserDeleteConfirm() {
  const _pending = ref<User | null>(null)

  function confirm(user: User) {
    _pending.value = user
  }

  function cancel() {
    _pending.value = null
  }

  return {
    pendingUser: readonly(_pending),
    confirm,
    cancel,
  }
}
