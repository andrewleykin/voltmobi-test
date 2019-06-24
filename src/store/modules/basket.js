export default {
  namespaced: true,
  state: {
    basket: JSON.parse(localStorage.getItem('basket')) || [],
  },
  getters: {
    getBasket: s => s.basket,
    getBasketLength: s => s.basket.length,
    getBasketSum: s => s.basket.length > 0 ?
      s.basket.reduce((result, {
        cost
      }) => result + cost, 0) : 0,
    itemInCart: s => item => s.basket.find(el => el.id === item.id)
  },
  mutations: {
    addToBasket(state, item) {
      state.basket.push(item)
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
    deleteItem(state, item) {
      state.basket.splice(state.basket.indexOf(item), 1)
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },
    resetBasket(state) {
      state.basket = []
      localStorage.removeItem('basket')
    }
  }
}
