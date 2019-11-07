import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const auth = {
  state: {
    loggedIn: false,
    accessToken: null,
    role: null,
    userId: null
  },
  mutations: {
    login(state, authData) {
      state.loggedIn = authData.loggedIn
      state.accessToken = authData.accessToken
      state.role = authData.role
      state.userId = authData.userId
    },
    logout(state) {
      state.loggedIn = null
      state.accessToken = null
      state.role = null
      state.userId = null
    }
  }
}

const survey = {
  state: {
    surveyId: null,
    userId: null
  },
  mutations: {
    setSurvey(state, surveyData) {
      state.surveyId = surveyData.surveyId
      state.userId = surveyData.userId
    }
  }
}

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) => {
    Cookies.set(key, state, {
      //secure: true,
      //sameSite: 'strict'
    })
  },
  modules: ['auth'],
  filter: mutation => ['login', 'logout'].includes(mutation.type)
})

const vuexSession = new VuexPersistence({
  storage: sessionStorage,
  modules: ['survey'],
  filter: mutation => mutation.type === 'setSurvey'
})

export default new Vuex.Store({
  modules: {
    auth,
    survey
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin]
})