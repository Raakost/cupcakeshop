/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd, db } from '../../firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [],
    menuItems: [],
    currentUser: null
  },
  mutations: {
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
    }
  },
  actions: {
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    }
  },
  modules: {
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getCurrentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems
  }

})
