import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import { messages } from './translation'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'fi',
  fallbackLocale: 'fi',
  messages
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
