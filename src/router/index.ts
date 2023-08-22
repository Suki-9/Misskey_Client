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
      component: () => import("../pages/Login.vue"),
      children: [
        {
          path: "",
          name: "MiAuth",
          component: () => import("../components/Login/MiAuth.vue"),
        },
        {
          path: "token",
          name: "Token",
          component: () => import("../components/Login/Token.vue"),
        },
        {
          path: "callback",
          name: "Callback",
          component: () => import("../components/Login/Callback.vue"),
        },
      ],
    },
  ],
});

export default router;
