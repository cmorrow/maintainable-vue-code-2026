small-vue-project/
├── src/
│ ├── assets/ # Global CSS, images, fonts
│ ├── components/ # Reusable Vue components
│ │ ├── base/ # Base UI components
│ │ ├── forms/ # Form-related components
│ │ └── layout/ # Header, sidebar, footer
│ ├── composables/ # Reusable Composition API logic
│ ├── pages/ # Page components
│ ├── router/ # Vue Router setup
│ │ └── index.ts
│ ├── stores/ # Pinia stores
│ ├── services/ # API calls and external services
│ │ ├── api.ts
│ │ └── auth.ts
│ ├── utils/ # Pure helper functions
│ ├── types/ # Typescript interfaces/types
│ └── App.vue # Root app component
│ └── main.ts # App entry point
├── tests/
│ ├── unit/
│ └── e2e/
├── .env
├── vite.config.ts
├── tsconfig.json
├── package.json
└── eslint.config.js

large-vue-project/
├── public/ # Static public assets
│
├── src/
│ ├── app/ # App-level setup
│ │ ├── router/ # Vue Router config
│ │ │ └── index.ts
│ │ ├── providers/ # App providers/plugins setup
│ │ └── App.vue # Root component
│ │
│ ├── features/ # Feature-based app modules
│ │ ├── auth/
│ │ │ ├── components/ # Auth-specific components
│ │ │ ├── composables/ # Auth-specific reusable logic
│ │ │ ├── pages/ # Login, register, forgot password
│ │ │ ├── services/ # Auth API calls
│ │ │ ├── stores/ # Auth state
│ │ │ └── types/ # Auth TypeScript types
│ │ │
│ │ ├── dashboard/
│ │ │ ├── components/
│ │ │ ├── composables/
│ │ │ ├── pages/
│ │ │ ├── services/
│ │ │ ├── stores/
│ │ │ └── types/
│ │ │
│ │ └── user-profile/
│ │ ├── components/
│ │ ├── composables/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── stores/
│ │ └── types/
│ │
│ ├── shared/ # Reusable across multiple features
│ │ ├── components/ # Shared/global components
│ │ ├── composables/ # Shared composables
│ │ ├── services/ # Shared API client/base services
│ │ ├── utils/ # Pure helper functions
│ │ ├── types/ # Shared TypeScript types
│ │ └── constants/ # Shared constants
│ │
│ ├── assets/ # Images, fonts, global CSS
│ └── main.ts # App entry point
│
├── tests/
│ ├── unit/
│ └── e2e/
│
├── vite.config.ts
├── tsconfig.json
├── package.json
└── eslint.config.js

large-vue-project/
├── public/ # Static public assets
│
├── src/
│ ├── app/ # App-level setup
│ │ ├── router/ # Vue Router config
│ │ │ └── index.ts
│ │ ├── providers/ # App providers/plugins setup
│ │ └── App.vue # Root component
│ │
│ ├── features/ # Feature-based app modules
│ │ ├── auth/
│ │ │ ├── components/ # Auth-specific components
│ │ │ ├── composables/ # Auth-specific reusable logic
│ │ │ ├── pages/ # Login, register, forgot password
│ │ │ ├── services/ # Auth API calls
│ │ │ ├── stores/ # Auth state
│ │ │ └── types/ # Auth TypeScript types
│ │ │
│ │ ├── dashboard/
│ │ │ ├── ...
│ │ │
│ │ └── user-profile/
│ │ ├── ...
│ │
│ ├── shared/ # Reusable across multiple features
│ │ ├── components/ # Shared/global components
│ │ ├── composables/ # Shared composables
│ │ ├── services/ # Shared API client/base services
│ │ ├── utils/ # Pure helper functions
│ │ ├── types/ # Shared TypeScript types
│ │ └── constants/ # Shared constants
│ │
│ ├── assets/ # Images, fonts, global CSS
│ └── main.ts # App entry point
│
├── tests/
│ ├── unit/
│ └── e2e/
│
├── vite.config.ts
├── tsconfig.json
├── package.json
└── eslint.config.js
