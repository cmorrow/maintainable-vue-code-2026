import { describe, it, expect } from 'vitest'
import { useUserDeleteConfirm } from '../useUserDeleteConfirm'
import type { User } from '@/types'

const mockUser: User = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'viewer',
  bio: '',
  joinedAt: '2024-01-01',
  active: true,
}

describe('useUserDeleteConfirm', () => {
  it('starts with no pending user', () => {
    const { pendingUser } = useUserDeleteConfirm()
    expect(pendingUser.value).toBeNull()
  })

  it('confirm sets the pending user', () => {
    const { pendingUser, confirm } = useUserDeleteConfirm()
    confirm(mockUser)
    expect(pendingUser.value).toEqual(mockUser)
  })

  it('cancel clears the pending user', () => {
    const { pendingUser, confirm, cancel } = useUserDeleteConfirm()
    confirm(mockUser)
    cancel()
    expect(pendingUser.value).toBeNull()
  })
})
