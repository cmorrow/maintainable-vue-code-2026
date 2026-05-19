<script setup lang="ts">
import DashboardSidebar from "./DashboardSidebar.vue";
import ComponentFrame from "../../shared/ComponentFrame.vue";
import ComponentFrameCustom from "../../shared/ComponentFrameCustom.vue";
</script>

<template>
  <!--
    This middle component does not need a currentUser prop.
    That is the benefit of provide/inject here:
    DashboardLayout stays focused on layout instead of passing data through.
  -->
  <ComponentFrame name="DashboardLayout">
    <main class="dashboard-layout">
      <DashboardSidebar />

      <section class="dashboard-content">
        <slot />
      </section>
    </main>
  </ComponentFrame>
</template>
