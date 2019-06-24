import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import items from './modules/items'
import categories from './modules/categories'
import basket from './modules/basket'

export default new Vuex.Store({
  namespaced: true,
  modules: {
    items,
    categories,
    basket
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  strict: process.env.NODE_ENV !== 'production'
})
