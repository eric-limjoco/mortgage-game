// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') return value
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(value)
})

Vue.filter('toRate', function (value) {
  if (typeof value !== 'number') return value
  return `${Math.round(value * 100) / 100}%`
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
