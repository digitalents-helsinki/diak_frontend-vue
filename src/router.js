import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Questionnaire from './views/Questionnaire.vue'
import Results from './views/Results.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/questionnaire/',
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/results/:resultId',
      name: 'results',
      component: Results,
      props: true
    }
  ]
})