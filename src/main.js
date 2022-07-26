import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAnimateNumber from 'vue-animate-number'
import * as echarts from 'echarts'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.use(VueAnimateNumber)


Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
