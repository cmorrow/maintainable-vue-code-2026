import { readonly, ref } from 'vue'
import type { User } from '@/types'
import { dbGetUsers } from './usersDb'

export function useUserList() {
  const _users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      _users.value = await dbGetUsers()
    } catch {
      error.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  load()

  return {
    users: readonly(_users),
    loading: readonly(loading),
    error: readonly(error),
    refresh: load,
  }
}
