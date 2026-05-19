<script setup lang="ts">
import DashboardUserMenu from './DashboardUserMenu.vue'
import ComponentFrame from '../../shared/ComponentFrame.vue'
</script>

<template>
  <!--
    Sidebar also does not need a currentUser prop.
    Without provide/inject, this component might only receive currentUser
    so it can pass it down to UserMenu. That is prop drilling.
  -->
  <ComponentFrame name="DashboardSidebar">
    <aside class="sidebar">
      <DashboardUserMenu />
    </aside>
  </ComponentFrame>
</template>
