import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import i18n from './translation'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/fi'
import 'moment/locale/se'
import axios from 'axios'
import gapi from './gapiPlugin'
import facebookSdk from './facebookSdkPlugin'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faCalendarAlt, faPencilAlt, faPlus, faUsers, faPaperclip, faPaperPlane, faSearch, faFolder, faTimes, faThumbsUp, faThumbsDown, faArrowRight, faTimesCircle, faSave, faKey, faArrowUp, faArrowDown, faChartBar, faUserSlash, faUserCheck, faChevronRight, faChevronLeft, faCircle, faRedo, faFolderOpen, faStamp, faListOl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

library.add(faAngleDown, faCalendarAlt, faPencilAlt, faPlus, faUsers, faPaperclip, faPaperPlane, faSearch, faFolder, faTimes, faThumbsUp, faThumbsDown, faArrowRight, faTimesCircle, faSave, faKey, faArrowUp, faArrowDown, faChartBar, faUserSlash, faUserCheck, faChevronRight, faChevronLeft, faCircle, faRedo, faFolderOpen, faStamp, faListOl)

axios.interceptors.response.use(res => res, err => {
  if (err.response) {
    switch(true) {
      case err.response.config.url === process.env.VUE_APP_BACKEND + '/surf': // Try again if getting csrf token fails
        // eslint-disable-next-line no-console
        console.error(err)
        setTimeout(() => axios.get(process.env.VUE_APP_BACKEND + '/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data), 1000)
        break
      case store.state.authentication.accessToken && err.response.status === 401: // Auth failed because token expired or whatever, login again
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

Vue.use(gapi, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'openid email',
  fetch_basic_profile: false
})

Vue.use(facebookSdk, {
  appId: process.env.VUE_APP_FACEBOOK_APP_ID,
  status: true,
  autoLogAppEvents: true,
  version: 'v5.0'
})

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
