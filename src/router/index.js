import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'
import StatsView from '../views/StatsView.vue'
import ProfileView from '../views/ProfileView.vue'
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
    path:'/profile',
    name:'profile',
    component:ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
