<script setup lang="ts">
import type { PropType } from "vue";

type User = {
  id: number;
  name: string;
  email: string;
};
type UserStatus = "syncing" | "synced" | "version-conflict" | "error";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,

    validator(u: unknown) {
      if (!u || typeof u !== "object") return false;
      const o = u as Record<string, unknown>;
      return (
        typeof o.id === "number" &&
        typeof o.name === "string" &&
        typeof o.email === "string"
      );
    },
  },
  status: {
    type: String as PropType<UserStatus>,
    validator: (value: string): boolean => {
      return ["syncing", "synced", "version-conflict", "error"].includes(value);
    },
  },
});
</script>

<template>
  <div class="user-card">
    <span>{{ status }}</span>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
