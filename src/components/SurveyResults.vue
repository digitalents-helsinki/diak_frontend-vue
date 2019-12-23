<template>
  <div class="mainWrapper">
    <div class="subsidiaryWrapper">
      <div class="topContainer">
        <h4 class="surveyName">{{$t('message.surveyResult')}}<i>{{surveyName}}</i></h4>
        <b-button @click="$emit('closeResults')" class="closeButton"><font-awesome-icon icon="times"></font-awesome-icon></b-button>
        <div class="downloadButtons"> 
          <downloadexcel
            class="btn btn-primary csvButton"
            :data="results"
            :fields="excel_fields"
            type="csv"
            :name="`${surveyName}_${surveyId}_${$t('message.fileNameResults')}.xls`"
          >
            CSV
          </downloadexcel>
          <button
            class="btn btn-primary pdfButton"
            @click="downloadPdf"
          >
            PDF
          </button>
        </div>
      </div>
      <div class="SurveyResults" v-if="loaded">
        <div class="chart-container">
          <bar-chart :avgdata="avg_array" :dvddata="dvd_array" :names="valueFields"/>
        </div>
        <div class="text-center">
          <p>{{$t('message.surveyRespondents')}}{{respondent_size}}</p>
        </div>
        <div class="values">
          <div class="labels">
            <h4>{{$t('message.surveyQuestions')}}</h4>
            <p v-for="(value, index) in valueFields" v-bind:key="index">{{value}}</p>
          </div>
          <div class="averages">
            <h4>{{$t('message.surveyAverages')}}</h4>
            <p v-for="(value, index) of avg_array" v-bind:key="index">{{typeof value === "number" ? value.toFixed(2) : value}}</p>
          </div>
          <div class="stds">
            <h4>{{$t('message.standardDeviations')}}</h4>
            <p v-for="(value, index) of dvd_array" v-bind:key="index">{{typeof value === "number" ? value.toFixed(2) : value}}</p>
          </div>
          <div class="ns">
            <h4>{{$t('message.surveyNumber')}}</h4>
            <p v-for="(value, index) of n_array" v-bind:key="index">{{value}}</p>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <b-spinner class="m-5"/>
      </div>
      <div class="error" v-if="loadingError || unknownError">
        {{loadingError ? $t('message.resultsFetchFailed') : $t('message.displayingResultsFailedUnExpectedly')}}
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
      return Object.keys(this.excel_fields).filter(key => !key.endsWith('teksti') && !['postinumero', 'ikä', 'nimi', 'sukupuoli', 'vastausaika'].includes(key))
    }
  },
  methods: {
    async getResults() {
      try {
        const res = await axios({
          method: 'GET', 
          url: process.env.VUE_APP_BACKEND + "/admin/results/" + this.surveyId,
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          }
        }).catch(err => {
          console.error(err)
          throw new Error("fetch failed")
        })

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
        if (res.data.anon) {
          this.excel_fields = {
            vastausaika: 'answeredAt',
            ...this.excel_fields,
            ikä: 'age',
            sukupuoli: 'gender'
          }
        } else {
          this.excel_fields = {
            vastausaika: 'answeredAt',
            ...this.excel_fields,
            nimi: 'name',
            postinumero: 'postal_code',
            sukupuoli: 'gender',
            ikä: 'age',
          }
        }
        
        const answers = res.data.Questions.flatMap(question => question.Answers)
        const questions = res.data.Questions.map(question => {
          return {
            id: question.questionId,
            name: question.name
          }
        });
        const users = [...new Set(res.data.Questions[0].Answers.map(answer => answer.User || answer.AnonUser))]
        const results = users.map(user => {
          let answeredAt
          const questionData = questions.reduce((obj, question) => {
            const answer = answers.find(answer => (answer.UserUserId === user.userId || answer.AnonUserId === user.id) && answer.QuestionQuestionId === question.id)
            answeredAt = answer.updatedAt
            if (answer.User) {
              return {
                ...obj,
                [question.name]: answer.value,
                [question.name + '_desc']: answer.description
              }
            } else {
              return {
                ...obj,
                [question.name]: answer.value,
                [question.name + '_desc']: answer.description
              }
            }
          }, {})

          return {
            ...questionData,
            postal_code: user.post_number,
            age: user.age,
            name: user.name,
            gender: user.gender,
            answeredAt: this.$moment(answeredAt).format('Do MMMM YYYY, kk:mm:ss')
          }
        });
        
        this.respondent_size = users.length
        this.results = results
        this.loaded = true;
      } catch(err) {
        console.error(err)
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
  z-index: 1000000000000000;
  height: calc(100vh - 2rem);
  margin: 1rem;
  top: 0;
  left: 10%;
  right: 10%;
  background-color: white;
  border-radius: 5px;
  
  .subsidiaryWrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas:
      "topbar"
      "content";
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 100%;

    .topContainer {
      border-bottom: 1px solid #dee2e6;
      grid-area: topbar;

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

      .downloadButtons {
        position: absolute;
        display: flex;
        top: 1rem;
        right: 1rem;

        .csvButton {
          height: 2rem;
          margin-right: 1rem;
          padding: 0.2rem 0.4rem;
        
          &:hover {
            cursor: pointer;
          }
        }

        .pdfButton {
          height: 2rem;
          padding: 0.2rem 0.4rem;
        }
      }

      .surveyName {
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-left: 4rem;
        max-width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .SurveyResults {
      grid-area: content;
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

    .error {
      width: 100%;
      text-align: center;
    }
  }
}

@media only screen and (max-width: 1400px) {
  .mainWrapper {
    width: calc(100% - 2rem);
    left: 0;
  }
}
</style>
