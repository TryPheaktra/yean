import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ServicesView from '@/views/ServicesView.vue'
// import VehicleView from '@/views/VehicleView.vue'
// import LatestNewsView from '@/views/LatestNewsView.vue'
// import TipsGuidesView from '@/views/TipsGuidesView.vue'
// import PromotionView from '@/views/PromotionView.vue'
// import LocationView from '@/views/LocationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/services',
    //   name: 'services',
    //   component: ServicesView
    // },
    // {
    //   path: '/vehicles',
    //   name: 'vehicles',
    //   component: VehicleView
    // },
    // {
    //   path: '/blog/news',
    //   name: 'latest',
    //   component: LatestNewsView
    // },
    // {
    //   path: '/blog/tips',
    //   name: 'tips',
    //   component: TipsGuidesView
    // },
    // {
    //   path: '/blog/promotions',
    //   name: 'promotions',
    //   component: PromotionView
    // },
    // {
    //   path: '/locations',
    //   name: 'locations',
    //   component: LocationView
    // },
  ],
})

export default router
