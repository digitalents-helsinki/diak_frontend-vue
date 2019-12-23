import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import i18n from './translation'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/fi'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faSave, faKey, faArrowUp, faArrowDown, faChartBar, faUserSlash, faUserCheck, faChevronRight, faChevronLeft, faCircle, faRedo, faFolderOpen, faStamp, faListOl} from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faUsers} from '@fortawesome/free-solid-svg-icons'
import { faPaperclip} from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { faFolder} from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faFacebook} from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

library.add(faTimesCircle)
library.add(faAngleDown)
library.add(faCalendarAlt)
library.add(faPencilAlt)
library.add(faPlus)
library.add(faUsers)
library.add(faPaperclip)
library.add(faPaperPlane)
library.add(faSearch)
library.add(faFolder)
library.add(faTimes)
library.add(faGoogle)
library.add(faFacebook)
library.add(faThumbsUp)
library.add(faThumbsDown)
library.add(faArrowRight)
library.add(faSave)
library.add(faKey)
library.add(faArrowUp)
library.add(faArrowDown)
library.add(faChartBar)
library.add(faUserSlash)
library.add(faUserCheck)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faCircle)
library.add(faRedo)
library.add(faFolderOpen)
library.add(faStamp)
library.add(faListOl)

axios.interceptors.response.use(res => res, err => {
  if (err.response) {
    switch(true) {
      case err.response.config.url === process.env.VUE_APP_BACKEND + '/surf': // Try again if getting csrf token fails
        // eslint-disable-next-line no-console
        console.error(err)
        setTimeout(() => axios.get(process.env.VUE_APP_BACKEND + '/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data), 1000)
        break
      case err.response.status === 401 && store.state.authentication.loggedIn: // Auth failed because token expired or whatever, login again
        // eslint-disable-next-line no-console
        console.error(err)
        store.commit('logout')
        router.push('/login')
        break
      default:
        return Promise.reject(err)
    }
  } else {
    return Promise.reject(err)
  }
})

axios.defaults.withCredentials = true
axios.get(process.env.VUE_APP_BACKEND + '/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data)

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

moment.locale(i18n.locale)

Vue.use(VueMoment, {
  moment
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
