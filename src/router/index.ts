import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页
      path: '/',
      name: '/',
      component: () => import('@/views/frontend/index.vue'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            title: '仪表盘',
            icon: 'House',
          },
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/order',
          name: 'orderList',
          meta: {
            title: '订单列表',
            icon: 'ChatDotSquare',
          },
          children: [
            {
              path: '/order/totalOrder',
              name: 'totalOrder',
              component: () => import('@/views/orderList/orderList.vue'),
              meta: {
                title: '全部订单',
              },
            },
            {
              path: '/order/lockingOrder',
              name: 'lockingOrder',
              component: () => import('@/views/orderList/lockingOrder.vue'),
              meta: {
                title: '锁定订单',
              },
            },
          ]
        },
      ]
    },

  ]
})

export default router
