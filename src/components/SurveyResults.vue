<template>
  <div class="mainWrapper">
    <h4 class="surveyName">Tulokset: <i>{{surveyName}}</i></h4>
    <b-button @click="$emit('closeResults')" class="closeButton"><font-awesome-icon icon="times"></font-awesome-icon></b-button>
    <div class="SurveyResults" v-if="loaded">
      <div class="chart-container">
        <bar-chart :avgdata="avg_array" :dvddata="dvd_array" :names="valueFields"></bar-chart>
      </div>
      <div class="text-center">
        <p>Vastaajien lukumäärä {{respondent_size}}</p>
      </div>
      <div class="values">
        <div class="labels">
          <h4>Values</h4>
          <p v-for="(value, index) in valueFields" v-bind:key="index">{{value}}</p>
        </div>
        <div class="averages">
          <h4>Keskiarvot</h4>
          <p v-for="(value, index) of avg_array" v-bind:key="index">{{typeof value === "number" ? value.toFixed(2) : value}}</p>
        </div>
        <div class="stds">
          <h4>Keskihajonnat</h4>
          <p v-for="(value, index) of dvd_array" v-bind:key="index">{{typeof value === "number" ? value.toFixed(2) : value}}</p>
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
    <div class="error" v-if="loadingError || unknownError">
      {{loadingError ? "Fetching survey results failed. Try checking your internet connection." : "Displaying survey results failed unexpectedly"}}
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
  props: {
    surveyId: {
      type: String,
      required: true
    },
    surveyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      values: [],
      response: null,
      results: undefined,
      avg_array: [],
      dvd_array: [],
      loaded: false,
      loadingError: false,
      unknownError: false,
      respondent_size: null,
      excel_fields: {},
      items: [],
      fields: [],
      n_array: []
    };
  },
  computed: {
    valueFields() {
      return Object.keys(this.excel_fields).filter(key => !key.endsWith('teksti'))
    }
  },
  methods: {
    async getResults() {
      try {
        //FOR TESTING
        const id = await (async () => {
          if (this.surveyId === "testikysely") {
            const test = await axios.post(process.env.VUE_APP_BACKEND + "/testsurvey/")
            return test.data
          } else {
            return this.surveyId
          }
        })()
        //
        const res = await axios.get(process.env.VUE_APP_BACKEND + "/results/" + id).catch(err => { throw new Error("fetch failed") })

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
                res.data.Questions.find(question => question.name === value).Answers.filter(answer => answer.value !== null).length
          );
        }).map(avg => Number.isNaN(avg) ? "-" : avg);
        this.dvd_array = this.values.map(value => {
          return this.standardDeviation(
            res.data.Questions
              .find(question => question.name === value).Answers
              .filter(answer => answer.value !== null)
              .map(answer => answer.value)
          );
        }).map(dvd => Number.isNaN(dvd) ? "-" : dvd);
        this.n_array = this.values.map(value => {
          return res.data.Questions
            .find(question => question.name === value).Answers
            .filter(answer => answer.value !== null)
            .reduce((acc, answer) => acc + 1, 0)
        });
        this.excel_fields = this.values.reduce((obj, value, idx) => {
          if (!value.endsWith("_custom")) {
            return {
              ...obj,
              [`${idx + 1}: ` + this.$t(`message.${value}_title`)]: value,
              [`${idx + 1}: ` + this.$t(`message.${value}_title`) + " teksti"]: `${value}_desc`
            }
          } else {
            return {
              ...obj,
              [`${idx + 1}: ` + res.data.Questions.find(question => question.name === value).title]: value,
              [`${idx + 1}: ` + res.data.Questions.find(question => question.name === value).title + " teksti"]: `${value}_desc`
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
      } catch(err) {
        if (err.message === "fetch failed") {
          this.loadingError = true
        } else {
          this.unknownError = true
        }
      }
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
.mainWrapper {
  position: fixed;
  max-height: calc(100vh - 2rem);
  margin: 1rem;
  top: 0;
  left: 10%;
  right: 10%;
  background-color: white;
  border: 1px solid #dee2e6;
  padding: 1rem;
  overflow-y: scroll;

  .closeButton {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .surveyName {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
  }

  .SurveyResults {
    padding: 1rem;
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
          color: #212529;
        }
      }
    }
  }

  .error {
    width: 100%;
    text-align: center;
  }
}

  @media only screen and (max-width: 1400px) {
    .mainWrapper{
      width: calc(100% - 2rem);
      left: 0;
    }
}
</style>
