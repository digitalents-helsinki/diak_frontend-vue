import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import i18n from './translation'
import VueMoment from 'vue-moment'
import axios from './plugins/axiosPlugin'
import axiosInstance from './axiosInstance'
import moment from 'moment'
import 'moment/locale/fi'
import 'moment/locale/se'
import gapi from './plugins/gapiPlugin'
import facebookSdk from './plugins/facebookSdkPlugin'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faCalendarAlt, faPencilAlt, faPlus, faUsers, faPaperclip, faPaperPlane, faSearch, faFolder, faTimes, faThumbsUp, faThumbsDown, faArrowRight, faTimesCircle, faSave, faKey, faArrowUp, faArrowDown, faChartBar, faUserSlash, faUserCheck, faChevronRight, faChevronLeft, faCircle, faRedo, faFolderOpen, faStamp, faListOl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(axios, axiosInstance)
  
Vue.config.productionTip = false
Vue.use(BootstrapVue)

library.add(faAngleDown, faCalendarAlt, faPencilAlt, faPlus, faUsers, faPaperclip, faPaperPlane, faSearch, faFolder, faTimes, faThumbsUp, faThumbsDown, faArrowRight, faTimesCircle, faSave, faKey, faArrowUp, faArrowDown, faChartBar, faUserSlash, faUserCheck, faChevronRight, faChevronLeft, faCircle, faRedo, faFolderOpen, faStamp, faListOl)

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
