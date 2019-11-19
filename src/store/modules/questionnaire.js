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
      questionData: null,
      result: null
    },
    error: {
      message: null
    }
  },
  getters: {
    errorDisplay(state) {
      if (state.error.message && (!state.surveyData.questionData && !state.surveyData.result)) {
        return true
      } else if (!state.surveyData.questionData && !state.surveyData.result) {
        return null
      } else {
        return false
      }
    }
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
    setSurveyQuestionData(state, questionData) {
      state.surveyData.questionData = questionData
    },
    setSurveyResult(state, result) {
      state.surveyData.result = result
    },
    answerQuestion(state, keyValueNumber) {
      const [ key, value, number ] = keyValueNumber
      state.surveyData.questionData[number][key] = value
    },
    setError(state, err) {
      if (err.response) {
        state.error.message = err.response.data
      } else {
        state.error.message = err.message
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
        commit('setSurveyInfo', {
          name: Survey.name,
          message: Survey.message
        })

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

        const questionData = Questions.reduce((arr, question) => {
          if (!question.name.endsWith("_custom")) {
            arr[question.number - 1] = {
              name: question.name,
              val: !question.answer ? null: question.answer.value !== undefined ? question.answer.value : null,
              desc: !question.answer ? null : question.answer.description !== undefined ? question.answer.description : null,
              id: question.questionId
            }
          } else {
            arr[question.number - 1] = {
              name: question.name,
              val: !question.answer ? null: question.answer.value !== undefined ? question.answer.value : null,
              desc: !question.answer ? null : question.answer.description !== undefined ? question.answer.description : null,
              id: question.questionId,
              custom: {
                title: question.title,
                description: question.description,
                help: question.help
              }
            }
          }
          return arr
        }, []).filter(question => question)
        commit('setSurveyQuestionData', questionData)
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