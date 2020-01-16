<template>
  <LogoBox>
    <template v-slot:content>
      <AnonymousComponent
        v-bind:anonymousinfo="anonymousinfo"
        v-on:updateInfo="updateInfo"
        v-on:moveToQuestionnaire="moveToQuestionnaire"
      />
    </template>
  </LogoBox>
</template>
<script>
import LogoBox from '@/components/LogoBox.vue'
import AnonymousComponent from '../components/AnonymousInfo.vue'

export default {
  name: 'Anonymous',
  components: {
    LogoBox,
    AnonymousComponent
  },
   data() {
    return {
      pagenum: 0,
      error: null
    }
  },
  computed: {
    anonymousinfo() {
      return this.$store.state.user.anonUser.anonymousinfo
    }
  },
  methods: {
    updateInfo(object) {
      this.$store.commit('user/updateAnonUserPersonalInfo', object)
    },
    nextPage() {
      this.$data.pagenum++
    },
    moveToQuestionnaire() {
      this.$router.push({ path: `/anon/questionnaire/${this.$store.state.questionnaire.meta.surveyId}/${this.$store.state.questionnaire.meta.anonId}` })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>