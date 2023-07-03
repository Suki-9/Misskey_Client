// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/login/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/callback',
        name: 'Callback',
        component: () => import('@/components/vue/login/Callback.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
