<template>
<div class="results">
  <h2>{{$t('message.questionnaireComparisonTitle')}}</h2>
  <b-table small striped responsive :items="resultData"/>
  <div class="bottomDiv">
    <label v-if="!auth && !emailSent">{{$t('message.emailReply')}}</label>
    <p v-else-if="emailSent">{{$t('message.emailResults')}}</p>
    <p class="error" v-if="this.error">{{$t('message.emailFailed')+ this.error}}</p>
    <b-spinner v-if="emailSending" style="color: #350E7E; margin: 0.5rem;" />
    <b-input-group v-else-if="!auth && !emailSent">
      <b-input v-model="email" type="email" autocomplete="email" :placeholder="$t('message.yourEmail')"/>
      <b-input-group-append>
        <b-button :disabled="!email || !email.match(/.+@.+/)" @click="sendEmail" variant="primary">{{$t('message.questionnaireSend')}}</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-button v-else-if="!emailSent" @click="sendEmail" variant="primary">{{$t('message.emailSend')}}</b-button>
  </div>
  <b-button v-if="auth" class="logout" @click="signOut">{{$t('message.questionnairelogout')}}</b-button>
  <b-button v-else class="logout" @click="$router.push({ path: '/' })">{{$t('message.homePage')}}</b-button>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'results',
  data() {
    return {
      email: null,
      emailSending: true,
      emailSent: false,
      error: null
    }
  },
  computed: {
    auth() {
      return this.$route.name.includes('auth')
    },
    resultData() {
      if (this.$store.state.questionnaire.surveyData.resultData) {
        const comparisonQuestion = this.$t('message.questionnaireComparisonQuestion')
        const comparisonAnswer = this.$t('message.questionnaireComparisonAnswer')
        const comparisonAvg = this.$t('message.questionnaireComparisonAvg')
        return this.$store.state.questionnaire.surveyData.resultData.map(question => {
          return {
            [comparisonQuestion]: !question.name.endsWith("_custom") ? this.$t(`message.${question.name}_title`) : question.title,
            [comparisonAnswer]: question.answer,
            [comparisonAvg]: question.avg
          }
        })
      } else {
        return null
      }
    }
  },
  methods: {
    async sendEmail() {
      try {
        if (this.auth || (this.email && this.email.match(/.+@.+/))){
          this.emailSending = true
          const res = await axios({
            method: "POST",
            url: `${process.env.VUE_APP_BACKEND }/${this.auth ? 'auth' : 'anon'}/result/email`,
            headers: {
              'Authorization': `Bearer ${this.auth ? this.$store.state.authentication.accessToken : ''}`
            },
            data: {
              anonId: this.$route.params.anonId,
              surveyId: this.$route.params.surveyId,
              email: this.email
            }
          })
          if (res.status === 200) this.emailSent = true
        }
      } catch(err) {
        this.error = err.response.data
        throw err
      } finally {
        this.emailSending = false
      }
    },
    signOut() {
      this.$store.dispatch('logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss" scoped>
.results {
  margin-top: 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  .bottomDiv {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;

    .error {
      color: crimson;
    }
  }

  .logout {
    margin-bottom: 2rem;
  }
}
</style>