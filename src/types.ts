export type UserRole = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  bio: string
  joinedAt: string
  active: boolean
}

export interface Post {
  id: string
  userId: string
  title: string
  body: string
  createdAt: string
}

export interface UserSettings {
  userId: string
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}
