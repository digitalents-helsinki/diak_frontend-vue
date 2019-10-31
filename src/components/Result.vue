<template>
<div class="results">
  <h2>Tallennetut vastauksesi</h2>
  <div class="result">
    <div class="resultRow" v-for="(value, index) in resultData" v-bind:key="index">
      <div>
        <span v-if="!Object.keys(value)[0].startsWith('custom_')">{{$t(`message.${Object.keys(value)[0]}_title`)}}</span>
        <span v-else>{{Object.keys(value)[0].substring(7)}}</span>
      </div>
      <div>
        <span class="resultValue">{{Object.values(value)[0] || "-"}}</span>
        <span>{{5}}</span>
      </div>
    </div>
  </div>
  <div class="buttonDiv">
    <b-button variant="primary">Lähetä</b-button>
    <b-button @click="signOut">Kirjaudu ulos</b-button>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'results',
  data() {
    return {
      resultId: '',
      resultData: null
    }
  },
  methods: {
    getResults() {
      axios
      .get(process.env.VUE_APP_BACKEND + '/anon/result/' + this.$route.params.surveyId + '/' + this.$route.params.userId)
      .then(res => {
        this.resultData = res.data.Questions.reduce((arr, question) => {
          if(!question.name.endsWith("_custom")) {
            arr[question.number - 1] = {
              [question.name]: question.Answers[0].value
            }
          } else {
            arr[question.number - 1] = {
              ['custom_' + question.title]: question.Answers[0].value
            }
          }
          return arr
        }, []).filter(question => question)
      })
    },
    signOut() {
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
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-top: 2rem;

  .result {
    display: flex;
    flex-flow: row wrap;
    text-align: start;
    margin-top: 1rem;

    .resultRow {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .resultValue {
        margin-right: 2rem;
      }
    }
  }

  .buttonDiv {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
  }
}
</style>
