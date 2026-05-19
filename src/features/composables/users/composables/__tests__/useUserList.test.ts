import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUserList } from '../useUserList'

vi.mock('../usersDb', () => ({
  dbGetUsers: vi.fn(),
}))

import { dbGetUsers } from '../usersDb'

const mockUsers = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'viewer' as const, bio: '', joinedAt: '2024-01-01', active: true },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com', role: 'editor' as const, bio: '', joinedAt: '2024-02-01', active: false },
]

describe('useUserList', () => {
  beforeEach(() => vi.clearAllMocks())

  it('is in loading state immediately after creation', () => {
    vi.mocked(dbGetUsers).mockResolvedValue(mockUsers)
    const { loading } = useUserList()
    expect(loading.value).toBe(true)
  })

  it('loads users on init and clears loading state', async () => {
    vi.mocked(dbGetUsers).mockResolvedValue(mockUsers)
    const { users, loading, error } = useUserList()

    await vi.waitUntil(() => !loading.value)

    expect(users.value).toEqual(mockUsers)
    expect(error.value).toBeNull()
  })

  it('sets error and clears loading when fetch fails', async () => {
    vi.mocked(dbGetUsers).mockRejectedValue(new Error('Network error'))
    const { error, loading } = useUserList()

    await vi.waitUntil(() => !loading.value)

    expect(error.value).toBe('Failed to load users')
  })

  it('refresh reloads the user list', async () => {
    vi.mocked(dbGetUsers).mockResolvedValue([])
    const { users, loading, refresh } = useUserList()
    await vi.waitUntil(() => !loading.value)

    vi.mocked(dbGetUsers).mockResolvedValue(mockUsers)
    await refresh()

    expect(users.value).toEqual(mockUsers)
  })
})
