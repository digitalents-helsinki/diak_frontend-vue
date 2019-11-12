<template>
<div class="results">
  <h2>{{$t('message.questionnaireComparisonTitle')}}</h2>
  <b-table small striped responsive :items="resultData"/>
  <div class="bottomDiv">
    <label v-if="!auth && !emailSent">Voit lähettää vastauksesi sähköpostiisi</label>
    <p v-else-if="emailSent">Tuloksesi on lähetetty sähköpostiisi</p>
    <p class="error" v-if="this.error">{{"Sähköpostin lähettäminen epäonnistui: " + this.error}}</p>
    <b-input-group v-if="!auth && !emailSent">
      <b-input v-model="email" type="email" autocomplete="email" :state="(email && !!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) ? true : null" placeholder="Sähköpostiosoitteesi"/>
      <b-input-group-append>
        <b-button :disabled="!email || !email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)" @click="sendEmail" variant="primary">Lähetä</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-button v-else-if="!emailSent" @click="sendEmail" variant="primary">Lähetä sähköpostiisi</b-button>
  </div>
  <b-button v-if="auth" class="logout" @click="signOut">Kirjaudu ulos</b-button>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'results',
  data() {
    return {
      resultData: null,
      email: null,
      emailSent: false,
      error: null
    }
  },
  computed: {
    auth() {
      return this.$route.name.includes('auth')
    }
  },
  methods: {
    getResults() {
      const comparisonQuestion = this.$t('message.questionnaireComparisonQuestion')
      const comparisonAnswer = this.$t('message.questionnaireComparisonAnswer')
      const comparisonAvg = this.$t('message.questionnaireComparisonAvg')
      this.resultData = this.$store.state.questionnaire.result.Result.Questions.reduce((arr, question) => {
        arr[question.number - 1] = {
          [comparisonQuestion]: !question.name.endsWith("_custom") ? this.$t(`message.${question.name}_title`) : question.title,
          [comparisonAnswer]: question.Answers[0].value !== null ? question.Answers[0].value : '-',
          [comparisonAvg]: (avg => avg ? Number(avg).toFixed(2) : '-')(this.$store.state.questionnaire.result.Averages.find(obj => obj.number === question.number).answerAvg)
        }
        return arr
      }, []).filter(question => question)
    },
    sendEmail() {
      if (this.auth || (this.email && this.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/))){
        axios({
          method: "POST",
          url: `${process.env.VUE_APP_BACKEND }/${this.auth ? 'auth' : 'anon'}/emailresult`,
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          },
          data: {
            anonId: this.$route.params.anonId,
            surveyId: this.$route.params.surveyId,
            email: this.email
          }
        }).then(res => {
          if (res.status === 200) this.emailSent = true
        }).catch(err => {
          this.error = err.response.data
          throw err
        })
      }
    },
    signOut() {
      this.$store.commit('logout')
      this.$router.push({ path: '/' })
    }
  },
  created() {
    this.getResults()
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
