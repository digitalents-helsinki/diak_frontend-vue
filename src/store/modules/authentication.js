export default {
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