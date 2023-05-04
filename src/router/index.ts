import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/order',
      name: 'orderList',
      component: () => import('@/views/orderList/orderList.vue')
    },
  ]
})

export default router
