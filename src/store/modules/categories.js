import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    getCategories: s => s.categories,
    getCategoriesById: s => id => s.categories.find(el => el.id === id)
  },
  mutations: {
    setCategories: (s, categories) => s.categories = categories
  },
  actions: {
    async fetchCategories({
      commit
    }) {
      await axios({
        url: '/static/categories.json',
        method: 'GET'
      }).then(response => {
        commit('setCategories', response.data)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
