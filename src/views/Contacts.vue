<template>
  <div class="settings-nav my-3">
    <!-- Left Icon -->
    <div class="left-side">
      <div class="left-icon">
        <i class="bi bi-gear-fill fs-5"></i>
      </div>

      <!-- Title -->
      <div class="title-badge">إعدادات النظام</div>
    </div>

    <!-- Middle Navigation Items -->
    <div class="center-links">
      <div
        class="nav-item"
        :class="{ active: tab === 'departments' }"
        @click="tab = 'departments'"
      >
        الشُعَب
      </div>

      <div
        class="nav-item"
        :class="{ active: tab === 'formations' }"
        @click="tab = 'formations'"
      >
        التشكيلات
      </div>

      <div
        class="nav-item"
        :class="{ active: tab === 'users' }"
        @click="tab = 'users'"
      >
        الحسابات
      </div>
    </div>
  </div>

  <component :is="currentTab"></component>
</template>

<script setup>
import { ref, computed } from "vue";

//Pages
import Departments from "@/views/Departments.vue";
import Formations from "@/views/Formations.vue";
import Users from "@/views/Users.vue";

const tab = ref("departments");

const currentTab = computed(() => {
  switch (tab.value) {
    case "departments":
      return Departments;
    case "formations":
      return Formations;
    case "users":
      return Users;
    default:
      return Departments;
  }
});
</script>

<style scoped>
.settings-nav {
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

.settings-nav .nav-item {
  cursor: pointer;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
  transition: 0.3s ease;
}

.settings-nav .nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: white;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: 0.3s ease;
}

.settings-nav .nav-item:hover::after {
  width: 60%;
}

.settings-nav .nav-item:hover {
  opacity: 1;
}

.settings-nav .active {
  opacity: 1;
  padding: 5px 22px;
  background: white;
  color: black;
  border-radius: 20px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}
</style>
