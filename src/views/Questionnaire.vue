<template>
  <div :class="questionnum !== null ? 'background' : ''">
    <Introduction
      v-if="questionnum === null && !this.$store.state.questionnaire.result"
      v-on:moveToQuestionnaire="questionnum = 0"
    />
    <div v-else class="background">
      <Header
        v-bind:user="user"
        v-bind:questionnaire="true"
        v-on:toggleModal="toggleModal"
      />
      <div class="questionnaire container text-center shadow-lg">
        <form>
          <transition name="fade" mode="out-in">
            <Question
              v-if="currentQuestionData"
              v-bind:question.sync="currentQuestionData"
              v-bind:navigation.sync="navigationData"
              v-on:toggleModal="toggleModal"
            />
            <Review 
              v-else-if="navigationData.questionamount <= questionnum && !this.$store.state.questionnaire.result"
              v-bind:results="questiondata"
              v-bind:navigation.sync="navigationData"
              v-on:saveQuestions="saveQuestions"
              v-on:toggleModal="toggleModal"
            />
            <Result
              v-else-if="this.$store.state.questionnaire.result"
            />
          </transition>
        </form>
      </div>
      </div>
      <Modals
        v-bind:modal="modal_visible"
        v-on:toggleModal="toggleModal"
        v-on:saveUnfinishedAnswers="saveUnfinishedAnswers"
      />
  </div>
</template>
<script>
import axios from "axios";
import Introduction from '@/components/QuestionnaireIntroduction.vue'
import Header from '@/components/Header.vue';
import Question from "@/components/QuestionnaireQuestion.vue";
import Review from "@/components/QuestionnaireReview.vue";
import Result from "@/components/QuestionnaireResult.vue"
import Modals from '@/components/QuestionnaireModals.vue';

export default {
  name: "Questionnaire",
  props: ['user'],
  components: {
    Header,
    Question,
    Review,
    Modals,
    Introduction,
    Result
  },
  data() {
    return {
      questiondata: [],
      questionnum: null,
      modal_visible: null
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
    async testQuestionnaire() {

      //FOR TESTING
      if (this.$route.name === "testsurvey") {
        const params = await axios.post(process.env.VUE_APP_BACKEND + "/testsurvey/")
        if (params.status === 200) this.$router.push({ path: `/anon/questionnaire/${params.data.surveyId}/${params.data.anonId}` })
      }
      //
    },
    reduceSurveyData() {
      if (this.$store.state.questionnaire.surveyData.questions) this.questiondata = this.$store.state.questionnaire.surveyData.questions.reduce((arr, question) => {
        if (!question.name.endsWith("_custom")) {
          arr[question.number - 1] = {
            name: question.name,
            val: !question.answer ? null: question.answer.value !== undefined ? question.answer.value : null,
            desc: !question.answer ? null : question.answer.description !== undefined ? question.answer.description : null,
            id: question.questionId
          }
        } else {
          arr[question.number - 1] = {
            name: question.name,
            val: !question.answer ? null: question.answer.value !== undefined ? question.answer.value : null,
            desc: !question.answer ? null : question.answer.description !== undefined ? question.answer.description : null,
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
    },
    saveQuestions() {

      const isAnon = this.$route.name === 'questionnaire-anon'
      const post = isAnon ? "/anon/result/create" : "/auth/result/create"
      const push = isAnon ? '/anon/results' : '/auth/results'

      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + post,
        headers: {
          'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
        },
        data: {
          anonId: this.$route.params.anonId,
          surveyId: this.$route.params.surveyId,
          answers: [...this.questiondata]
        }
      }).then(res => {
          if (res.data.status === "ok") {
            this.$store.dispatch('questionnaire/fetchResult')
          }
        })
        .catch(err => console.error(err));
    },
    saveUnfinishedAnswers() {
      const post = this.$route.name === 'questionnaire-anon' ? "/anon/result/save": "/auth/result/save"
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + post,
        headers: {
          'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
        },
        data: {
          anonId: this.$route.params.anonId,
          surveyId: this.$route.params.surveyId,
          answers: [...this.questiondata]
        }
      }).then(res => {
          if (res.data.status === "ok") {
            this.moveHome()
          }
        })
        .catch(err => console.error(err));
    },
    toggleModal(value) {
      if (this.modal_visible === null) this.modal_visible = value
      else this.modal_visible = null
    },
    moveHome() {
      this.$store.commit('logout')
      this.$router.push({ path: "/" });
    }
  },
  created() {
    //FOR TESTING
    this.testQuestionnaire()
    //
    this.reduceSurveyData()
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