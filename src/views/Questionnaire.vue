<template>
  <div class="background">
    <Main
      v-bind:user="user"
      v-bind:surveyName="surveyName"
      v-on:toggleModal="toggleModal"
    />
    <div class="questionnaire container text-center shadow-lg">
      <div class="loader-spinner-container" v-if="!currentQuestionData && questionnum < navigationData.questionamount">
        <b-spinner label="Loading..." />
      </div>
      <form>
        <transition name="fade" mode="out-in">
          <Question
            v-if="currentQuestionData"
            v-bind:question.sync="currentQuestionData"
            v-bind:navigation.sync="navigationData"
            v-on:toggleModal="toggleModal"
          />
          <Review 
            v-else-if="navigationData.questionamount <= questionnum"
            v-bind:results="questiondata"
            v-bind:navigation.sync="navigationData"
            v-on:saveQuestions="saveQuestions"
            v-on:toggleModal="toggleModal"
          />
        </transition>
      </form>
    </div>
    <Modals
      v-bind:modal="modal_visible"
      v-on:toggleModal="toggleModal"
      v-on:moveHome="moveHome"
    />
  </div>
</template>
<script>
import axios from "axios";
import Main from '@/components/QuestionnaireMain.vue';
import Question from "@/components/QuestionnaireQuestion.vue";
import Review from "@/components/QuestionnaireReview.vue";
import Modals from '@/components/QuestionnaireModals.vue';

export default {
  name: "Questionnaire",
  props: ['user'],
  components: {
    Main,
    Question,
    Review,
    Modals
  },
  data() {
    return {
      questiondata: [],
      questionnum: 0,
      modal_visible: null,
      anonId: this.$route.params.anonId,
      surveyId: this.$route.params.surveyId,
      surveyName: ""
    };
  },
  computed: {
    currentQuestionData: {
      get: function() {
        if (this.questiondata[this.questionnum]) {
          return this.questiondata[this.questionnum]
        } else {
          return null
        }
      },
      set: function(keyValueArr) {
        //set correct questiondata property
        const [ key, value ] = keyValueArr
        if (this.questiondata[this.questionnum].propertyIsEnumerable(key)) {
          this.questiondata[this.questionnum][key] = value
        }
      }
    },
    navigationData: {
      get: function() {
        return ({
          questionnum: this.questionnum,
          questionamount: this.questiondata.length || this.questionnum + 1
        })
      },
      set: function(operator) {
        if (operator === 'add') this.questionnum += 1
        else if (operator === 'subtract') this.questionnum -= 1
      }
    }
  },
  methods: {
    async getQuestions() {
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/survey/" + this.surveyId);
      const reducedData = res.data.Questions.reduce((arr, question) => {
        if(!question.name.endsWith("_custom")) {
          arr[question.number - 1] = {
            name: question.name,
            val: null,
            desc: null
          }
        } else {
          arr[question.number - 1] = {
            name: question.name,
            val: null,
            desc: null,
            custom: {
              title: question.title,
              description: question.description,
              help: question.help
            }
          }
        }
        return arr
      }, []).filter(question => question)

      this.surveyName = res.data.name
      this.questiondata = reducedData
    },
    saveQuestions() {

      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/result",
        data: {
          anonId: this.anonId,
          surveyId: this.surveyId,
          answers: {
            ...this.questiondata
          }
        }
      })
        .then(res => {
          if (res.data.status === "ok") {
            this.$router.push({ path: `/user/results/${this.surveyId}` });
          }
        })
        .catch(err => {});
    },
    toggleModal(value) {
      if (this.modal_visible === null) this.modal_visible = value
      else this.modal_visible = null
    },
    moveHome() {
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.getQuestions()
  }
};
</script>
<style lang="scss" scoped>

.fade {
  &-enter, &-leave-to {
    opacity: 0;
  }
  &-enter-active, &-leave-active {
    transition: opacity 0.125s ease;
  }
}

.notAnswered {
  color: red;
}

/*.range {
  display: flex;
  width: 100%;
  margin: auto;
}*/

.background {
  //background: linear-gradient(to right, #0078f0, #80bfff);
  background: #FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  //justify-content: flex-end;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;


.questionnaire {
  background-color: #FFFFFF;
  padding: 0 5vh;
  border-radius: 15px 15px 0 0;
  height: 85%;
  overflow: auto;
  overflow-x: hidden; //transition
  border-radius: 14px;

  .loader-spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85%;
  }

  /*.buttonOhjeet {
    display: none;
  }*/

  @media screen and (min-width: 1024px) {
    width: 60vw;
    margin-bottom: 5vh;
    border-radius: 15px;
  }
}
}

@media only screen and (min-width: 1025px) {

  /*.buttonOhjeet-Ohjeet {
    display: none !important;
  }*/

  .buttonOhjeet {
    //display: block !important;
    position: absolute;
    top: 3%;
    right: 1%;
    //background-color: #353535 !important;
    font-size: 1rem !important;
    padding: 0.5rem 1.8rem !important;
    //border-radius: 8px 1px;
    //color: #FFFFFF;
    //padding: 0.6rem 1.8rem;
    //font-weight: bold;
    //text-align: center;
  }

  /*.rangeQuestiondata-icon .remove-icon{
     display:none !important;
    }

  .rangeQuestiondata-icon .remove-button{
     display:block !important;
     border-radius: 50px;
     box-shadow: 0 5px 5px gray;
     line-height: 2;
     width: 10rem;
     background-color: #353535;
     color: #ffffff;
     padding:0.1rem 0;
     margin:0.6rem 0 0 1rem;
     Outline: none;
  }*/
}

@media only screen and (min-width: 1900px) {
  .questionnaire {
    height: 100%;
  }

  /*.buttonOhjeet {
    position: relative !important;
    top: 0%;
    left: -5%;
  }*/
}
</style>