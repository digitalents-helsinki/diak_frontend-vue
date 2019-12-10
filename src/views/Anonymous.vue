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
import axios from 'axios'
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
      isFirstTime: false,
      anonymousinfo: {
        age:null,
        Gender:null,
      },
      error: null
    }
  },
  methods: {
    updateInfo(object) {
      Object.assign(this.anonymousinfo, object)
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