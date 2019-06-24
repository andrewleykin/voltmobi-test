import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: Main
  }, {
    path: '/item/:id',
    name: 'ItemId',
    component: () => import('@/pages/ItemId.vue')
  }, {
    path: '/basket',
    name: 'Basket',
    component: () => import('@/pages/Basket.vue')
  }, {
    path: '/maps',
    name: 'Maps',
    component: () => import('@/pages/Maps.vue')
  }],
  mode: 'history'
})
