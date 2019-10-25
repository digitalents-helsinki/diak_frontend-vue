<template>
  <div class="mainWrapper">
    <div class="topContainer">
      <h4 class="surveyName">Tulokset: <i>{{surveyName}}</i></h4>
      <b-button @click="$emit('closeResults')" class="closeButton"><font-awesome-icon icon="times"></font-awesome-icon></b-button>
    </div>
    <div class="SurveyResults" v-if="loaded">
      <div class="chart-container">
        <bar-chart :avgdata="avg_array" :dvddata="dvd_array" :names="valueFields"/>
      </div>
      <div class="text-center">
        <p>Vastaajien lukumäärä: {{respondent_size}}</p>
      </div>
      <div class="values">
        <div class="labels">
          <h4>Kysymykset</h4>
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
    </div>
    <div class="botContainer">
      <downloadexcel
        class="btn btn-primary"
        :data="results"
        :fields="excel_fields"
        name="tulokset.xls"
      >Lataa CSV</downloadexcel>
      <button
        class="btn btn-primary"
        @click="downloadPdf"
      >Lataa PDF</button>
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
import jsPDF from 'jspdf'

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
    },
    downloadPdf() {
      const canvas = this.$el.querySelector('canvas') //get chart
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const canvasRatio = canvasHeight / canvasWidth
      const doc = new jsPDF('p','pt','a4')
      const docWidth = doc.internal.pageSize.width
      const imgHeight = docWidth * canvasRatio //make chart maintain aspect ratio
      const chart = this.$el.querySelector('canvas').toDataURL('image/png')
      doc.setFontSize(20)
      doc.text(`Tulokset: ${this.surveyName}`, docWidth / 2, 30, 'center')
      doc.addImage(chart, 'PNG', 10, 60, docWidth - 30, imgHeight - 30 * canvasRatio)
      doc.setFontSize(12)
      doc.text(`Vastaajien lukumäärä: ${this.respondent_size}`, docWidth / 2, imgHeight + 90, 'center')
      doc.setFontSize(16)
      doc.text(20, imgHeight + 120, 'Kysymykset')
      doc.text(docWidth / 4 + 20, imgHeight + 120, 'Keskiarvot')
      doc.text(docWidth / 4 * 2 + 20, imgHeight + 120, 'Keskihajonnat')
      doc.text(docWidth / 4 * 3 + 20, imgHeight + 120, 'Lukumäärä')
      doc.setFontSize(12)
      for (let i = 0, j = 0; i < this.valueFields.length; i++, j++) { //loop through data arrays and add to pdf
        const y = (() => {
          //if on first page take chart into account when placing text
          if (doc.internal.getNumberOfPages() === 1) return imgHeight + 150 + j * 30
          else return  20 + j * 30
        })()
        if (y > doc.internal.pageSize.height - 20) {
          //if text is about to go off page, add new page and reset back to top
          doc.addPage()
          j = 0
        }
        doc.text(20, y, this.valueFields[i].length > 20 ? this.valueFields[i].substring(0, 17) + '...' : this.valueFields[i])
        doc.text(docWidth / 4 + 20, y, typeof this.avg_array[i] === "number" ? this.avg_array[i].toFixed(2).toString() : this.avg_array[i])
        doc.text(docWidth / 4 * 2 + 20, y, typeof this.dvd_array[i] === "number" ? this.dvd_array[i].toFixed(2).toString() : this.dvd_array[i])
        doc.text(docWidth / 4 * 3 + 20, y, this.n_array[i].toString())
      }
      doc.save(`${this.surveyName}_${this.surveyId}.pdf`)
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
<style lang="scss" scoped>
.mainWrapper {
  position: fixed;
  max-height: calc(100vh - 2rem);
  margin: 1rem;
  top: 0;
  left: 10%;
  right: 10%;
  background-color: white;
  border: 1px solid #dee2e6;
  display: grid;
  grid-template-areas:
    "topbar"
    "content"
    "botbar";
  grid-template-rows: 4rem 1fr 4rem;

  .topContainer {
    border-bottom: 1px solid #dee2e6;
    grid-area: "topbar";

    .closeButton {
      position: absolute;
      top: 1rem;
      left: 1rem;
      height: 2rem;
      width: 2rem;
      padding: 0;

      svg {
        width: 16px;
      }
    }

    .surveyName {
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 0;
    }
  }

  .SurveyResults {
    grid-area: "content";
    overflow-y: scroll;
    padding: 0 1rem;
    
    .chart-container {
      position: relative;
      width: 100%;
    }

    .values {
      display: grid;
      grid-template-columns: minmax(50px, 1fr) min-content min-content min-content;
      grid-column-gap: 1.5rem;
      justify-content: space-around;

      .labels {
        p {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        h4 {
          color: #212529;
        }
      }
    }
  }

  .botContainer {
    grid-area: "botbar";
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #dee2e6;
  }

  .error {
    width: 100%;
    text-align: center;
  }
}

@media only screen and (max-width: 1400px) {
  .mainWrapper {
    width: calc(100% - 2rem);
    left: 0;
  }
}
</style>
