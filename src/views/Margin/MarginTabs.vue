<template>
    <div class="flow-nav my-3">
      <!-- Left Icon -->
      <div class="left-side">
        <div class="left-icon">
          <i class="bi bi-shuffle fs-5"></i>
        </div>
        <div class="title-badge">الهامش الإداري</div>
      </div>
  
      <!-- Tabs -->
      <div class="center-links">
        <div
          class="nav-item"
          :class="{ active: tab === 'note' }"
          @click="tab = 'note'"
        >
          إضافات الهامش
        </div>
  
        <div
          class="nav-item"
          :class="{ active: tab === 'correspondence' }"
          @click="tab = 'correspondence'"
        >
          مراسلات الهامش
        </div>
      </div>
    </div>
  
    <!-- Dynamic Pages -->
    <component :is="currentTab"></component>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  import MarginNote from "./MarginNote.vue";
  import MarginCorrespondence from "./MarginCorrespondence.vue";
  
  const tab = ref("note");
  
  const currentTab = computed(() => {
    switch (tab.value) {
      case "note":
        return MarginNote;
  
      case "correspondence":
        return MarginCorrespondence;
  
      default:
        return MarginNote;
    }
  });
  </script>
