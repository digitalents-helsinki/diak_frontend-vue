import axios from 'axios'

export default {
  namespaced: true,
  state: {
    anonUser: {
      anonymousinfo: {
        age:null,
        gender:null,
      }
    },
    authUser: {
      firstTime: false,
      personalInfo: {
        name: null,
        postNumber: null,
        age: null,
        gender: null,
        phoneNumber: null
      }
    }
  },
  mutations: {
    setAuthUserFirstTime(state, boolean) {
      state.authUser.firstTime = boolean
    },
    setAuthUserPersonalInfo(state, personalInfo) {
      state.authUser.personalInfo.name = personalInfo.name
      state.authUser.personalInfo.postNumber = personalInfo.post_number
      state.authUser.personalInfo.age = personalInfo.age
      state.authUser.personalInfo.gender = personalInfo.gender
      state.authUser.personalInfo.phoneNumber = personalInfo.phone_number
    },
    updateAuthUserPersonalInfo(state, object) {
      Object.assign(state.authUser.personalInfo, object)
    },
    setAnonUserPersonalInfo(state, anonymousinfo) {
      state.anonUser.anonymousinfo.age = anonymousinfo.age
      state.anonUser.anonymousinfo.gender = anonymousinfo.gender
    },
    updateAnonUserPersonalInfo(state, object) {
      Object.assign(state.anonUser.anonymousinfo, object)
    },
  },
  actions: {
    fetchUserInfo({ rootState, commit }) {
      axios({
        method: "GET",
        url: process.env.VUE_APP_BACKEND + "/auth/user/info",
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      }).then(res => {
        if (res.status === 200) {
          commit('setAuthUserFirstTime', !res.data.name)
          commit('setAuthUserPersonalInfo', res.data)
        }
      }).catch(err => {
        if (err.response) this.error = err.response.data
        throw err
      })
    },
    fetchAnonUserInfo({ rootState, commit }) {
      axios({
        method: "GET",
        url: process.env.VUE_APP_BACKEND + "/anonuser/" + rootState.authentication.userId,
      }).then(res => {
        if (res.status === 200) {
          commit('setAnonUserPersonalInfo', res.data)
        }
      }).catch(err => {
        if (err.response) this.error = err.response.data
        throw err
      })
    },
  }
}