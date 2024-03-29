import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../pages/Products.vue'
import ProductItem from '../pages/ProductItem.vue'
import LoginUser from '../pages/LoginUser.vue'
import RegisterUser from '../pages/RegisterUser.vue'
import Dashboard from '../pages/Dashboard.vue'
import SuccessSale from '../pages/SuccessSale.vue'
import Contact from '../pages/Contact.vue'
import NotFound from '../pages/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/product/:id',
    name: 'ProductItem',
    component: ProductItem,
    props: true
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: LoginUser
  },
  {
    path: '/registro',
    name: 'RegisterUser',
    component: RegisterUser
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    props: true
  },
  {
    path: '/sucesso',
    name: 'SuccessSale',
    component: SuccessSale,
  },
  {
    path: '/contato',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({top: 0, behavior: "smooth"})
  }
})

export default router
