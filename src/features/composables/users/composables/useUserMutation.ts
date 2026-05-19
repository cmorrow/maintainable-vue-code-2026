import { readonly, ref } from 'vue'
import type { User } from '@/types'
import { dbCreateUser, dbDeleteUser, dbUpdateUser } from './usersDb'

export function useUserMutation() {
  const saving = ref(false)
  const error = ref<string | null>(null)

  async function createUser(data: Omit<User, 'id' | 'joinedAt'>): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      await dbCreateUser(data)
      return true
    } catch {
      error.value = 'Failed to create user'
      return false
    } finally {
      saving.value = false
    }
  }

  async function updateUser(id: string, data: Partial<Omit<User, 'id' | 'joinedAt'>>): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      await dbUpdateUser(id, data)
      return true
    } catch {
      error.value = 'Failed to update user'
      return false
    } finally {
      saving.value = false
    }
  }

  async function deleteUser(id: string): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      await dbDeleteUser(id)
      return true
    } catch {
      error.value = 'Failed to delete user'
      return false
    } finally {
      saving.value = false
    }
  }

  return {
    saving: readonly(saving),
    error: readonly(error),
    createUser,
    updateUser,
    deleteUser,
  }
}
