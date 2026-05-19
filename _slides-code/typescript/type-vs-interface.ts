export {};

// =============================================================================
// type vs interface — and why type wins for derived types
// =============================================================================

// Both can describe an object shape — they're equivalent here:

interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

type UserType = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
};

// =============================================================================
// Where `type` wins: derived types
// =============================================================================

// ─── Omit ─────────────────────────────────────────────────────────────────────
// Strip properties from an existing type — no copy-pasting, no drift.

type NewUser = Omit<UserType, "id" | "createdAt">;
// { name: string; email: string; role: "admin" | "editor" | "viewer" }

// ─── Pick ─────────────────────────────────────────────────────────────────────
// Keep only specific properties.

type UserSummary = Pick<UserType, "id" | "name">;
// { id: number; name: string }

// ─── Extend by intersection ───────────────────────────────────────────────────
// Add new properties on top of an existing type.

type AdminUser = UserType & {
  permissions: string[];
  lastLogin: Date;
};

// ─── Partial & Required ───────────────────────────────────────────────────────
// Make all properties optional (for form state, patches, etc.)

type UserPatch = Partial<UserType>;
// { id?: number; name?: string; email?: string; ... }

// ─── Why not interface for these? ─────────────────────────────────────────────
// `interface` cannot express Omit, Pick, or mapped types directly.
// You would have to manually re-declare every property — defeating the point.

// ❌ With interface — manual, fragile, drifts from source:
interface NewUserInterface {
  name: string;       // duplicated from UserInterface
  email: string;      // duplicated from UserInterface
  role: "admin" | "editor" | "viewer"; // duplicated from UserInterface
  // If UserInterface adds a field, this won't update automatically
}

// ✅ With type — single source of truth, always in sync:
type NewUserDerived = Omit<UserType, "id" | "createdAt">;
