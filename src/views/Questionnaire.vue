<template>
  <div class="background">
    <Main
      v-bind:user="user"
      v-bind:surveyName="surveyName"
      v-on:toggleModal="toggleModal"
    />
    <div class="questionnaire container text-center shadow-lg">
     <b-alert v-if="errormessage" show variant="danger" class="errormessageDisplay"><p>Survey not active</p></b-alert>
      <div class="loader-spinner-container" v-else-if="!currentQuestionData && questionnum < navigationData.questionamount">
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
import Main from '@/components/QuestionnaireHeader.vue';
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
      surveyName: "",
      errormessage:null
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
      const res = await axios.get(process.env.VUE_APP_BACKEND + "/survey/" + id);
      console.log(res)
      if (res.data === "survey not active") {
        this.errormessage = true;
      }
      const reducedData = res.data.Questions.reduce((arr, question) => {
        if(!question.name.endsWith("_custom")) {
          arr[question.number - 1] = {
            name: question.name,
            val: null,
            desc: null,
            id: question.questionId
          }
        } else {
          arr[question.number - 1] = {
            name: question.name,
            val: null,
            desc: null,
            id: question.questionId,
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
      //FOR TESTING
      const post = this.surveyId === "testikysely" ? "/testresult" : "/result"
      //
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + post,
        data: {
          anonId: this.anonId,
          surveyId: this.surveyId,
          answers: [...this.questiondata]
        }
      })
        .then(res => {
          console.log(res)
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

.background {
  background: #FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
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

  .errormessageDisplay{
    margin-top:2rem;

    p{
      margin-top:1rem !important;
    }
  }
  
  .loader-spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85%;
  }

  @media screen and (min-width: 1024px) {
    width: 60vw;
    margin-bottom: 5vh;
    border-radius: 15px;
  }
}
}

@media only screen and (min-width: 1025px) {
  .buttonOhjeet {
    position: absolute;
    top: 3%;
    right: 1%;
    font-size: 1rem !important;
    padding: 0.5rem 1.8rem !important;
  }
}

@media only screen and (min-width: 1900px) {
  .questionnaire {
    height: 100%;
  }
}
</style>