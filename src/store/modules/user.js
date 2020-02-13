import axios from '../../axiosInstance'

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
      personalInfo: {
        name: null,
        postNumber: null,
        age: null,
        gender: null,
        phoneNumber: null
      }
    }
  },
  getters: {
    authUserFirstTime(state) {
      //return Object.values(state.authUser.personalInfo).some(info => !info)
      return false // a text doesn't exist for the page this controls
    }
  },
  mutations: {
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
    updateAnonUserPersonalInfo(state, object) {
      Object.assign(state.anonUser.anonymousinfo, object)
    },
  },
  actions: {
    fetchUserInfo({ rootState, commit }) {
      axios({
        method: "GET",
        url: "/auth/user/info",
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      }).then(res => {
        if (res.status === 200) {
          commit('setAuthUserPersonalInfo', res.data)
        }
      }).catch(err => {
        if (err.response) this.error = err.response.data
        throw err
      })
    }
  }
}