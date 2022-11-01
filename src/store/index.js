import { createStore } from 'vuex'
import getters from './getters'
import system from './modules/system'
import kline from './modules/kline'
import map from './modules/map'

export default createStore({
  state: {
    lang: ''
  },
  mutations: {
  },
  actions: {
  },

  modules: {
    system,
    kline,
    map
  },
  getters
})
