import { createApp } from "vue";

import App from "@/App.vue";
import { router } from "@/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/css/global.css";
import "vue3-select/dist/vue3-select.css";

import role from "@/directives/role";

const app = createApp(App);

// سجّل الـ directive قبل mount
app.directive("role", role);

//  استخدم الراوتر
app.use(router);

//  انتظر الراوتر ثم اعمل mount
router.isReady().then(() => {
  app.mount("#app");
});
