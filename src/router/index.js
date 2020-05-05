import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Admin from '../views/Admin.vue'
import Orders from '../views/Orders.vue'
import AddNewItems from '../components/admin/AddNewItems.vue'
import Login from '../components/admin/Login.vue'
import Infobox from '../components/Infobox.vue'
import Listbox from '../components/Listbox.vue'
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
      path: '/infobox',
      name: 'infobox',
      component: Infobox
    },
    {
      path: '/listbox',
      name: 'listbox',
      component: Listbox
    }
  ]
});


//navigation guard
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
})

export default router
