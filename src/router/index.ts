import { createRouter, createWebHistory } from "vue-router";

const baseUrl = import.meta.env.VITE_BUILD_ADDRESS;

export const routes = [
  // صفحة تسجيل الدخول
  {
    path: `${baseUrl}/login`,
    component: () => import("../layouts/Auth.vue"), //  هذا الملف اللي أنشأناه
    children: [
      {
        path: "",
        // name: "تسجيل الدخول",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },

  {
    path: `${baseUrl}/about`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      { path: "", name: "لوحة ", component: () => import("@/views/About.vue") },
    ],
  },

  {
    path: `${baseUrl}/incoming`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "الوارد",
        component: () => import("@/views/IncomingWrapper/IncomingWrapper.vue"),
      },
    ],
  },

  {
    path: `${baseUrl}/margin-note`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "الهامش الإداري",
        component: () => import("@/views/Margin/MarginTabs.vue"),
      },
    ],
  },

  {
    path: `${baseUrl}/data-management`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "الإدارة ",
        component: () =>
          import("@/views/DataManagementModule/DataManagementWrapper.vue"),
      },
    ],
  },

  {
    path: `${baseUrl}/flow`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: " البيانات والتدقيق",
        component: () => import("@/views/FlowWrapper/FlowWrapper.vue"),
      },
    ],
  },
  {
    path: `${baseUrl}/return-flow`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "الاسترجاع",
        component: () => import("@/views/ReturnWrapper/ReturnWrapper.vue"),
      },
    ],
  },

  {
    path: `${baseUrl}/injury-supports`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "تأييد الإصابة",
        component: () => import("@/views/InjurySupports.vue"),
      },
    ],
  },
  {
    path: `${baseUrl}/contacts`,
    component: () => import("@/layouts/Page.vue"),
    children: [
      {
        path: "",
        name: "إعدادات النظام",
        component: () => import("@/views/Contacts.vue"),
      },
    ],
  },

  // {
  //   path: `${baseUrl}/return-transactions`,
  //   component: () => import("@/layouts/Page.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: " الاسترجاع",
  //       component: () => import("@/views/ReturnTransactions.vue"),
  //     },
  //   ],
  // },

  // {
  //   path: `${baseUrl}/departments`,
  //   component: () => import("@/layouts/Page.vue"),
  //   children: [
  //     { path: "", name: "الشُعَب", component: () => import("@/views/Departments.vue") }
  //   ],
  // },

  // {
  //   path: `${baseUrl}/formations`,
  //   component: () => import("@/layouts/Page.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "التشكيلات",
  //       component: () => import("@/views/Formations.vue")
  //     }
  //   ],
  // },

  // {
  //   path: `${baseUrl}/users`,
  //   component: () => import("@/layouts/Page.vue"),
  //   children: [
  //     { path: "", name: "الحسابات", component: () => import("@/views/Users.vue") }
  //   ],
  // },

  // أي مسار غير معروف → login
  {
    path: `${baseUrl}/:pathMatch(.*)*`,
    redirect: `${baseUrl}/login`,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

//  حماية الصفحات (اختياري)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // أو تحقق من API
  if (!isAuthenticated && to.path !== `${baseUrl}/login`) {
    next(`${baseUrl}/login`);
  } else {
    next();
  }
});
