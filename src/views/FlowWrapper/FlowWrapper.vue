<template>
    <div class="flow-nav my-3">
      <!-- Left Icon -->
      <div class="left-side">
        <div class="left-icon">
          <i class="bi bi-shuffle fs-5"></i>
        </div>
  
        <!-- Title -->
        <div class="title-badge">التدقيق والمراسلات</div>
      </div>
  
      <!-- Tabs -->
      <div class="center-links">
        <div
          class="nav-item"
          :class="{ active: tab === 'flow' }"
          @click="tab = 'flow'"
        >
          التدقيق
        </div>
  
        <div
          class="nav-item"
          :class="{ active: tab === 'convert' }"
          @click="tab = 'convert'"
        >
          المراسلات
        </div>
      </div>
    </div>
  
    <!-- Dynamic Page -->
    <component :is="currentTab" :key="tab"></component>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Pages
  import Flow from "./Flow.vue";
  import ConvertAudit from "./ConvertAudit.vue";
  
  const tab = ref("flow");
  
  const currentTab = computed(() => {
    switch (tab.value) {
      case "flow":
        return Flow;
  
      case "convert":  
        return ConvertAudit;
  
      default:
        return Flow;
    }
  });
  </script>
  

  