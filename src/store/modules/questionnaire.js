import axios from 'axios'

export default {
  namespaced: true,
  state: {
    meta: {
      surveyId: null,
      anonId: null,
      anon: null
    },
    surveyData: {
      name: null,
      message: null,
      questionData: null,
      resultData: null
    },
    error: {
      message: null
    }
  },
  getters: {
    errorDisplay(state) {
      if (state.error.message && (!state.surveyData.questionData && !state.surveyData.resultData)) {
        return true
      } else if (!state.surveyData.questionData && !state.surveyData.resultData) {
        return null
      } else {
        return false
      }
    }
  },
  mutations: {
    setSurveyMetaData(state, metaData) {
      state.meta.surveyId = metaData.surveyId,
      state.meta.anonId = metaData.anonId
      state.meta.anon = metaData.anon
    },
    setSurveyInfo(state, info) {
      state.surveyData.name = info.name
      state.surveyData.message = info.message
    },
    setSurveyQuestionData(state, { Survey, savedAnswers }) {
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
      }, [])
      state.surveyData.questionData = questionData
    },
    setSurveyResultData(state, { Result, Averages }) {
      const resultData = Result.Questions.reduce((arr, question) => {
        arr[question.number - 1] = {
          name: question.name,
          title: question.title,
          answer: question.Answers[0].value !== null ? question.Answers[0].value : '-',
          avg: (avg => avg ? Number(avg).toFixed(2) : '-')(Averages.find(obj => obj.number === question.number).answerAvg)
        }
        return arr
      }, [])
      state.surveyData.resultData = resultData
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
      if (!state.meta.surveyId) return
      if (state.meta.anon && !state.meta.anonId) return
      if (!state.meta.anon && !rootState.authentication.accessToken) return

      const {
        config: {
          url: requestURL
        },
        request: {
          responseURL
        },
        data: { 
          Survey, 
          savedAnswers, 
          Result, 
          Averages
        }
      } = await axios({
        method: 'GET',
        url: process.env.VUE_APP_BACKEND + `/${state.meta.anon ? 'anon' : 'auth'}/survey/${state.meta.surveyId}/${state.meta.anon ? state.meta.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${state.meta.anon ? "" : rootState.authentication.accessToken}`
        }
      }).catch(err => {
        commit('setError', err)
        throw err
      })

      if (responseURL !== requestURL) { //check for result redirect
        commit('setSurveyInfo', {
          name: Result.name,
          message: Result.message
        })

        commit('setSurveyResultData', { Result, Averages })
      } else {
        commit('setSurveyInfo', {
          name: Survey.name,
          message: Survey.message
        })

        commit('setSurveyQuestionData', { Survey, savedAnswers })
      }

    },
    async fetchResult({ state, rootState, commit }) {
      const { data } = await axios({
        method: 'GET', 
        url: `${process.env.VUE_APP_BACKEND}/${state.meta.anon ?  'anon': 'auth'}/result/${state.meta.surveyId}/${state.meta.anon ? state.meta.anonId : ''}`,
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      }).catch(err => {
        commit('setError', err)
        throw err
      })

      commit('setSurveyResultData', data)
    }
  }
}