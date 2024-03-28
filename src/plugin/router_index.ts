import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/Root.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/Home.vue'),
        },
        {
          path: 'notification',
          name: 'Notification',
          component: () => import('@/pages/Notifications.vue'),
        },
        {
          path: 'directmessage',
          component: () => import('@/pages/DirectMessage.vue'),
          children: [
            {
              path: '',
              name: 'userlist',
              component: () => import('@/pages/DirectMessage/UserList.vue'),
            },
            {
              path: 'message/:userId',
              name: 'messageView',
              component: () => import('@/pages/DirectMessage/Message.vue'),
            },
          ],
        },
        {
          path: 'notes/:id',
          name: 'noteView',
          component: () => import('@/pages/NoteView.vue'),
        },
        {
          path: 'settings',
          component: () => import('@/pages/Settings.vue'),
          children: [
            {
              path: 'themecreate',
              name: 'ThemeCreate',
              component: () => import('@/pages/Settings/ThemeCreate.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/callback',
      name: 'Callback',
      component: () => import('@/pages/Login/Callback.vue'),
    },
  ],
});

export default router;
