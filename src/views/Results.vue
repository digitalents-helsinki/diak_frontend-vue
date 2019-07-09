<template>
<div class="results">
  <h1>Kiitos vastauksistasi</h1>
  <p>{{resultData}}</p>
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
      .get('http://localhost:3000/result/' + this.$route.params.resultId)
      .then(res => {
        this.resultData = res.data
        console.log(this.resultData)
      })
      .catch(err => {

      })
    }
  },
  mounted() {
    this.getResults()
  }
}
</script>
<style lang="scss" scoped>

</style>
