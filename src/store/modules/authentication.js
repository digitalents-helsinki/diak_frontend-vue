export default {
  state: {
    loggedIn: false,
    accessToken: null,
    role: null,
    userId: null,
    email:null
  },
  mutations: {
    login(state, authData) {
      state.loggedIn = authData.loggedIn
      state.accessToken = authData.accessToken
      state.role = authData.role
      state.userId = authData.userId
      state.email=authData.email
    },
    logout(state) {
      state.loggedIn = null
      state.accessToken = null
      state.role = null
      state.userId = null
      state.email = null
    }
  }
}