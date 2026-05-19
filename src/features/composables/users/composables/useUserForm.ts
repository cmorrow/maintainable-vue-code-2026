import { reactive, readonly, ref } from 'vue'
import type { User, UserRole } from '@/types'

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  bio: string
  active: boolean
}

function emptyForm(): UserFormData {
  return { name: '', email: '', role: 'viewer', bio: '', active: true }
}

export function useUserForm() {
  const isOpen = ref(false)
  const editingId = ref<string | null>(null)
  const form = reactive<UserFormData>(emptyForm())

  function openCreate() {
    Object.assign(form, emptyForm())
    editingId.value = null
    isOpen.value = true
  }

  function openEdit(user: User) {
    Object.assign(form, {
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      active: user.active,
    })
    editingId.value = user.id
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    editingId.value = null
  }

  return {
    isOpen: readonly(isOpen),
    editingId: readonly(editingId),
    form,
    openCreate,
    openEdit,
    close,
  }
}
