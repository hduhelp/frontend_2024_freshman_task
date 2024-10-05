import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AskView from '@/views/AskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('@/views/QuestionView.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: AskView
    }
  ]
})

export default router
