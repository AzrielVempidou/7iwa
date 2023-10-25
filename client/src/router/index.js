import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Talk1 from '../views/Talk1.vue'
import Talk2 from '../views/Talk2.vue'
import CustLoginComponent from '../components/CustLoginComponent.vue'
import ConsLoginComponent from '../components/ConsLoginComponent.vue'
import CounsellorView from '../views/CounsellorView.vue'
import posHistory from '../views/posHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customer/register',
      name: 'cust-login',
      component: CustLoginComponent
    },
    {
      path: '/customer/login',
      name: 'cust-login',
      component: CustLoginComponent
    },
    {
      path: '/customer/counselor/:id',
      name: 'counselorByid',
      component: CounsellorView
    },
    {
      path: '/counselor/login',
      name: 'cons-login',
      component: ConsLoginComponent
    },
    {
      path: '/talk-cons',
      name: 'talk',
      component: Talk1
    },
    {
      path: '/talk-cust',
      name: 'talk-cust',
      component: Talk2
    }
  ]
})

export default router
