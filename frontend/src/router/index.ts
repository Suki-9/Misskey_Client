import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../components/pages/Home.vue'),/*
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../components/module/Home/Bio.vue'),
        },
      ],*/
    },
    {
      path: '/login',
      component: () => import('../components/pages/Login.vue'),
      children: [
        {
          path: '',
          name: 'MiAuth',
          component: () => import('../components/module/Login/MiAuth.vue')
        },
        {
          path: 'token',
          name: 'Token',
          component: () => import('../components/module/Login/Token.vue')
        },
        {
          path: 'callback',
          name: 'Callback',
          component: () => import('../components/module/Login/Callback.vue')
        }, 
      ]
    },
  ]
})

export default router