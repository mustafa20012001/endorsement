<template>
    <div class="flow-nav my-3">
      <!-- Left Icon -->
      <div class="left-side">
        <div class="left-icon">
          <i class="bi bi-arrow-repeat fs-5"></i>
        </div>
  
        <!-- Title -->
        <div class="title-badge">الاسترجاع والمراسلات</div>
      </div>
  
      <!-- Tabs -->
      <div class="center-links">
        <div
          class="nav-item"
          :class="{ active: tab === 'return' }"
          @click="tab = 'return'"
        >
        الاسترجاع
        </div>
  
        <div
          class="nav-item"
          :class="{ active: tab === 'convert' }"
          @click="tab = 'convert'"
        >
          مراسلات الاسترجاع
        </div>
      </div>
    </div>
  
    <!-- Dynamic Page -->
    <component :is="currentTab"></component>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import ReturnTransactions from "./ReturnTransactions.vue";
  import ReturnConvert from "./ReturnConvert.vue";
  
  const tab = ref("return");
  
  const currentTab = computed(() => {
    return tab.value === "return"
      ? ReturnTransactions
      : ReturnConvert;
  });
  </script>

  