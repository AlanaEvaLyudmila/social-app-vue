import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'feed', component: FeedView },
  { path: '/profile', name: 'profile', component: ProfileView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router