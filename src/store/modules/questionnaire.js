import axios from 'axios'

export default {
  namespaced: true,
  state: {
    fetch: {
      surveyId: null,
      anonId: null,
      anon: null
    },
    surveyData: {
      name: null,
      message: null,
      questions: null,
      result: null
    },
    errorMessage: null
  },
  mutations: {
    setSurveyFetch(state, fetchData) {
      state.fetch.surveyId = fetchData.surveyId,
      state.fetch.anonId = fetchData.anonId
      state.fetch.anon = fetchData.anon
    },
    setSurveyInfo(state, info) {
      state.surveyData.name = info.name
      state.surveyData.message = info.message
    },
    setSurveyQuestions(state, survey) {
      state.surveyData.questions = survey
    },
    setSurveyResult(state, result) {
      state.result = result
    },
    setError(state, err) {
      if (err.response) {
        state.errorMessage = err.response.data
      }
      else {
        state.errorMessage = "Unknown error"
      }
    }
  },
  actions: {
    async fetchSurvey(context) {
      const res = await axios({
        method: 'GET',
        url: process.env.VUE_APP_BACKEND + `/${context.state.fetch.anon ? 'anon' : 'auth'}/survey/${context.state.fetch.surveyId}/${context.state.fetch.anon ? context.state.fetch.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${context.state.fetch.anon ? "" : context.rootState.authentication.accessToken}`
        }
      }).catch(err => {
        context.commit('setError', err)
        throw err
      })

      context.commit('setSurveyInfo', {
        name: res.data.name || res.data.Result.name,
        message: res.data.message || res.data.Result.message
      })
      if (res.config.url !== res.request.responseURL) context.commit('setSurveyResult', res.data) //check for result redirect
      else context.commit('setSurveyQuestions', res.data.Questions)
    },
    async fetchResult(context) {
      const res = await axios({
        method: 'GET', 
        url: `${process.env.VUE_APP_BACKEND}/${context.state.fetch.anon ?  'anon': 'auth'}/result/${context.state.fetch.surveyId}/${context.state.fetch.anon ? context.state.fetch.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${context.rootState.authentication.accessToken}`
        }
      }).catch(err => {
        context.commit('setError', err)
        throw err
      })

      context.commit('setSurveyResult', res.data)
    }
  }
}