import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import Recovery from '@/views/Recovery.vue'
import Password from '@/views/Password.vue'
import ErrorPage from '@/views/Error.vue'
import Questionnaire from '@/views/Questionnaire.vue'
import User from '@/views/User.vue'
import Anonymous from '@/views/Anonymous.vue'
const Admin = () => import('@/views/Admin.vue')
const Supervisor = () => import('@/views/Supervisor.vue')

Vue.use(Router)

/* passes error into next in async guards */
const wrapAsync = fn => (...args) => Promise.resolve(fn(...args)).catch(args[2])

function adminGuard(to, from, next) {
  if (store.state.authentication.role === 'admin') {
    next() 
  } else {
    next('/login')
  }
}

function loggedInGuard(to, from, next) {
  if (!store.state.authentication.accessToken) {
    next()
  } else {
    next('/user')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        quest: true
      },
      beforeEnter: loggedInGuard
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: Supervisor
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
      beforeEnter: (to, from, next) => {
        if (store.state.authentication.accessToken) {
          store.dispatch('user/fetchUserInfo')
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/anonymous',
      name: 'anonymous',
      component: Anonymous
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: Recovery,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/password/(change|create)/:jwt',
      name: 'password',
      component: Password,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/anon/questionnaire/:surveyId/:anonId',
      name: 'questionnaire-anon',
      component: Questionnaire,
      props: true,
      beforeEnter: wrapAsync(async (to, from, next) => {
        if (from.name === 'anonymous') {
          if (!store.state.questionnaire.surveyData.questionData && !store.state.questionnaire.surveyData.resultData) {
            await store.dispatch('questionnaire/fetchSurvey')
          }
          next()
        } else {
          store.commit('questionnaire/setSurveyMetaData', {
            surveyId: to.params.surveyId,
            anonId: to.params.anonId,
            anon: true
          })
          await store.dispatch('questionnaire/fetchSurvey')
          if (store.state.questionnaire.surveyData.resultData || store.state.questionnaire.error.message) {
            next()
          } else {
            next('/anonymous')
          }
        }
      })
    },
    {
      path: '/auth/questionnaire/:surveyId/:userId?',
      name: 'questionnaire-auth',
      component: Questionnaire,
      props: true,
      beforeEnter: (to, from, next) => {
        store.commit('questionnaire/setSurveyMetaData', {
          surveyId: to.params.surveyId,
          anon: false
        })
        if (store.state.authentication.accessToken) {
          if (from.name === 'user') {
            next()
          } else {
            next('/user')
          }
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: adminGuard
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '*',
      name: '404',
      component: ErrorPage
    }
  ]
})

router.onError(err => {
  console.error(err)
  router.replace('/error')
})

export default router