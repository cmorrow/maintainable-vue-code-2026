import { delay, mockPosts, mockUsers } from '@/mocks/db'
import type { Post, User, UserSettings } from '@/types'

const mockSettings: Record<string, UserSettings> = {
  '1': { userId: '1', theme: 'dark', notifications: true, language: 'en' },
  '2': { userId: '2', theme: 'dark', notifications: false, language: 'en' },
  '3': { userId: '3', theme: 'light', notifications: true, language: 'fr' },
  '4': { userId: '4', theme: 'dark', notifications: true, language: 'de' },
}

export async function fetchUser(id: string): Promise<User> {
  await delay(300)
  const user = mockUsers.find(u => u.id === id)
  if (!user) throw new Error(`User "${id}" not found`)
  return { ...user }
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  await delay(450)
  return mockPosts.filter(p => p.userId === userId).map(p => ({ ...p }))
}

export async function fetchUserSettings(userId: string): Promise<UserSettings> {
  await delay(200)
  const s = mockSettings[userId]
  if (!s) throw new Error(`Settings for user "${userId}" not found`)
  return { ...s }
}
