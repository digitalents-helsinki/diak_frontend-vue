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
    async getUser() {
      axios({
        method: "GET",
        url: process.env.VUE_APP_BACKEND + "/anonuser/" + this.$store.state.auth.userId,
      }).then(res => {
        if (res.status === 200) {
          this.anonymousinfo.age = res.data.age
          this.anonymousinfo.Gender = res.data.gender
        }
      }).catch(err => {
        if (err.response) this.error = err.response.data
        throw err
      })
    },
    updateInfo(object) {
      Object.assign(this.anonymousinfo, object)
    },
    nextPage() {
      this.$data.pagenum++
    },
    moveToQuestionnaire() {
      this.$router.push({ path: `/anon/questionnaire/${this.$store.state.survey.surveyId}/` })
    }
  },
  created() {
    this.getUser()
  }
}
</script>
<style lang="scss" scoped>
</style>