import Vue from 'vue'

Vue.filter('currency', value => {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB'
  }).format(value)
})
