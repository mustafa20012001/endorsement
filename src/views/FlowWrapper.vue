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
  import Flow from "@/views/Flow.vue";
  import ConvertAudit from "@/views/ConvertAudit.vue"; 
  
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
  
  <style scoped>
  /* نفس الستايل بدون تغيير */
  .flow-nav {
    background: #12b1d1d6;
    padding: 10px 20px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    color: white;
  }
  .left-side {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .left-icon {
    background: #12b1d1d6;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title-badge {
    background: white;
    color: black;
    font-weight: 700;
    padding: 6px 18px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  }
  .center-links {
    display: flex;
    gap: 25px;
    margin: 0 auto;
  }
  .flow-nav .nav-item {
    cursor: pointer;
    font-weight: 700;
    position: relative;
    padding-bottom: 10px;
    transition: 0.3s ease;
  }
  .flow-nav .nav-item.active {
    padding: 5px 22px;
    background: white;
    color: black;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
  }
  </style>
  