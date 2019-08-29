import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import VueMoment from 'vue-moment'
import { messages } from './translation'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faUsers} from '@fortawesome/free-solid-svg-icons'
import { faPaperclip} from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.use(VueMoment)

library.add(faTimesCircle)
library.add(faAngleUp)
library.add(faCalendarAlt)
library.add(faPencilAlt)
library.add(faPlus)
library.add(faUsers)
library.add(faPaperclip)
library.add(faPaperPlane)
library.add(faSearch)

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

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
