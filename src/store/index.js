/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { dbMenuAdd, db, dbOrders, dbCompanyInfo } from '../../firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    basketItems: [],
    menuItems: [],
    orderItems: [],
    currentUser: null,
    companyInfo: {}
  },
  mutations: {
    addCheckoutItems: (state, customer) => {
      dbOrders.add({
        archive: false,
        orderNo: state.counter++,
        status: 'incomplete',
        orderLines: state.basketItems,
        customer
      });
      state.basketItems = [];
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

      dbMenuAdd.onSnapshot((snapshotItems) => {
        menuItems = []
        snapshotItems.forEach((doc) => {
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

      dbOrders.onSnapshot((snapshotItems) => {
        orderItems = []
        snapshotItems.forEach((doc) => {
          var orderItemData = doc.data();
          orderItems.push({
            ...orderItemData,
            id: doc.id
          })
        })
        state.orderItems = orderItems
      })
    },
    updateCompanyInfo: (state, companyInfo) => {
      dbCompanyInfo.get().then((items) => {
        if (items.size > 0) {
          var companyInfoId = items.docs[0].id;
          dbCompanyInfo
            .doc(companyInfoId)
            .update(companyInfo);
        } else {
          dbCompanyInfo.add(companyInfo);
        }
      })
    },
    setCompanyInfo: state => {
      dbCompanyInfo.onSnapshot((snapshotItems) => {
        var companyInfo = snapshotItems.docs[0].data();
        state.companyInfo = { ...companyInfo, id: snapshotItems.docs[0].id }
      })
    }
  },
  actions: {
    setCheckoutItems: (context, customer) => {
      context.commit('addCheckoutItems', customer)
    },
    setUser: (context, user) => {
      context.commit('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    },
    updateCompanyInfo: (context, companyInfo) => {
      context.commit('updateCompanyInfo', companyInfo)
    },
    setCompanyInfo: context => {
      context.commit('setCompanyInfo')
    }
  },
  modules: {
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getCurrentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.orderItems,
    getCompanyInfo: state => state.companyInfo
  }

})
