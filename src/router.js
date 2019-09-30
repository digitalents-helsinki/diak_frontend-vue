import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import Questionnaire from '@/views/Questionnaire.vue'
import Results from '@/views/Results.vue'
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
      path: '/password',
      name: 'password',
      component: Password,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: guard
    },
    {
      path: '/questionnaire/:surveyId',
      name: 'questionnaire',
      component: Questionnaire,
      props: true
    },
    {
      path: '/questionnaire/:surveyId/:anonId',
      name: 'questionnaire',
      component: Questionnaire,
      props: true
    },
    {
      path: '/user/results/:resultId',
      name: 'results',
      component: Results,
      beforeEnter: guard,
      props: true
    },
    {
      path: '/admin/surveyresults/',
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