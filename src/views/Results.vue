<template>
<div class="results">
  <h1>Tallennetut vastauksesi</h1>
  <div class="result">
    <div>
      <span>terveydentilaasi</span><span>{{resultData.health}}</span>
      <p>{{resultData.health_desc}}</p>
    </div>
    <div>
      <span>kykyysi voittaa elämässä eteen tulevia vaikeuksia</span><span>{{resultData.overcoming}}</span>
      <p>{{resultData.overcoming_desc}}</p>
    </div>
    <div>
      <span>asumisoloihisi</span><span>{{resultData.living}}</span>
      <p>{{resultData.living_desc}}</p>
    </div>
    <div>
      <span>päivittäiseen pärjäämiseesi</span><span>{{resultData.coping}}</span>
      <p>{{resultData.coping_desc}}</p>
    </div>
    <div>
      <span>perheeseesi ja läheisiisi</span><span>{{resultData.family}}</span>
      <p>{{resultData.family_desc}}</p>
    </div>
    <div>
      <span>luotettavien ystävien määrään</span><span>{{resultData.friends}}</span>
      <p>{{resultData.friends_desc}}</p>
    </div>
    <div>
      <span>taloudelliseen tilanteeseesi</span><span>{{resultData.finance}}</span>
      <p>{{resultData.finance_desc}}</p>
    </div>
    <div>
      <span>omien vahvuuksien kehittämiseen (esim. harrastamalla mieluisia asioita)</span><span>{{resultData.strengths}}</span>
      <p>{{resultData.strengths_desc}}</p>
    </div>
    <div>
      <span>itsetuntoosi</span><span>{{resultData.self_esteem}}</span>
      <p>{{resultData.self_esteem_desc}}</p>
    </div>
    <div>
      <span>elämääsi kokonaisuutena</span><span>{{resultData.life_as_whole}}</span>
      <p>{{resultData.life_as_whole_desc}}</p>
    </div>
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
      .get('http://localhost:3000/result/' + this.$route.params.resultId)
      .then(res => {
        this.resultData = res.data[0]
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
.results {
  display: flex;
  flex-flow: column;
  text-align: center;
  align-items: center;

  .result {
    display: flex;
    flex-flow: row wrap;
    text-align: start;
    width: 80vw;

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;

      span:nth-child(even) {
      }
      span:nth-child(odd) {
        flex-basis: 80%;
      }
    }
  }
}
</style>
