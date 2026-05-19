import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUserMutation } from '../useUserMutation'

vi.mock('../usersDb', () => ({
  dbCreateUser: vi.fn(),
  dbUpdateUser: vi.fn(),
  dbDeleteUser: vi.fn(),
}))

import { dbCreateUser, dbUpdateUser, dbDeleteUser } from '../usersDb'

const formData = { name: 'Jane Smith', email: 'jane@example.com', role: 'viewer' as const, bio: '', active: true }
const mockUser = { id: '1', joinedAt: '2024-01-01', ...formData }

describe('useUserMutation', () => {
  beforeEach(() => vi.clearAllMocks())

  describe('createUser', () => {
    it('returns true and clears error on success', async () => {
      vi.mocked(dbCreateUser).mockResolvedValue(mockUser)
      const { createUser, saving, error } = useUserMutation()

      const result = await createUser(formData)

      expect(result).toBe(true)
      expect(error.value).toBeNull()
      expect(saving.value).toBe(false)
    })

    it('returns false and sets error on failure', async () => {
      vi.mocked(dbCreateUser).mockRejectedValue(new Error('DB error'))
      const { createUser, error } = useUserMutation()

      const result = await createUser(formData)

      expect(result).toBe(false)
      expect(error.value).toBe('Failed to create user')
    })
  })

  describe('updateUser', () => {
    it('returns true and clears error on success', async () => {
      vi.mocked(dbUpdateUser).mockResolvedValue(mockUser)
      const { updateUser, saving, error } = useUserMutation()

      const result = await updateUser('1', { name: 'Updated' })

      expect(result).toBe(true)
      expect(error.value).toBeNull()
      expect(saving.value).toBe(false)
    })

    it('returns false and sets error on failure', async () => {
      vi.mocked(dbUpdateUser).mockRejectedValue(new Error('Not found'))
      const { updateUser, error } = useUserMutation()

      const result = await updateUser('999', { name: 'Ghost' })

      expect(result).toBe(false)
      expect(error.value).toBe('Failed to update user')
    })
  })

  describe('deleteUser', () => {
    it('returns true and clears error on success', async () => {
      vi.mocked(dbDeleteUser).mockResolvedValue(undefined)
      const { deleteUser, saving, error } = useUserMutation()

      const result = await deleteUser('1')

      expect(result).toBe(true)
      expect(error.value).toBeNull()
      expect(saving.value).toBe(false)
    })

    it('returns false and sets error on failure', async () => {
      vi.mocked(dbDeleteUser).mockRejectedValue(new Error('Not found'))
      const { deleteUser, error } = useUserMutation()

      const result = await deleteUser('999')

      expect(result).toBe(false)
      expect(error.value).toBe('Failed to delete user')
    })
  })
})
