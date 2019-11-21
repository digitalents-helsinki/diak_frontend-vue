<template>
  <div :class="questionnum !== null ? 'background' : ''">
    <Introduction
      v-if="questionnum === null && !this.$store.state.questionnaire.surveyData.resultData"
      v-on:moveToQuestionnaire="questionnum = 0"
    />
    <div v-else class="background">
      <Header
        v-bind:user="user"
        v-bind:questionnaire="true"
        v-on:toggleModal="toggleModal"
      />
      <div class="questionnaire container text-center shadow-lg">
        <div class="loader-spinner-container" v-if="questionnum !== null && !currentQuestionData && questionnum < navigationData.questionamount || resultSending">
          <b-spinner label="Loading..." />
        </div>
        <form v-if="!resultSending">
          <transition name="fade" mode="out-in">
            <Question
              v-if="currentQuestionData"
              v-bind:question.sync="currentQuestionData"
              v-bind:navigation.sync="navigationData"
              v-on:toggleModal="toggleModal"
            />
            <Review 
              v-else-if="navigationData.questionamount <= questionnum && !this.$store.state.questionnaire.surveyData.resultData"
              v-bind:results="questionData"
              v-bind:navigation.sync="navigationData"
              v-on:saveQuestions="saveQuestions"
              v-on:toggleModal="toggleModal"
            />
            <Result
              v-else-if="this.$store.state.questionnaire.surveyData.resultData"
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
import Header from '@/components/UserHeader.vue';
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
      questionnum: null,
      modal_visible: null,
      resultSending: false
    };
  },
  computed: {
    questionData() {
      return this.$store.state.questionnaire.surveyData.questionData
    },
    currentQuestionData: {
      get: function() {
        if (this.questionData && this.questionnum !== null && this.questionData[this.questionnum]) {
          return this.questionData[this.questionnum]
        } else {
          return null
        }
      },
      set: function(keyValueArr) {
        //set correct questiondata property in store
        const [ key, value ] = keyValueArr
        if (this.questionData[this.questionnum].propertyIsEnumerable(key)) {
          this.$store.commit('questionnaire/answerQuestion', [key, value, this.questionnum])
        }
      }
    },
    navigationData: {
      get: function() {
        return ({
          questionnum: this.questionnum,
          questionamount: this.questionData ? this.questionData.length : this.questionnum + 1
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
    saveQuestions() {
      this.resultSending = true
      const isAnon = this.$route.name === 'questionnaire-anon'
      const post = isAnon ? "/anon/result/create" : "/auth/result/create"
      try {
        axios({
          method: "POST",
          url: process.env.VUE_APP_BACKEND + post,
          headers: {
            'Authorization': `Bearer ${this.$store.state.authentication.accessToken}`
          },
          data: {
            anonId: this.$route.params.anonId,
            surveyId: this.$route.params.surveyId,
            answers: [...this.questionData]
          }
        }).then(res => {
          if (res.data.status === "ok") {
            this.$store.dispatch('questionnaire/fetchResult')
          }
        })
      } catch(err) {
        throw err
      } finally {
        this.resultSending = false
      }
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
          answers: [...this.questionData]
        }
      }).then(res => {
          if (res.data.status === "ok") {
            this.moveHome()
          }
        })
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