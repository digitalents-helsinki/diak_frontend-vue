<template>
  <div class="wrapper">
      <div class="logo-wrapper">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="logo"/>
      </div>
      <div>
        <questionnaire-agreement v-if="pagenum === 0" v-on:nextPage="nextPage" />
        <personal-info v-if="pagenum === 1" v-on:infoSaved="moveToQuestionnaire" />
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import PersonalInfo from '../components/PersonalInfo.vue'
import QuestionnaireAgreement from '../components/QuestionnaireAgreement.vue'
import store from '@/store'

export default {
  name: 'user',
  data() {
    return {
      isLogged: false,
      hasInfo: false,
      user: null,
      surveys: null,
      pagenum: 0
    }
  },
  methods: {
    async getUser() {
      this.$data.user = await axios.get(process.env.VUE_APP_BACKEND + "/user/" + store.state.auth.userId)
      if (this.$data.user.data.name) {
        this.$data.hasInfo = true
      }
    },
    async getUserSurveys() {
      this.$data.surveys = await axios.get(process.env.VUE_APP_BACKEND + "/surveys/" + store.state.auth.userId)
      this.$data.surveys = this.$data.surveys.data.Surveys
    },
    nextPage() {
      this.$data.pagenum++
    },
    moveToQuestionnaire() {
      this.$router.push({ name: "questionnaire-auth", params: { surveyId: store.state.survey.surveyId }})
    }
  },
  components: {
    PersonalInfo,
    QuestionnaireAgreement
  },
  mounted() {
    this.getUser()
    this.getUserSurveys()
  }
}
</script>
<style lang="scss" scoped>
.logo-wrapper {
  .logo {
    width: 100px;
  }
}
</style>