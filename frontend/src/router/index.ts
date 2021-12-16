import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/restaurants'
  },
  {
    path: '/restaurants',
    component: () => import('@/views/RestaurantsPage.vue')
  },
  {
    path: '/produits',
    component: () => import('@/views/ProduitsPage.vue')
  },
  {
    path: '/account',
    component: () => import('@/views/AccountPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
