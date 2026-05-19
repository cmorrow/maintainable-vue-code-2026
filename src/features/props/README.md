
# Vue 3 Prop Definitions and Validators

In Vue 3, detailed prop definitions help create predictable, maintainable, and reusable components.

Detailed prop definitions provide:

- Type validation
- Required enforcement
- Default values
- Custom validation rules with `validator`

The `validator` function is especially useful when a prop must match a limited set of acceptable values or business rules.

---

# Example 1 — Button Component with Variant Validation

A classic use case for `validator` is limiting acceptable UI variants.

## File: `MyButton.vue`

```vue
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },

  variant: {
    type: String,
    default: 'primary',

    validator(value) {
      return [
        'primary',
        'secondary',
        'danger',
        'ghost'
      ].includes(value)
    }
  },

  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :class="`btn-${variant}`"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>
```

## Why use validator here?

Without validation:

```vue
<MyButton variant="purple-chaos" />
```

Your component may render broken styles or inconsistent UI.

The validator prevents invalid variants and gives a Vue console warning during development.

## What validator does

The validator function:

```js
validator(value) {
  return ['primary', 'secondary'].includes(value)
}
```

- Receives the prop value
- Must return `true` or `false`
- Vue warns in development if validation fails

It does NOT stop rendering in production.
It is a developer safety mechanism, not security.

---

# Example 2 — User Card with Complex Object Validation

This is useful when receiving structured API data.

## File: `UserCard.vue`

```vue
<script setup>
defineProps({
  user: {
    type: Object,
    required: true,

    validator(user) {
      return (
        typeof user.id === 'number' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string'
      )
    }
  }
})
</script>

<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
```

## Why this matters

Sometimes APIs change unexpectedly.

Maybe your backend suddenly returns:

```js
{
  id: "15",
  name: null
}
```

Without validation:
- your UI may silently fail
- runtime bugs appear deeper in the app
- debugging becomes painful

With a validator:
Vue immediately warns you during development.

## Better long-term approach

For larger apps, combine:
- TypeScript
- Zod
- API schema validation

Prop validators are lightweight and best for component-level safety.

---

# Example 3 — Chart Component with Numeric Constraints

Validators are great for enforcing ranges.

## File: `ProgressChart.vue`

```vue
<script setup>
defineProps({
  percentage: {
    type: Number,
    required: true,

    validator(value) {
      return value >= 0 && value <= 100
    }
  },

  size: {
    type: Number,
    default: 200,

    validator(value) {
      return value >= 100 && value <= 500
    }
  }
})
</script>

<template>
  <div
    class="chart"
    :style="{
      width: `${size}px`,
      height: `${size}px`
    }"
  >
    {{ percentage }}%
  </div>
</template>
```

## Why this is useful

You prevent impossible states:

```vue
<ProgressChart :percentage="400" />
```

or

```vue
<ProgressChart :size="10" />
```

before they create broken layouts.

---

# When You Should Use Prop Validators

Use validators when:

- A prop has a limited set of accepted values
- Numeric ranges matter
- Object structure matters
- Business rules must be enforced
- You want reusable components to fail loudly during development

Good examples:
- button variants
- theme names
- chart sizes
- pagination limits
- API response sanity checks

---

# When NOT to Use Validators

Avoid huge validator logic like this:

```js
validator(value) {
  // 50 lines of business logic
}
```

That becomes hard to maintain.

Instead:
- move logic to composables
- use schema validation libraries
- validate API data before components receive it

---

# Composition API + TypeScript Version

In real production Vue apps, many teams now prefer TypeScript prop typing:

```ts
interface Props {
  variant: 'primary' | 'secondary'
  disabled?: boolean
}

const props = defineProps<Props>()
```

But validators still help when:
- data comes from APIs
- JavaScript consumers use your component library
- runtime validation is needed

TypeScript only protects compile time.
Validators protect runtime.

---

# Key Takeaway

Detailed prop definitions help prevent “mystery component behavior.”

The biggest maintainability wins come from:
- explicit types
- required props
- constrained valid values
- predictable component APIs

That’s one of the core differences between maintainable Vue apps and spaghetti Vue apps.
