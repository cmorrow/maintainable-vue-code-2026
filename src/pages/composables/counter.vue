<script setup lang="ts">
import { useCounter } from "@/features/composables/basic/useCounter";
const { count, increment, decrement } = useCounter();
</script>
<template>
  <div class="counter-row">
    <button @click="decrement">-</button>
    {{ count }}
    <button @click="increment">+</button>
  </div>
</template>
