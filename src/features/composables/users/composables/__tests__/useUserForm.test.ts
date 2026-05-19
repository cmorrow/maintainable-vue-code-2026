import { describe, it, expect } from 'vitest'
import { useUserForm } from '../useUserForm'
import type { User } from '@/types'

const mockUser: User = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'editor',
  bio: 'Hello world',
  joinedAt: '2024-01-01',
  active: true,
}

describe('useUserForm', () => {
  it('starts closed with an empty form and no editingId', () => {
    const { isOpen, editingId, form } = useUserForm()
    expect(isOpen.value).toBe(false)
    expect(editingId.value).toBeNull()
    expect(form.name).toBe('')
    expect(form.email).toBe('')
    expect(form.role).toBe('viewer')
    expect(form.bio).toBe('')
    expect(form.active).toBe(true)
  })

  it('openCreate opens the modal with a blank form and no editingId', () => {
    const { isOpen, editingId, form, openEdit, openCreate } = useUserForm()
    openEdit(mockUser)
    openCreate()

    expect(isOpen.value).toBe(true)
    expect(editingId.value).toBeNull()
    expect(form.name).toBe('')
    expect(form.role).toBe('viewer')
  })

  it('openEdit opens the modal and populates the form with user data', () => {
    const { isOpen, editingId, form, openEdit } = useUserForm()
    openEdit(mockUser)

    expect(isOpen.value).toBe(true)
    expect(editingId.value).toBe('1')
    expect(form.name).toBe('Jane Smith')
    expect(form.email).toBe('jane@example.com')
    expect(form.role).toBe('editor')
    expect(form.bio).toBe('Hello world')
    expect(form.active).toBe(true)
  })

  it('close sets isOpen to false and clears editingId', () => {
    const { isOpen, editingId, openEdit, close } = useUserForm()
    openEdit(mockUser)
    close()

    expect(isOpen.value).toBe(false)
    expect(editingId.value).toBeNull()
  })
})
