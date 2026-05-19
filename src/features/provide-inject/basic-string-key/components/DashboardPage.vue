<script setup lang="ts">
import { provide, ref } from "vue";
import DashboardLayout from "./DashboardLayout.vue";
import ComponentFrame from "../../shared/ComponentFrame.vue";

type CurrentUser = {
  id: number;
  name: string;
  role: "admin" | "editor" | "viewer";
};

const currentUser = ref<CurrentUser>({
  id: 1,
  name: "Chris",
  role: "admin",
});

// This is the simplest provide/inject key style: a plain string.
// Any descendant component can inject this value using the same string.
//
// This is easy for demos, but string keys are not ideal for larger apps
// because they can be mistyped, reused by accident, and are not strongly typed.
provide("currentUser", currentUser);
</script>

<template>
  <ComponentFrame name="DashboardPage" role="provide">
    <DashboardLayout />
  </ComponentFrame>
</template>
