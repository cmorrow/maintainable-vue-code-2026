<script setup lang="ts">
import { inject } from "vue";
import DashboardSidebar from "./DashboardSidebar.vue";
import ComponentFrame from "../../shared/ComponentFrame.vue";
import { currentUserContextKey } from "../context/currentUserContext";

const userContext = inject(currentUserContextKey)!;
</script>

<template>
  <!--
    Level 1 below DashboardPage.

    DashboardLayout does not accept currentUser as a prop.
    It only cares about layout, so provide/inject prevents this component
    from becoming a pass-through prop delivery truck.
  -->
  <ComponentFrame name="DashboardLayout">
    <main class="dashboard-layout">
      <DashboardSidebar />

      <section class="dashboard-main">
        <h1>Dashboard</h1>
        <p>The current user context is provided by DashboardPage.</p>
        <dl class="user-stats">
          <div class="user-stat">
            <dt>Current user</dt>
            <dd>{{ userContext.currentUser.value.name }}</dd>
          </div>
          <div class="user-stat">
            <dt>Current role</dt>
            <dd>{{ userContext.currentUser.value.role }}</dd>
          </div>
        </dl>
        <div class="caption">
          (Change it in the sidebar to see updates across the dashboard!)
        </div>
      </section>
    </main>
  </ComponentFrame>
</template>
<style scoped>
.caption {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.user-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
}

.user-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.user-stat dt {
  color: var(--color-text-muted);
  font-weight: 500;
  flex-shrink: 0;
}

.user-stat dd {
  margin: 0;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb) / 0.1);
  border: 1px solid rgba(var(--color-accent-rgb) / 0.3);
  border-radius: 4px;
  padding: 0.1em 0.5em;
}
</style>
