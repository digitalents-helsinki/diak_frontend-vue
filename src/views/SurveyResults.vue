<template>
  <div>
    <div class="Login" v-if="!login_token">
      <input type="text" v-model="login.user" />
      <input type="text" v-model="login.pass" />
      <button @click.prevent="postLogin">Kirjaudu sisään</button>
    </div>
    <div class="SurveyResults" v-if="login_token">
      <div class="chart-container">
        <bar-chart v-if="loaded" :avgdata="avg_array" :dvddata="dvd_array" :names="Object.keys(excel_fields)"></bar-chart>
      </div>
      <div class="text-center">
        <p>Vastaajien lukumäärä {{respondent_size}}</p>
      </div>
      <div class="values">
        <div class="labels">
          <h4>Values</h4>
          <p v-for="(value, name, index) in excel_fields" v-bind:key="index">{{name}}</p>
        </div>
        <div class="averages">
          <h4>Keskiarvot</h4>
          <p v-for="(value, index) of avg_array" v-bind:key="index">{{value.toFixed(2)}}</p>
        </div>
        <div class="stds">
          <h4>Keskihajonnat</h4>
          <p v-for="(value, index) of dvd_array" v-bind:key="index">{{value.toFixed(2)}}</p>
        </div>
        <div class="ns">
          <h4>Lukumäärä</h4>
          <p v-for="(value, index) of n_array" v-bind:key="index">{{value}}</p>
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
      excel_fields: {},
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
      console.log(res)
      this.values = res.data.Questions.reduce((arr, question) => {
        arr[question.number - 1] = question.name
        return arr
      }, []).filter(question => question)
      this.avg_array = this.values.map(value => {
        return(
          res.data.Questions
            .find(question => question.name === value).Answers
            .filter(answer => answer.value)
            .reduce((acc, answer) => acc + answer.value, 0) /
              res.data.Questions.find(question => question.name === value).Answers.filter(answer => answer.value).length
        );
      });
      this.dvd_array = this.values.map(value => {
        return this.standardDeviation(
          res.data.Questions
            .find(question => question.name === value).Answers
            .filter(answer => answer.value)
            .map(answer => answer.value)
        );
      });
      this.n_array = this.values.map(value => {
        return res.data.Questions
          .find(question => question.name === value).Answers
          .filter(answer => answer.value)
          .reduce((acc, answer) => acc + 1, 0)
      });
      this.excel_fields = this.values.reduce((obj, value, idx) => {
        if (!value.endsWith("_custom")) {
          return {
            ...obj,
            [`${idx}: ` + this.$t(`message.${value}_title`).slice(0, -1)]: value
          }
        } else {
          return {
            ...obj,
            [`${idx}: ` + res.data.Questions.find(question => question.name === value).title]: value
          }
        }
      }, {});
      const answers = res.data.Questions.flatMap(question => question.Answers)
      const questions = res.data.Questions.map(question => {
        return {
          id: question.questionId,
          name: question.name
        }
      });
      const users = [...new Set(res.data.Questions[0].Answers.map(answer => answer.UserUserId || answer.AnonUserId))]
      const results = users.map(user => {
        return questions.reduce((obj, question) => {
          return {
            ...obj,
            [question.name]: answers.find(answer => (answer.UserUserId === user || answer.AnonUserId === user) && answer.QuestionQuestionId === question.id).value,
            [question.name + '_desc']: answers.find(answer => (answer.UserUserId === user || answer.AnonUserId === user) && answer.QuestionQuestionId === question.id).description
          }
        }, {})
      });
      this.respondent_size = users.length
      this.results = results
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
    width: 100%;
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
