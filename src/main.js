import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import { messages } from './translation'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueI18n)

library.add(faTimesCircle)
library.add(faAngleUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

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
