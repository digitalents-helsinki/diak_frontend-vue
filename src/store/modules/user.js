import axios from 'axios'

export default {
  namespaced: true,
  state: {
    anonUser: {
      
    },
    authUser: {
      firstTime: null,
      personalInfo: {
        name: null,
        postNumber: null,
        birthDate: null,
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
      state.authUser.personalInfo.postNumber = personalInfo.postNumber
      state.authUser.personalInfo.birthDate = personalInfo.birth_date
      state.authUser.personalInfo.gender = personalInfo.gender
      state.authUser.personalInfo.phoneNumber = personalInfo.phone_number
    },
    updateAuthUserPersonalInfo(state, object) {
      Object.assign(state.authUser.personalInfo, object)
    }
  },
  actions: {
    fetchUserInfo({ rootState, commit }) {
      axios({
        method: "GET",
        url: process.env.VUE_APP_BACKEND + "/user/info",
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
    }
  }
}