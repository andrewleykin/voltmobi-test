import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    getItems: s => s.items,
    getItemById: s => id => s.items.find(el => el.id === id)
  },
  mutations: {
    setItems: (s, items) => s.items = items
  },
  actions: {
    async fetchItems({
      commit
    }) {
      await axios({
        url: '/static/items.json',
        method: 'GET'
      }).then(response => {
        console.log("TCL: fetchItems -> response", response)
        commit('setItems', response.data)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
