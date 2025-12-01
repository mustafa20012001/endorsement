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
  
  // *** الصفحات الحقيقية الموجودة عندك ***
  import ReturnTransactions from "@/views/ReturnTransactions.vue";
  import ReturnConvert from "@/views/ReturnConvert.vue";
  
  const tab = ref("return");
  
  // *** الاختيار الصحيح بين الصفحتين ***
  const currentTab = computed(() => {
    return tab.value === "return"
      ? ReturnTransactions
      : ReturnConvert;
  });
  </script>
  
  <style scoped>
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
  }
  .center-links {
    display: flex;
    gap: 25px;
    margin: 0 auto;
  }
  .nav-item {
    cursor: pointer;
    font-weight: 700;
    padding-bottom: 10px;
    transition: 0.3s ease;
  }
  .nav-item.active {
    padding: 5px 22px;
    background: white;
    color: black;
    border-radius: 20px;
  }
  </style>
  