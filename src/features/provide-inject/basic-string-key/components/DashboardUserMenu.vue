<script setup lang="ts">
import { inject, type Ref } from "vue";
import ComponentFrame from "../../shared/ComponentFrame.vue";

type CurrentUser = {
  id: number;
  name: string;
  role: "admin" | "editor" | "viewer";
};

// This inject call uses the same string key from DashboardPage.vue.
// The strings must match exactly.
//
// String-key downside:
// - 'currentUser' could be mistyped.
// - Another feature could accidentally provide the same string key.
// - TypeScript cannot automatically know the value shape from the string.
//
// For production code, prefer a typed Symbol key like the dashboard and modal examples.
const currentUser = inject<Ref<CurrentUser>>("currentUser");

if (!currentUser) {
  throw new Error("currentUser was not provided");
}
</script>

<template>
  <ComponentFrame name="DashboardUserMenu" role="inject">
    <div class="user-menu">
      <strong>{{ currentUser.name }}</strong>
      <select id="userRoleSelect" v-model="currentUser.role">
        <option value="admin">admin</option>
        <option value="editor">editor</option>
        <option value="viewer">viewer</option>
      </select>
    </div>
  </ComponentFrame>
</template>
<style scoped>
select {
  margin-left: 0.5rem;
  background-color: black;
  border-radius: 3px;
  padding: 0.25rem;
  color: white;
}
</style>
