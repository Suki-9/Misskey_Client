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
    {
      path: "/directmessage",
      component: () => import("../pages/DirectMessage.vue"),
      children: [
        {
          path: "",
          name: "userlist",
          component: () => import("../pages/DirectMessage/UserList.vue"),
        },
        {
          path: "message/: userId",
          name: "messageView",
          component: () => import("../pages/DirectMessage/Message.vue"),
        },
      ],
    },
    {
      path: "/dev",
      name: "DevTest",
      component: () => import("../pages/DevTest.vue"),
    },
  ],
});

export default router;
