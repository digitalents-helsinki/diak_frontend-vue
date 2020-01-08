import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import authentication from './modules/authentication'
import admin from './modules/admin'
import user from './modules/user'
import questionnaire from './modules/questionnaire'

Vue.use(Vuex)

const vuexSession = new VuexPersistence({
  storage: sessionStorage,
  modules: ['authentication', 'user', 'questionnaire'],
  filter: mutation => ['login', 'logout', 'user/setAuthUserPersonalInfo', 'questionnaire/setSurveyMetaData'].includes(mutation.type)
})

export default new Vuex.Store({
  modules: {
    authentication,
    admin,
    user,
    questionnaire
  },
  plugins: [vuexSession.plugin]
})