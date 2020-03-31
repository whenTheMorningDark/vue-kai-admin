/* eslint-disable eol-last */
import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import store from './store'
import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control
Vue.config.productionTip = false
import router from './router'
Vue.use(Element)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')