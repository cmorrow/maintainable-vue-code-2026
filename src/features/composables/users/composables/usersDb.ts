import { delay, mockUsers } from '@/mocks/db'
import type { User } from '@/types'

const STORAGE_KEY = 'vue-demo-users'

function load(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as User[]
  } catch {}
  return mockUsers.map(u => ({ ...u }))
}

function save(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export async function dbGetUsers(): Promise<User[]> {
  await delay(300)
  return load()
}

export async function dbCreateUser(data: Omit<User, 'id' | 'joinedAt'>): Promise<User> {
  await delay(400)
  const users = load()
  const user: User = {
    ...data,
    id: crypto.randomUUID(),
    joinedAt: new Date().toISOString().slice(0, 10),
  }
  save([...users, user])
  return { ...user }
}

export async function dbUpdateUser(id: string, data: Partial<Omit<User, 'id' | 'joinedAt'>>): Promise<User> {
  await delay(350)
  const users = load()
  const idx = users.findIndex(u => u.id === id)
  if (idx === -1) throw new Error(`User "${id}" not found`)
  const updated = { ...users[idx], ...data }
  users[idx] = updated
  save(users)
  return { ...updated }
}

export async function dbDeleteUser(id: string): Promise<void> {
  await delay(300)
  const users = load()
  const filtered = users.filter(u => u.id !== id)
  if (filtered.length === users.length) throw new Error(`User "${id}" not found`)
  save(filtered)
}

export function dbReset(): void {
  localStorage.removeItem(STORAGE_KEY)
}
