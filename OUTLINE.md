# Maintainable Vue — Talk Outline

- **Props: Detailed Definitions & Validators**
  - Runtime object syntax (`defineProps({ ... })`)
  - TypeScript generic syntax (`defineProps<Props>()`)
  - Vue 3.5 reactive destructure defaults
  - `PropType<T>` for union string literals
  - Inline validators (range checks, allowlist checks)
  - Option comparison: runtime vs. TS interface vs. hybrid
    - Option A: runtime object + reactive destructure defaults
    - Option B: TS interface + reactive destructure defaults
    - Option C: runtime object with selective `PropType` + reactive destructure
  - Trade-offs: validators only available in runtime syntax

- **Provide / Inject**
  - Props & emits as the default (direct parent–child relationships)
  - Basic provide / inject for tree-scoped context
    - Ancestor provides; deep descendant injects; intermediaries stay clean
  - Real-world patterns
    - Dashboard: `currentUser` provided once, injected in `UserMenu`
    - Modal: open/close actions and open state shared via context
    - Form: fields self-register with parent form via inject
    - Tabs: active tab and setter shared across tab buttons and panels
  - Decision guide: when to use each pattern
    - Props — child needs data from direct parent
    - Emits — child notifies direct parent of an event
    - Provide / inject — deeply nested descendant needs ancestor context
    - Pinia — app-wide state (logged-in user, cart, permissions, notifications)

- **Composables**
  - Extracting reactive state and behavior into plain functions
  - Basic composable: `useCounter` (state + increment)
  - Page refactor pattern: before and after
    - Before: logic inline in the component
    - After: logic extracted into composable; view focuses on template and layout
