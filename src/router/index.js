import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Trang chủ'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'Giới thiệu'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Liên hệ'
    }
  },
  {
    path: '/product/:id',
    component: Product,
    meta: {
      title: 'Sản phẩm'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: 'Giỏ hàng'
    }
  },
  {
    path: '/checkout',
    component: Checkout,
    meta: {
      title: 'Checkout'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
