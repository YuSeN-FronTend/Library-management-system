import Vue from "vue"
import Vuex from "vuex"
import VuexPersistence from 'vuex-persist';
import db from './db'
Vue.use(Vuex)
//vuex 状态持久化
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    db
  },
  plugins: [vuexLocal.plugin]
})
export default store
