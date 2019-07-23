<template>
  <div>
    <div class="Login" v-if="!login_token">
      <input type="text" v-model="login.user" />
      <input type="text" v-model="login.pass" />
      <button @click.prevent="postLogin">Kirjaudu sisään</button>
    </div>
    <div class="SurveyResults" v-if="login_token">
      <div class="chart-container">
        <bar-chart v-if="loaded" :avgdata="avg_array" :dvddata="dvd_array"></bar-chart>
      </div>
      <div class="text-center">
        <p>Vastaajien lukumäärä {{respondent_size}}</p>
        <downloadexcel class="btn btn-primary" :data="results" :fields="excel_fields" name="tulokset.xls">Lataa tiedosto</downloadexcel>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BarChart from '../components/BarChart.vue'
import ErrorBars from 'chartjs-plugin-error-bars'
import downloadexcel from 'vue-json-excel'

export default {
  name: 'SurveyResults',
  data() {
    return {
      values:  ['health', 'overcoming', 'living', 'coping', 'family', 'friends', 'finance', 'strengths', 'self_esteem', 'life_as_whole'],
      results: undefined,
      avg_array: [],
      dvd_array: [],
      loaded: false,
      respondent_size: NaN,
      excel_fields: {
        'Terveys': 'health',
        'Ylitsepääseminen': 'overcoming',
        'Asuminen': 'living',
        'Pärjääminen': 'coping',
        'Perhe': 'family',
        'Ystävät': 'friends',
        'Talous': 'finance',
        'Vahvuudet': 'strengths',
        'Itsetunto': 'self_esteem',
        'Elämän kokonaisuus': 'life_as_whole'
      },
      loggedIn: false,
      login: {
        user: undefined,
        pass: undefined
      },
      login_token: undefined
    }
  },
  methods: {
    async getResults() {
      const res = await axios.get('http://localhost:3000/results')
      this.results = res.data
      this.avg_array = this.values.map((value) => {
        return this.results.filter(result => result !== null).reduce((acc, result) => acc + result[value], 0) / this.results.filter(result => result !== null).length
      })
      this.dvd_array = this.values.map((value) => {
        return this.standardDeviation(this.results.filter(result => result !== null).map(result => result[value]))
      })
      this.respondent_size = this.results.length
      this.loaded = true
    },
    average(data){
      const sum = data.reduce(function(sum, value){
        return sum + value;
      }, 0);

      const avg = sum / data.length;
      return avg;
    },
    standardDeviation(values){
      const avg = this.average(values);
      
      const squareDiffs = values.map(function(value){
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
      });
      
      const avgSquareDiff = this.average(squareDiffs);

      const stdDev = Math.sqrt(avgSquareDiff);
      return stdDev;
    },
    postLogin() {
      axios
        .post('http://localhost:3000/login', {
          user: this.login.user,
          pass: this.login.pass
        })
        .then(res => {
          this.login_token = res.data.token
          axios.defaults.headers.common['authorization'] = this.login_token
          this.getResults()
        })
    }
  },
  components: {
    BarChart,
    downloadexcel
  }
}
</script>
<style lang="scss">
.SurveyResults {

  .chart-container {
    position: relative;
    height: 100%;
    width: 100vw;
  }
}
</style>
