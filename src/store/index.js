/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd, db, dbOrders } from '../../firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    basketItems: [],
    menuItems: [],
    orderItems: [],
    currentUser: null
  },
  mutations: {
    addCheckoutItem: (state, basketItems) => {
      dbOrders.add({
        archive: false,
        storeOrder: false,
        orderNo: state.counter++,
        status: 'incomplete',
        orderLines: state.basketItems
      })
    },
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach(item => {
          if (state.basketItems.find(arrayItem => item.name === arrayItem.name)) {
            item = state.basketItems.find(arrayItem => item.name === arrayItem.name);
            item.quantity++;
          } else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: 1
            });
          }
        });
      }
    },
    userStatus: (state, user) => {
      if (user) {
        state.currentUser = user
      } else {
        state.currentUser = null
      }
    },
    setMenuItems: state => {
      let menuItems = []

      dbMenuAdd.onSnapshot((snapshopItems) => {
        menuItems = []
        snapshopItems.forEach((doc) => {
          var menuItemData = doc.data();
          menuItems.push({
            ...menuItemData,
            id: doc.id
          })
        })
        state.menuItems = menuItems
      })
    },
    setOrderItems: state => {
      let orderItems = []

      dbOrders.onSnapshot((snapshopItems) => {
        orderItems = []
        snapshopItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({
            ...orderItemData,
            id: doc.id
          })
        })
        state.orderItems = orderItems
      })
    }
  },
  actions: {
    setCheckoutItem: context => {
      context.commit('addCheckoutItem')
    },
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    }
  },
  modules: {
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getCurrentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.orderItems
  }

})
