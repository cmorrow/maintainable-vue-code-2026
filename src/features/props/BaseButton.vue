<script setup lang="ts">
import type { PropType } from "vue";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

defineProps({
  label: {
    type: String,
    required: true,
  },

  variant: {
    type: String as PropType<ButtonVariant>,
    default: "primary",

    validator(value: unknown) {
      return ["primary", "secondary", "danger", "ghost"].includes(value as string);
    },
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="`btn-${variant}`"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>
