The short answer is **yes**. Defaulting to `ref` everywhere—including for objects and arrays—has become the _de facto_ community best practice and is heavily favored by many Vue core team members.

While the official Vue documentation presents both options neutrally, leaning exclusively on `ref` provides structural consistency and eliminates several subtle reactivity bugs that trap even seasoned developers.

Here is a breakdown of why the community has leaned toward "refs everywhere," the pros and cons of each, and the few places where `reactive` still makes sense.

---

## Ref vs. Reactive: At a Glance

| Feature                | `ref(val)`                                               | `reactive(obj)`                                       |
| ---------------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| **Argument Types**     | Primitives (`String`, `Number`, etc.) AND Objects/Arrays | **Only** Objects, Arrays, Maps, and Sets              |
| **Access in Script**   | Requires `.value` (e.g., `count.value`)                  | Direct access (e.g., `state.count`)                   |
| **Access in Template** | Automatically unwrapped (no `.value` needed)             | Direct access                                         |
| **Reassignment**       | Fully supported (`user.value = newObj`)                  | **Breaks reactivity** if you reassign the root object |
| **Destructuring**      | Retains reactivity if passed as a ref                    | **Breaks reactivity** unless wrapped in `toRefs()`    |

---

## The Case for Using `ref` Everywhere

### The Pros of `ref`

- **Single Mental Model:** You don't have to constantly decide between `ref` and `reactive` based on data types. If it’s reactive state, it’s a `ref`.
- **Visual Reactive Markers:** The `.value` property acts as an explicit codebase marker. When reading a complex script block, you instantly know which variables are tracked dependencies and which are standard local variables.
- **Safe Reassignment:** If you fetch a new user object from an API, you can overwrite a ref completely:

```ts
const user = ref({ name: "Alex" });
// Works perfectly:
user.value = { name: "Jordan" };
```

- **Seamless Passing:** You can pass a `ref` into composables or sub-functions without losing reactivity. The receiving function just tracks the `.value`.

### The Cons of `ref`

- **Syntactic Noise:** Writing `.value` everywhere in your JavaScript/TypeScript files can feel tedious and look cluttered, especially for highly nested objects.

---

## The Pitfalls of `reactive` (Why it's avoided)

The primary reason developers abandon `reactive` isn't capabilities—it's **predictability**. `reactive` uses JavaScript Proxies under the hood, which creates two major footguns:

### 1. The Reassignment Trap

If you reassign a `reactive` object, you break the connection to the initial Proxy wrapper, killing reactivity silently.

```ts
let state = reactive({ count: 0 });
// This breaks reactivity completely:
state = reactive({ count: 1 });
```

To safely update it, you have to mutate individual properties or use `Object.assign(state, newObj)`, which feels clumsy.

### 2. The Destructuring Trap

Destructuring a reactive object or spreading it (`...state`) strips away its reactivity, turning the properties into plain local variables.

```ts
const state = reactive({ count: 0, name: "Chris" });

// 'count' is now just a plain number; it will not update the DOM if changed
const { count } = state;
```

---

## Should `reactive` ever be used?

Despite the shift toward `ref`, `reactive` is not deprecated and still has valid use cases. It excels when you want to group **highly related, local state** that is updated together and never passed around or reassigned as a whole.

### 1. Form State

Forms are the perfect use case for `reactive`. They are inherently object-based, rarely reset by wiping the whole object, and benefit from clean syntax without `.value`.

```ts
const form = reactive({
  username: "",
  email: "",
  password: "",
});

// Clean submission handling with no .value clutter
const submit = () => {
  api.post("/register", form);
};
```

### 2. Legacy/Options-API Style Migration

If you are migrating an older codebase from the Options API to the Composition API, wrapping your old `data()` object inside a single `reactive` wrapper allows you to keep your existing variable references intact without rewriting your entire script to include `.value`.

---

## Recommendation

For clean, highly maintainable feature architectures (especially when working with Nuxt 4 and heavily utilizing composables), **stick to `ref` by default**. Reserve `reactive` strictly for localized, object-heavy components like forms or complex data tables where the syntactic noise of `.value` outweighs the risk of destructuring bugs.

---

## Contact Form Examples: `reactive` vs `ref`

### `reactive` contact form (works fine)

This is a normal `reactive` form object. Updating individual fields works perfectly.

```ts
import { reactive } from "vue";

const contactForm = reactive({
  name: "",
  email: "",
  message: "",
});

function submitForm() {
  api.post("/contact", contactForm);
}

function resetForm() {
  Object.assign(contactForm, {
    name: "",
    email: "",
    message: "",
  });
}
```

```html
<template>
  <form @submit.prevent="submitForm">
    <input v-model="contactForm.name" placeholder="Name" />
    <input v-model="contactForm.email" placeholder="Email" />
    <textarea v-model="contactForm.message" placeholder="Message"></textarea>
    <button type="submit">Send</button>
  </form>
</template>
```

### `reactive` contact form (loses reactivity)

If you reassign the whole object, reactivity is lost because `reactive` only tracks the original proxy.

```ts
import { reactive } from "vue";

let contactForm = reactive({
  name: "",
  email: "",
  message: "",
});

function replaceForm() {
  contactForm = {
    name: "Jane",
    email: "jane@example.com",
    message: "Hello!",
  };
}
```

After `replaceForm()` runs, the template is still bound to the old reactive proxy, so the new plain object is not tracked and updates will not reflect.

---

## `ref` contact form examples

### `ref` with an object

Using `ref` for the whole form object keeps the same behavior but also allows safe reassignment.

```ts
import { ref } from "vue";

const contactForm = ref({
  name: "",
  email: "",
  message: "",
});

function submitForm() {
  api.post("/contact", contactForm.value);
}

function resetForm() {
  contactForm.value = {
    name: "",
    email: "",
    message: "",
  };
}
```

```html
<template>
  <form @submit.prevent="submitForm">
    <input v-model="contactForm.value.name" placeholder="Name" />
    <input v-model="contactForm.value.email" placeholder="Email" />
    <textarea
      v-model="contactForm.value.message"
      placeholder="Message"
    ></textarea>
    <button type="submit">Send</button>
  </form>
</template>
```

This is the same contact form concept, but `ref` preserves reactivity even after you do a complete object replacement.

### `ref` with primitive strings

If you prefer a field-per-ref approach, you can use plain string refs for each form value.

```ts
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

function submitForm() {
  api.post("/contact", {
    name: name.value,
    email: email.value,
    message: message.value,
  });
}

function resetForm() {
  name.value = "";
  email.value = "";
  message.value = "";
}
```

```html
<template>
  <form @submit.prevent="submitForm">
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <textarea v-model="message" placeholder="Message"></textarea>
    <button type="submit">Send</button>
  </form>
</template>
```

This version is especially simple when your form only has a few primitive fields.

---

## Why the `ref` versions are safer

- `ref({ ... })` lets you safely replace the whole payload with `contactForm.value = newForm`.
- Primitive refs like `name`, `email`, and `message` are always reactive and never break when reassigned.
- `reactive` is fine for property-by-property mutation, but it can lose reactivity if you reassign the root object.

How are you deciding whether to keep a form as `reactive` or convert it to `ref` in your own projects?

```

```
