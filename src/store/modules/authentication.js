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
  }
}