import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/productList',
      component: () => import('../views/ProductListView.vue')
    }
  ]
})

export default router
