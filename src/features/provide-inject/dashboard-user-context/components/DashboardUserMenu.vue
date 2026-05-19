<script setup lang="ts">
import { inject } from "vue";
import ComponentFrame from "../../shared/ComponentFrame.vue";
import {
  currentUserContextKey,
  USER_ROLES,
} from "../context/currentUserContext";

const userContext = inject(currentUserContextKey)!;

if (!userContext) {
  throw new Error("DashboardUserMenu must be used inside DashboardPage");
}

const roleOptions = USER_ROLES;

function changeRole(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  const role = USER_ROLES.find((r) => r === value);
  if (!role) return;
  userContext.updateCurrentUserRole(role);
}
</script>

<template>
  <ComponentFrame name="DashboardUserMenu" role="inject">
    <section class="dashboard-user-menu">
      <div class="current-user-role-editor">
        <p>
          <strong>{{ userContext.currentUser.value.name }}</strong>
          <br />
          <span>{{ userContext.currentUser.value.email }}</span>
        </p>

        <label>
          Role

          <select
            :value="userContext.currentUser.value.role"
            @change="changeRole"
          >
            <option v-for="role in roleOptions" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </label>
      </div>
    </section>
  </ComponentFrame>
</template>
