import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import Orders from '../views/Orders.vue'
import EditHome from '../views/EditHome.vue'
import EditAbout from '../views/EditAbout.vue'
import AddNewItems from '../components/admin/AddNewItems.vue'
import Login from '../components/admin/Login.vue'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addNew',
      name: 'addNew',
      component: AddNewItems,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edithome',
      name: 'edithome',
      component: EditHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editabout',
      name: 'editabout',
      component: EditAbout,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
})

export default router
