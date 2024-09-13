import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  // {
  //   path: '/checkout',
  //   name: 'checkout',
  //   component: () => import('../views/CheckoutView.vue')
  // },
  {
    path: '/checkout/:prodID?',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogInViewOrSignUp.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../views/SingleProductView.vue')
  },
  // {
  //   path: '/products/:id',
  //   name: 'product',
  //   component: () => import('../views/SingleProductView.vue')
  // },
  {
    path: '/payment/:prodID',
    name: 'payment',
    component: () => import('../components/paymentComponent.vue')
  },
  // {
  //   path: '/thankyou',
  //   name: 'thankyou',
  //   component: () => import('../components/ThankYouComponent.vue')
  // },
  {
    path: '/thankyou/:prodID',
    name: 'thankyou',
    component: () => import('../components/ThankYouComponent.vue')
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../components/UserDetailsComponent.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../components/UserOrdersComponent.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../components/SettingsComponent.vue')
  },
  // {
  //   path: '/products/:id',
  //   name: 'product',
  //   component: () => import('../views/SingleProductView.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
