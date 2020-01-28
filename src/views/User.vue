<template>
    <LogoBox>
      <template v-slot:content>
        <ConfidentialityNotice
          v-if="pagenum === 0 && isFirstTime" 
          v-on:nextPage="nextPage"
        />
        <PersonalInfo
          v-else
          v-bind:personalInfo="personalInfo"
          v-bind:isFirstTime="isFirstTime"
          v-on:updateInfo="updateInfo"
          v-on:moveToQuestionnaire="moveToQuestionnaire"
        />
      </template>
    </LogoBox>
</template>
<script>
import LogoBox from '@/components/LogoBox.vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import ConfidentialityNotice from '../components/ConfidentialityNotice.vue'

export default {
  name: 'user',
  components: {
    LogoBox,
    PersonalInfo,
    ConfidentialityNotice
  },
  data() {
    return {
      isLogged: false,
      isFirstTime: this.$store.getters['user/authUserFirstTime'],
      hasInfo: false,
      user: null,
      surveys: null,
      pagenum: 0,
      error: null
    }
  },
  computed: {
    personalInfo() {
      return this.$store.state.user.authUser.personalInfo
    }
  },
  methods: {
    updateInfo(object) {
      this.$store.commit('user/updateAuthUserPersonalInfo', object)
    },
    nextPage() {
      this.$data.pagenum++
    },
    moveToQuestionnaire() {
      this.$router.push({ path: `/auth/questionnaire/${this.$store.state.questionnaire.meta.surveyId}/` })
    }
  },
  created() {
    this.$store.dispatch('questionnaire/fetchSurvey')
  }
}
</script>
<style lang="scss" scoped>
</style>