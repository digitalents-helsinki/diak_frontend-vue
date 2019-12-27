import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/index'
import Questionnaire from '@/views/Questionnaire.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import Recovery from '@/views/Recovery.vue'
import Password from '@/views/Password.vue'
import User from '@/views/User.vue'
import Supervisor from '@/views/Supervisor.vue'
import Anonymous from '@/views/Anonymous.vue'
import ErrorPage from '@/views/Error.vue'

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
  if (!store.state.authentication.loggedIn) {
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
      name: 'home',
      component: Home,
      meta: {
        quest: true
      }
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: Supervisor
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        quest: true
      },
      beforeEnter: loggedInGuard
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
        if (store.state.authentication.loggedIn) {
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
      path: '/password/:jwt',
      name: 'password',
      component: Password,
      props: true,
      meta: {
        quest: true
      }
    },
    {
      path: '/questionnaire/testikysely',
      name: 'testsurvey',
      component: Questionnaire,
      props: true
    },
    {
      path: '/anon/questionnaire/:surveyId/:anonId',
      name: 'questionnaire-anon',
      component: Questionnaire,
      props: true,
      beforeEnter: wrapAsync(async (to, from, next) => {
        if (from.name === 'anonymous') {
          next()
        } else {
          store.commit('questionnaire/setSurveyMetaData', {
            surveyId: to.params.surveyId,
            anonId: to.params.anonId,
            anon: true
          })
          await store.dispatch('questionnaire/fetchSurvey')
          if (store.state.questionnaire.surveyData.resultData) {
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
        if (store.state.authentication.loggedIn) {
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
    }
  ]
})

router.onError(err => {
  console.error(err)
  router.replace('/error')
})

export default router