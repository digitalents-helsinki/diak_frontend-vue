<template>
  <div class="wrapper">
      <Header/>
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
import Header from '../components/Header.vue'
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
    QuestionnaireAgreement,
    Header
  },
  mounted() {
    this.getUser()
    this.getUserSurveys()
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #F9F9FB;
  width:100%;
  display: flex;
  flex-flow: column nowrap;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
}

@media screen and (min-width: 768px) { 
  .wrapper{
    height:100%;
  }
}
</style>