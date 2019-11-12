import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import authentication from './modules/authentication'
import questionnaire from './modules/questionnaire'

Vue.use(Vuex)

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) => {
    Cookies.set(key, state, {
      //secure: true,
      //sameSite: 'strict'
    })
  },
  modules: ['authentication'],
  filter: mutation => ['login', 'logout'].includes(mutation.type)
})

const vuexSession = new VuexPersistence({
  storage: sessionStorage,
  modules: ['questionnaire'],
  filter: mutation => mutation.type === 'setSurveyData'
})

export default new Vuex.Store({
  modules: {
    authentication,
    questionnaire
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin]
})