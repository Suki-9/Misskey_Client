import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/callback",
      name: "Callback",
      component: () => import("../components/Login/Callback.vue"),
    },
    {
      path: "/notification",
      name: "Notification",
      component: () => import("../pages/Notifications.vue"),
    },
  ],
});

export default router;
