import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'
import StatsView from '../views/StatsView.vue'
import ProfilView from '@/views/ProfilView.vue';

const routes =[
  {
    path:'/',
    name:'feed',
    component:FeedView
  },
  {
    path:'/stats',
    name:'stats',
    component:StatsView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
