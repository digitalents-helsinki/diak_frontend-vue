<template>
  <div>
    <div class="Login" v-if="login_token">
      <input type="text" v-model="login.user" />
      <input type="text" v-model="login.pass" />
      <button @click.prevent="postLogin">Kirjaudu sisään</button>
    </div>
    <div class="SurveyResults" v-if="!login_token">
      <div class="chart-container">
        <bar-chart v-if="loaded" :avgdata="avg_array" :dvddata="dvd_array"></bar-chart>
      </div>
      <div class="text-center">
        <p>Vastaajien lukumäärä {{respondent_size}}</p>
      </div>
      <div class="values">
        <div class="labels">
          <h4>Values</h4>
          <p>Terveys</p>
          <p>Resilienssi</p>
          <p>Asuminen</p>
          <p>Pärjääminen</p>
          <p>Perhesuhteet</p>
          <p>Ystävyyssuhteet</p>
          <p>Talous</p>
          <p>Itsensä kehittäminen</p>
          <p>Itsetunto</p>
          <p>Elämään tyytyväisyys</p>
        </div>
        <div class="averages">
          <h4>Keskiarvot</h4>
          <p v-for="value of avg_array">{{value.toFixed(2)}}</p>
        </div>
        <div class="stds">
          <h4>Keskihajonnat</h4>
          <p v-for="value of dvd_array">{{value.toFixed(2)}}</p>
        </div>
        <div class="ns">
          <h4>Lukumäärä</h4>
          <p v-for="value of n_array">{{value}}</p>
        </div>
      </div>
      <div class="text-center">
        <downloadexcel
          class="btn btn-primary"
          :data="results"
          :fields="excel_fields"
          name="tulokset.xls"
        >Lataa tiedosto</downloadexcel>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BarChart from "../components/BarChart.vue";
import ErrorBars from "chartjs-plugin-error-bars";
import downloadexcel from "vue-json-excel";
import Annotation from 'chartjs-plugin-annotation';

export default {
  name: "SurveyResults",
  data() {
    return {
      values: [],
      results: undefined,
      avg_array: [],
      dvd_array: [],
      loaded: false,
      respondent_size: NaN,
      excel_fields: {
        Terveys: "health",
        "Terveys teksti": "health_desc",
        Ylitsepääseminen: "overcoming",
        "Ylitsepääseminen teksti": "overcoming_desc",
        Asuminen: "living",
        "Asuminen teksti": "living_desc",
        Pärjääminen: "coping",
        "Pärjääminen teksti": "coping_desc",
        Perhe: "family",
        "Perhe teksti": "family_desc",
        Ystävät: "friends",
        "Ystävät teksti": "friends_desc",
        Talous: "finance",
        "Talous teksti": "finance_desc",
        Vahvuudet: "strengths",
        "Vahvuudet teksti": "strengths_desc",
        Itsetunto: "self_esteem",
        "Itsetunto teksti": "self_esteem_desc",
        "Elämän kokonaisuus": "life_as_whole",
        "Elämän kokonaisuus teksti": "life_as_whole_desc"
      },
      loggedIn: false,
      login: {
        user: undefined,
        pass: undefined
      },
      login_token: undefined,
      items: [],
      fields: [],
      n_array: []
    };
  },
  methods: {
    async getResults() {
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/results/" + this.$route.params.surveyId);
      this.results = res.data;
      this.values = this.results.Questions.reduce((arr, question) => {
        arr[question.number - 1] = question.name
        return arr
      }, []).filter(question => question)
      this.avg_array = this.values.map(value => {
        return(
          this.results.Questions
            .filter(question => question.name === value)[0].Answers
            .reduce((acc, answer) => acc + answer.value, 0) /
              this.results.Questions.filter(question => question.name === value)[0].Answers.length
        );
      });
      this.dvd_array = this.values.map(value => {
        return this.standardDeviation(
          this.results.Questions
            .filter(question => question.name === value)[0].Answers
            .map(answer => answer.value)
        );
      });
      this.n_array = this.values.map(value => {
        return this.results.Questions
          .filter(question => question.name === value)[0].Answers
          .reduce((acc, answer) => acc + 1, 0)
      });
      this.respondent_size = this.results.Questions[0].Answers.length;
      this.loaded = true;
    },
    average(data) {
      const sum = data.reduce(function(sum, value) {
        return sum + value;
      }, 0);

      const avg = sum / data.length;
      return avg;
    },
    standardDeviation(values) {
      const avg = this.average(values);

      const squareDiffs = values.map(function(value) {
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
      });

      const avgSquareDiff = this.average(squareDiffs);

      const stdDev = Math.sqrt(avgSquareDiff);
      return stdDev;
    },
    postLogin() {
      const data = JSON.stringify({
        user: this.login.user,
        pass: this.login.pass
      });
      axios
        .post(process.env.VUE_APP_BACKEND + "/login", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.login_token = res.data.token;
          axios.defaults.headers.common["authorization"] = this.login_token;
          this.getResults();
        });
    }
  },
  components: {
    BarChart,
    downloadexcel
  },
  created() {
    this.getResults()
  }
};
</script>
<style lang="scss">
.SurveyResults {
  .chart-container {
    position: relative;
    height: 100%;
    width: 100vw;
  }

  .values {
    display: flex;
    justify-content: space-around;

    .labels {
      h4 {
        color: white;
      }
    }
  }
}
</style>
