import axios from 'axios'
import i18n from '../../translation'
import defaultQuestions from '../../defaultQuestions'

export default {
  namespaced: true,
  state: {
    surveys: [],
    surveyBeingCreated: {
      name: null,
      anon: true,
      startDate: null,
      endDate: null,
      message: null,
      questions: defaultQuestions.map(question => ({
        ...question,
        questionAnimationId: Math.random()
      })),
      emails: []
    },
    finalizationSurveyId: null
  },
  getters: {
    allDefaultQuestionsExistence(state) {
      return defaultQuestions.every(defaultQuestion => state.surveyBeingCreated.questions.some(question => question.name === defaultQuestion.name))
    }
  },
  mutations: {
    setSurveys(state, surveys) {
      state.surveys = surveys
    },
    setSurveyBeingCreated(state, survey = {}) {
      state.surveyBeingCreated.name = typeof survey.name === 'undefined' ? null : survey.name
      state.surveyBeingCreated.anon = typeof survey.anon === 'undefined' ? true : survey.anon
      state.surveyBeingCreated.startDate = typeof survey.startDate === 'undefined' ? null : survey.startDate
      state.surveyBeingCreated.endDate = typeof survey.endDate === 'undefined' ? null : survey.endDate
      state.surveyBeingCreated.message = typeof survey.message === 'undefined' ? null : survey.message
      state.surveyBeingCreated.questions = typeof survey.questions === 'undefined' ? defaultQuestions.map(question => ({
        ...question,
        questionAnimationId: Math.random()
      })) : survey.questions
      state.surveyBeingCreated.emails = typeof survey.emails === 'undefined' ? [] : survey.emails
    },
    setFinalizationSurveyId(state, surveyId = null) {
      state.finalizationSurveyId = surveyId
    },
    modifySurveyAttribute(state, object) {
      Object.assign(state.surveyBeingCreated, object)
    },
    addQuestion(state) {
      state.surveyBeingCreated.questions.push({
        name: null,
        title: null,
        description: null,
        help: null,
        questionAnimationId: Math.random()
      })
    },
    replaceQuestions(state, questions) {
      state.surveyBeingCreated.questions = questions
    },
    shiftQuestion(state, { index, direction }) {
      if (direction === 'up') {
        state.surveyBeingCreated.questions.splice(index === 0 ? state.surveyBeingCreated.questions.length - 1 : index - 1, 0, ...state.surveyBeingCreated.questions.splice(index, 1))
      } else if (direction === 'down') {
        state.surveyBeingCreated.questions.splice(index === state.surveyBeingCreated.questions.length - 1 ? 0 : index + 1, 0, ...state.surveyBeingCreated.questions.splice(index, 1))
      }
    },
    saveQuestion(state, { index, key, event }) {
      if (state.surveyBeingCreated.questions[index].name) {
        state.surveyBeingCreated.questions[index].title = i18n.t(`message.${state.surveyBeingCreated.questions[index].name}_title`)
        state.surveyBeingCreated.questions[index].description = i18n.t(`message.question_base`) + i18n.t(`message.question_${state.surveyBeingCreated.questions[index].name}`)
        state.surveyBeingCreated.questions[index].help = i18n.t(`message.help_text_${state.surveyBeingCreated.questions[index].name}`)
        state.surveyBeingCreated.questions[index].name = null
        state.surveyBeingCreated.questions[index][key] = event.target.textContent
      } else {
        state.surveyBeingCreated.questions[index][key] = event.target.textContent
      }
    },
    removeQuestion(state, index) {
      state.surveyBeingCreated.questions.splice(index, 1);
    },
    addEmail(state, email) {
      state.surveyBeingCreated.emails.push(email)
    },
    removeEmail(state, index) {
      state.surveyBeingCreated.emails.splice(index, 1)
    },
    replaceEmails(state, emails) {
      state.surveyBeingCreated.emails = emails
    }
  },
  actions: {
    async getSurveys({ rootState, commit }) {
      const { data } = await axios({
        method: 'GET', 
        url: process.env.VUE_APP_BACKEND + "/admin/survey/all",
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      })
      commit('setSurveys', data)
    },
    getSurvey({ rootState }, surveyId) {
      return axios({
        method: 'GET',
        url: `${process.env.VUE_APP_BACKEND}/admin/survey/${surveyId}`,
        headers: {
          'Authorization': `Bearer ${rootState.authentication.accessToken}`
        }
      })
    },
    async reCreateSurvey({ commit, dispatch }, surveyId) {
      const { data: survey } = await dispatch('getSurvey', surveyId)
      const surveyFormData = {
        name: survey.name,
        anon: survey.anon,
        startDate: survey.startDate,
        endDate: survey.endDate,
        message: survey.message,
        questions: survey.Questions.sort((a, b) => a.number > b.number).map(question => ({
          name: question.name.endsWith('_custom') ? null : question.name,
          title: question.title,
          description: question.description,
          help: question.help,
          questionAnimationId: Math.random()
        })),
        emails: survey.anon ? 
          survey.UserGroup.respondents : 
          survey.UserGroup.Users.reduce((arr, user) => [...arr, user.email], []),
      }
      commit('setSurveyBeingCreated', surveyFormData)
    },
    async finalizeSurvey({ commit, dispatch }, surveyId) {
      dispatch('reCreateSurvey', surveyId)
      commit('setFinalizationSurveyId', surveyId)
    },
    toggleDefaultQuestions({ state, getters, commit }) {
      if (getters.allDefaultQuestionsExistence) {
        //delete defaultquestions if all of them exist
        commit('replaceQuestions', state.surveyBeingCreated.questions.filter(question => !defaultQuestions.some(defaultQuestion => defaultQuestion.name === question.name)))
      } else {
        //add nonexisting defaultquestions
        const filteredDefaultQuestions = defaultQuestions.filter(defaultQuestion => !state.surveyBeingCreated.questions.some(question => question.name === defaultQuestion.name))
        commit('replaceQuestions', [...filteredDefaultQuestions.map(question => ({
          ...question,
          questionAnimationId: Math.random()
        })), ...state.surveyBeingCreated.questions])
      }
    }
  }
}