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
    async fetchSurvey(context) {
      const { data: { Survey, savedAnswers, Result, Averages } } = await axios({
        method: 'GET',
        url: process.env.VUE_APP_BACKEND + `/${context.state.fetch.anon ? 'anon' : 'auth'}/survey/${context.state.fetch.surveyId}/${context.state.fetch.anon ? context.state.fetch.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${context.state.fetch.anon ? "" : context.rootState.authentication.accessToken}`
        }
      }).catch(err => {
        context.commit('setError', err)
        throw err
      })

      if (!Survey) { //check for result redirect
        context.commit('setSurveyInfo', {
          name: Result.name,
          message: Result.message
        })
        context.commit('setSurveyResult', { Result, Averages })
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
        context.commit('setSurveyInfo', {
          name: Survey.name,
          message: Survey.message
        })
        context.commit('setSurveyQuestions', Questions)
      }

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