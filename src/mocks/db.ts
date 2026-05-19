import type { User, Post } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    bio: 'Senior frontend engineer with a love for clean, maintainable code. Organizer of local Vue meetups.',
    joinedAt: '2023-01-15',
    active: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'editor',
    bio: 'Full-stack developer who believes great architecture is invisible. Obsessed with composables.',
    joinedAt: '2023-03-22',
    active: true,
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'viewer',
    bio: 'UI/UX designer learning to code. Vue enthusiast. Still afraid of watchers.',
    joinedAt: '2023-07-10',
    active: true,
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david@example.com',
    role: 'editor',
    bio: 'Open source contributor and conference speaker. Co-author of several VueUse composables.',
    joinedAt: '2024-01-05',
    active: false,
  },
]

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: '1',
    title: 'Why Composables Changed Everything for Me',
    body: 'When I first started using Vue 3, I was skeptical about composables. Mixins had burned me before. But composables are fundamentally different — they compose instead of merge, and the result is predictable.',
    createdAt: '2025-01-10',
  },
  {
    id: 'p2',
    userId: '1',
    title: 'The Case Against Watchers',
    body: 'Watchers are powerful, but they come with a cost. Every watcher is a hidden side effect, a piece of logic that fires invisibly when something changes. Reach for computed first — almost always.',
    createdAt: '2025-02-14',
  },
  {
    id: 'p3',
    userId: '1',
    title: 'Keeping Your Script Setup Clean',
    body: 'The script setup block is a blank canvas. The problem is that blank canvases invite sprawl. Structure your setup with a consistent vertical order and your components will read like prose.',
    createdAt: '2025-03-01',
  },
  {
    id: 'p4',
    userId: '2',
    title: 'Service Layers in Vue: Yes, You Need One',
    body: 'Direct fetch calls inside components are a smell. A service layer is not enterprise overhead — it is the simplest way to ensure your API calls are in one place and your components are testable.',
    createdAt: '2025-01-20',
  },
  {
    id: 'p5',
    userId: '2',
    title: 'Pinia vs Composables: When to Use Each',
    body: 'This debate comes up constantly. The short answer: composables for feature-scoped state, Pinia for app-level state that survives navigation. Start local, promote when you have a real reason.',
    createdAt: '2025-02-28',
  },
  {
    id: 'p6',
    userId: '3',
    title: 'Learning Vue as a Designer',
    body: 'I never thought I would be writing JavaScript, let alone TypeScript. But Vue\'s template syntax felt familiar enough to start, and composables gave me a mental model I could actually hold onto.',
    createdAt: '2025-01-05',
  },
  {
    id: 'p7',
    userId: '4',
    title: 'File Naming Conventions That Actually Scale',
    body: 'After working on a dozen Vue projects of different sizes, one pattern stands out: the official style guide\'s naming rules eliminate ambiguity before it starts. BaseButton, TheHeader, TodoListItem.',
    createdAt: '2025-03-10',
  },
  {
    id: 'p8',
    userId: '4',
    title: 'Contributing to VueUse',
    body: 'The VueUse library has become essential to my workflow. Every composable there is a masterclass in single responsibility and clean return shapes. Read the source — it will change how you write your own.',
    createdAt: '2025-04-01',
  },
]

export function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
