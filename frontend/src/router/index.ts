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
          component: () => import('../components/module/Login/MiAuht.vue')
        },
        {
          path: 'token',
          name: 'Token',
          component: () => import('../components/module/Login/Token.vue')
        },
        {
          path: 'redirect',
          name: 'ReDirect',
          component: () => import('../components/module/Login/ReDirect.vue')
        }, 
      ]
    },
  ]
})

export default router