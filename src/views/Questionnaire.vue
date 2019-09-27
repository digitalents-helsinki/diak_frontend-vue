<template>
  <div class="background">
    <Main
      v-bind:user="user"
      v-bind:surveyId="surveyId"
      v-on:toggleModal="toggleModal"
    />
    <div class="questionnaire container text-center shadow-lg">
      <div class="loader-spinner-container" v-if="!currentQuestionData && questionnum !== navigationData.questionamount">
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
            v-if="navigationData.questionamount <= questionnum"
            v-bind:results.sync="resultData"
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
import Main from '@/components/QuestionnaireMain.vue'
import Question from "@/components/QuestionnaireQuestion.vue"
import Review from "@/components/QuestionnaireReview.vue"
import Modals from '@/components/QuestionnaireModals.vue'

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
      questiondata: {
        health: null,
        overcoming: null,
        living: null,
        coping: null,
        family: null,
        friends: null,
        finance: null,
        strengths: null,
        self_esteem: null,
        life_as_whole: null,
        health_desc: null,
        overcoming_desc: null,
        living_desc: null,
        coping_desc: null,
        family_desc: null,
        friends_desc: null,
        finance_desc: null,
        strengths_desc: null,
        self_esteem_desc: null,
        life_as_whole_desc: null
      },
      questionnum: 0,
      modal_visible: null,
      surveyId: this.$route.params.surveyId
    };
  },
  computed: {
    subjects() {
      //everything in questiondata that doesn't end with _desc or _custom
      return Object.keys(this.questiondata).filter(key => !key.endsWith("_desc") && !key.endsWith("_custom"))
    },
    currentQuestionData: {
      get: function() {
        //get current question
        const key = this.subjects[this.questionnum]
        //associate questiondata
        if (key) {
          return ({
            name: key, 
            val: this.questiondata[key], 
            desc: this.questiondata[`${key}_desc`],
            custom: this.questiondata[`${key}_custom`]
          })
        } else {
          return null
        }
      },
      set: function(keyValueArr) {
        //set correct questiondata property
        const [ key, value ] = keyValueArr
        if (this.questiondata.hasOwnProperty(key) && this.questiondata.propertyIsEnumerable(key)) {
          this.questiondata[key] = value
        }
      }
    },
    navigationData: {
      get: function() {
        return ({
          questionnum: this.questionnum,
          questionamount: this.subjects.length
        })
      },
      set: function(operator) {
        if (operator === 'add') this.questionnum += 1
        else if (operator === 'subtract') this.questionnum -= 1
      }
    },
    resultData() {
      //format for rendering results
      return this.subjects.reduce((obj, key) => {
        return { 
          ...obj, 
          [key]: { 
            val: this.questiondata[key], 
            desc: this.questiondata[`${key}_desc`], 
            custom: this.questiondata[`${key}_custom`] 
          } 
        }
      }, {})
    }
  },
  methods: {
    getQuestions() {
      const fetchedData = {
        question: null, 
        question_desc: null, 
        question_custom: {
          title: "Custom Title", 
          description: "Custom Description", 
          help: "Custom Help"
        }
      }
      this.questiondata = {...this.questiondata, ...fetchedData}
    },
    saveQuestions() {

      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/result",
        data: { ...this.questiondata }
      })
        .then(res => {
          if (res.data.status === "ok") {
            this.$router.push({ path: `/user/results/${res.data.resultId}` });
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