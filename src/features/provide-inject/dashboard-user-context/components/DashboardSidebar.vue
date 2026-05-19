<script setup lang="ts">
import DashboardUserMenu from './DashboardUserMenu.vue'
import ComponentFrame from '../../shared/ComponentFrame.vue'
</script>

<template>
  <!--
    Level 2 below DashboardPage.

    DashboardSidebar also does not need currentUser as a prop.
    It simply renders sidebar content.
  -->
  <ComponentFrame name="DashboardSidebar">
    <aside class="dashboard-sidebar">
      <DashboardUserMenu />
    </aside>
  </ComponentFrame>
</template>
