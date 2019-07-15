<template>
  <div class="SurveyResults">
    <div class="chart-container">
    <bar-chart v-if="loaded" :avgdata="avg_array" :dvddata="dvd_array"></bar-chart>
    </div>
    <div class="text-center">
      <p>Vastaajien lukumäärä {{respondent_size}}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BarChart from '../components/BarChart.vue'
import ErrorBars from 'chartjs-plugin-error-bars'

export default {
  name: 'SurveyResults',
  data() {
    return {
      results: undefined,
      avg_array: [],
      dvd_array: [],
      loaded: false,
      respondent_size: NaN
    }
  },
  methods: {
    getResults() {
      axios
      .get('http://localhost:3000/results')
      .then(res => {
        this.results = res.data
        const health_avg = this.results.reduce((acc, result) => acc + result.health, 0) / this.results.length
        const overcoming_avg = this.results.reduce((acc, result) => acc + result.overcoming, 0) / this.results.length
        const living_avg = this.results.reduce((acc, result) => acc + result.living, 0) / this.results.length
        const coping_avg = this.results.reduce((acc, result) => acc + result.coping, 0) / this.results.length
        const family_avg = this.results.reduce((acc, result) => acc + result.family, 0) / this.results.length
        const friends_avg = this.results.reduce((acc, result) => acc + result.friends, 0) / this.results.length
        const finance_avg = this.results.reduce((acc, result) => acc + result.finance, 0) / this.results.length
        const strengths_avg = this.results.reduce((acc, result) => acc + result.strengths, 0) / this.results.length
        const self_esteem_avg = this.results.reduce((acc, result) => acc + result.self_esteem, 0) / this.results.length
        const life_as_whole_avg = this.results.reduce((acc, result) => acc + result.life_as_whole, 0) / this.results.length
        this.avg_array.push(health_avg)
        this.avg_array.push(overcoming_avg)
        this.avg_array.push(living_avg)
        this.avg_array.push(coping_avg)
        this.avg_array.push(family_avg)
        this.avg_array.push(friends_avg)
        this.avg_array.push(finance_avg)
        this.avg_array.push(strengths_avg)
        this.avg_array.push(self_esteem_avg)
        this.avg_array.push(life_as_whole_avg)
        const health_dvd = this.standardDeviation(this.results.map(result => result.health))
        const overcoming_dvd = this.standardDeviation(this.results.map(result => result.overcoming))
        const living_dvd = this.standardDeviation(this.results.map(result => result.living))
        const coping_dvd = this.standardDeviation(this.results.map(result => result.coping))
        const family_dvd = this.standardDeviation(this.results.map(result => result.family))
        const friends_dvd = this.standardDeviation(this.results.map(result => result.friends))
        const finance_dvd = this.standardDeviation(this.results.map(result => result.finance))
        const strengths_dvd = this.standardDeviation(this.results.map(result => result.strengths))
        const self_esteem_dvd = this.standardDeviation(this.results.map(result => result.self_esteem))
        const life_as_whole_dvd = this.standardDeviation(this.results.map(result => result.life_as_whole))
        this.dvd_array.push(health_dvd)
        this.dvd_array.push(overcoming_dvd)
        this.dvd_array.push(living_dvd)
        this.dvd_array.push(coping_dvd)
        this.dvd_array.push(family_dvd)
        this.dvd_array.push(friends_dvd)
        this.dvd_array.push(finance_dvd)
        this.dvd_array.push(strengths_dvd)
        this.dvd_array.push(self_esteem_dvd)
        this.dvd_array.push(life_as_whole_dvd)
        this.respondent_size = this.results.length
        this.loaded = true
      })
    },
    average(data){
      var sum = data.reduce(function(sum, value){
        return sum + value;
      }, 0);

      var avg = sum / data.length;
      return avg;
    },
    standardDeviation(values){
      var avg = this.average(values);
      
      var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
      });
      
      var avgSquareDiff = this.average(squareDiffs);

      var stdDev = Math.sqrt(avgSquareDiff);
      return stdDev;
    }
  },
  mounted() {
    this.getResults()
  },
  components: {
    BarChart
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
