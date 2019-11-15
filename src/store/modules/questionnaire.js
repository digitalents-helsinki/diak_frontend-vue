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
      state.surveyData.result = result
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
    async fetchSurvey({ state, rootState, commit }) {
      const { data: { Survey, savedAnswers, Result, Averages } } = await axios({
        method: 'GET',
        url: process.env.VUE_APP_BACKEND + `/${state.fetch.anon ? 'anon' : 'auth'}/survey/${state.fetch.surveyId}/${state.fetch.anon ? state.fetch.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${state.fetch.anon ? "" : rootState.authentication.accessToken}`
        }
      }).catch(err => {
        commit('setError', err)
        throw err
      })

      if (!Survey) { //check for result redirect
        commit('setSurveyInfo', {
          name: Result.name,
          message: Result.message
        })
        commit('setSurveyResult', { Result, Averages })
      } else {
        const Questions = (() => {
          if (savedAnswers && savedAnswers.length) {
            return Survey.Questions.map(question => {
              return {
                ...question,
                answer: savedAnswers.find(obj => obj.QuestionQuestionId === question.questionId)
              }
            })
          } else {
            return Survey.Questions
          }
        })()
        commit('setSurveyInfo', {
          name: Survey.name,
          message: Survey.message
        })
        commit('setSurveyQuestions', Questions)
      }

    },
    async fetchResult({ state, rootState, commit }) {
      const res = await axios({
        method: 'GET', 
        url: `${process.env.VUE_APP_BACKEND}/${state.fetch.anon ?  'anon': 'auth'}/result/${state.fetch.surveyId}/${state.fetch.anon ? state.fetch.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      }).catch(err => {
        commit('setError', err)
        throw err
      })

      commit('setSurveyResult', res.data)
    }
  }
}