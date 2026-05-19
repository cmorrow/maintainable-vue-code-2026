import type { InjectionKey, Ref } from 'vue'

export const USER_ROLES = ['admin', 'editor', 'viewer'] as const
export type UserRole = typeof USER_ROLES[number]

export type CurrentUser = {
  id: number
  name: string
  email: string
  role: UserRole
}

export type CurrentUserContext = {
  // Descendant components can read the current user.
  // Readonly prevents injected components from directly changing currentUser.
  currentUser: Readonly<Ref<CurrentUser>>

  // Descendant components use this action to request a role update.
  // This keeps user mutations centralized in the provider component.
  updateCurrentUserRole: (role: UserRole) => void
}

// This Symbol is the injection key for the current user context.
//
// Why Symbol instead of a string?
// - A Symbol is unique, so it avoids accidental key collisions.
// - A string like 'currentUser' could be reused somewhere else by mistake.
// - With InjectionKey<CurrentUserContext>, TypeScript knows the exact shape
//   of the value that should be provided and injected.
//
// This is the preferred pattern for production Vue apps.
export const currentUserContextKey: InjectionKey<CurrentUserContext> = Symbol('currentUserContext')
