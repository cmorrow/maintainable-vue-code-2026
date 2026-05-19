<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import ComponentFrame from "../shared/ComponentFrame.vue";
import {
  currentUserContextKey,
  type CurrentUser,
  type UserRole,
} from "./context/currentUserContext";

const currentUser = ref<CurrentUser>({
  id: 1,
  name: "Thomas Anderson",
  email: "tanderson@metacortex.com",
  role: "admin",
});

function updateCurrentUserRole(role: UserRole) {
  currentUser.value = {
    ...currentUser.value,
    role,
  };
}

// DashboardPage owns the current user state and provides it to descendants.
//
// The provided state is readonly, so child components cannot directly mutate it.
// Children must call updateCurrentUserRole(), which keeps changes predictable.
//
// The key is a typed Symbol from currentUserContext.ts.
// That is safer than a string key because it avoids accidental collisions
// and gives TypeScript the expected context type.
provide(currentUserContextKey, {
  currentUser: readonly(currentUser),
  updateCurrentUserRole,
});
</script>

<template>
  <ComponentFrame name="DashboardPage" role="provide">
    <DashboardLayout />
  </ComponentFrame>
</template>
