import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Questionnaire from '@/views/Questionnaire.vue'
import Results from '@/views/Results.vue'
import SurveyResults from '@/views/SurveyResults.vue'
import Admin from '@/views/Admin.vue'
import AdminTest from '@/views/Admin-test.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import Password from '@/views/Password.vue'
import Profile from '@/views/Profile.vue'

Vue.use(Router)

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
      path: '/questionnaire/:surveyId',
      name: 'questionnaire',
      component: Questionnaire,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/user/results/:resultId',
      name: 'results',
      component: Results,
      props: true
    },
    {
      path: '/admin/surveyresults/',
      name: 'surveyresults',
      component: SurveyResults,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admintest/',
      name: 'admintest',
      component: AdminTest
    }
  ]
})