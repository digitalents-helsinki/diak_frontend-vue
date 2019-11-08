<template>
    <LogoBox>
      <template v-slot:content>
        <ConfidentialityNotice
          v-if="pagenum === 0 && isFirstTime" 
          v-on:nextPage="nextPage"
        />
        <PersonalInfo
          v-else
          v-bind:personalinfo="personalinfo"
          v-bind:isFirstTime="isFirstTime"
          v-on:updateInfo="updateInfo"
          v-on:moveToQuestionnaire="moveToQuestionnaire"
        />
      </template>
    </LogoBox>
</template>
<script>
import axios from 'axios'
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
      hasInfo: false,
      user: null,
      surveys: null,
      pagenum: 0,
      isFirstTime: false,
      personalinfo: {
        name: null,
        address: null,
        birthdate: null,
        gender:null,
        phonenumber: null
      },
      error: null
    }
  },
  methods: {
    async getUser() {
      axios({
        method: "GET",
        url: process.env.VUE_APP_BACKEND + "/user/" + this.$store.state.auth.userId,
        headers: {
          'Authorization': `Bearer ${this.$store.state.auth.accessToken}`
        }
      }).then(res => {
        if (res.status === 200) {
          this.isFirstTime = !res.data.name
          this.personalinfo.name = res.data.name
          this.personalinfo.address = res.data.address
          this.personalinfo.birthdate = res.data.birth_date
          this.personalinfo.gender = res.data.gender
          this.personalinfo.phonenumber = res.data.phone_number
        }
      }).catch(err => {
        if (err.response) this.error = err.response.data
        throw err
      })
    },
    updateInfo(object) {
      Object.assign(this.personalinfo, object)
    },
    nextPage() {
      this.$data.pagenum++
    },
    moveToQuestionnaire() {
      this.$router.push({ path: `/auth/questionnaire/${this.$store.state.survey.surveyId}/` })
    }
  },
  created() {
    this.getUser()
  }
}
</script>
<style lang="scss" scoped>
</style>