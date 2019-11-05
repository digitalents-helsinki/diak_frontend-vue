import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import Questionnaire from '@/views/Questionnaire.vue'
import SurveyResults from '@/views/SurveyResults.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import Password from '@/views/Password.vue'
import User from '@/views/User.vue'

Vue.use(Router)

function guard(to, from, next) {
  if(store.state.auth.loggedIn) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        quest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter(to, from, next) {
        guard(to, from, next)
      }
    },
    {
      path: '/password',
      name: 'password',
      component: Password,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/questionnaire/:surveyId',
      name: 'questionnaire',
      component: Questionnaire,
      props: true
    },
    {
      path: '/anon/questionnaire/:surveyId/:userId',
      name: 'questionnaire-anon',
      component: Questionnaire,
      props: true
    },
    {
      path: '/auth/questionnaire/:surveyId/:userId?',
      name: 'questionnaire-auth',
      component: Questionnaire,
      props: true,
      beforeEnter(to, from, next) {
        if (store.state.auth.loggedIn) {
          next()
        } else {
          store.state.survey.surveyId = to.params.surveyId
          store.state.survey.userId = to.params.userId
          next('/login')
        }
      }
    },
    {
      path: '/admin/surveyresults/:surveyId',
      name: 'surveyresults',
      component: SurveyResults
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})