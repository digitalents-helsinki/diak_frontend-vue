import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      accessToken: null,
      role: null,
      userId: null
    },
    survey: {
      surveyId: null,
      userId: null
    }
  }
})