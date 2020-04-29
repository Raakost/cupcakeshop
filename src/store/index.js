import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [],
    currentUser: null
  },
  //mutations use state
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
    }
  },
  // actions use context
  actions: {
    setUser(context, user) {
      context.commit('userStatus', user)
    }
  },
  modules: {
  },
  getters: {
    getBasketItems: state => state.basketItems,
    getCurrentUser: state => state.currentUser
  }

})
