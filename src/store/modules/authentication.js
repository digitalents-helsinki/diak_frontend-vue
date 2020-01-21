export default {
  state: {
    accessToken: null,
    role: null,
    userId: null,
    email: null
  },
  mutations: {
    login(state, authData) {
      state.accessToken = authData.token
      state.role = authData.role
      state.userId = authData.userId
      state.email=authData.email
    },
    logout(state) {
      state.accessToken = null
      state.role = null
      state.userId = null
      state.email = null
    }
  },
  actions: {
    logout({ commit }) {
      commit('logout')
      const gAuthInstance = window.gapi ? window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null : null
      if (gAuthInstance && gAuthInstance.isSignedIn.get()) {
        gAuthInstance.signOut()
      }
    }
  }
}