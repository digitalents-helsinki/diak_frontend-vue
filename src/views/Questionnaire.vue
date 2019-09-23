<template>
  <div class="background">
    <div class="container-fluid" id="questionnaire-main">
      <div class="questionnaire-top">
      <div id="logodiv">
        <img id="logotop" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
      </div>
        <button @click="toggleHelp" class="btn buttonOhjeet">Ohjeet</button>
      </div>
      <div class="questionnaire-bottom">
        <span v-if="user">{{user}} | {{surveyId}}</span>
        <span v-else>Anonyymi | {{surveyId}}</span>
      </div>
    </div>
        <div @click="toggleHelp" class="dim-background" v-show="help_visible">
      <div class="help-container">
        <p>{{ $t('message.help_text_1') }}</p>
        <p>{{ $t('message.help_text_2') }}</p>
      </div>
    </div>
    <div @click="toggleCancel" class="dim-background" v-show="cancel_visible">
      <div class="cancel-container">
        <div>
          <button class="btn btn-primary">{{ $t('message.cancel_save') }}</button>
        </div>
        <div>
          <button
            @click.prevent="moveHome"
            class="btn btn-primary"
          >{{ $t('message.cancel_discard') }}</button>
        </div>
      </div>
    </div>
    <div class="questionnaire container text-center shadow-lg">
      <div class="loader-spinner-container" v-if="!currentQuestionData && questionnum !== navigationData.questionamount">
        <b-spinner label="Loading..." />
      </div>
      <form>
        <Question
          v-if="currentQuestionData"
          v-bind:question.sync="currentQuestionData"
          v-bind:navigation.sync="navigationData"
          v-on:toggleCancel="toggleCancel"
        />
        <Review 
          v-if="navigationData.questionamount <= questionnum"
          v-bind:results.sync="resultData"
          v-bind:navigation.sync="navigationData"
          v-on:saveQuestions="saveQuestions"
          v-on:toggleCancel="toggleCancel"
        />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Question from "@/components/QuestionnaireQuestion.vue"
import Review from "@/components/QuestionnaireReview.vue"

export default {
  name: "Questionnaire",
  props: ['user'],
  components: {
    Question,
    Review
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
      question_help_visible: {
        health: false,
        overcoming: false,
        living: false,
        coping: false,
        family: false,
        friends: false,
        finance: false,
        strengths: false,
        self_esteem: false,
        life_as_whole: false
      },
      help_visible: false,
      cancel_visible: false,
      surveyId: this.$route.params.surveyId
    };
  },
  watch: {
    subjects: function(newSubjects) {
      //create question help visibility data when custom questions get fetched
      newSubjects.forEach(key => {
        if (!Object.keys(this.question_help_visible).includes(key)) {
          this.$set(this.question_help_visible, key, false)
        }
      })
    }
  },
  computed: {
    subjects: function() {
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
            help: this.question_help_visible[key], 
            custom: this.questiondata[`${key}_custom`]
          })
        } else {
          return null
        }
      },
      set: function(newObject) {
        //set correct questiondata property
        const key = Object.keys(newObject)[0]
        if (this.questiondata.hasOwnProperty(key)) {
          Object.assign(this.questiondata, newObject)
        } else if (typeof newObject[key] === "object" && newObject[key] !== null) {
          //toggle question help
          Object.assign(this.question_help_visible, newObject.help)
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
      set: function(newValue) {
        this.questionnum = newValue
      }
    },
    resultData: function() {
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
    toggleHelp() {
      this.help_visible = !this.help_visible;
    },
    toggleCancel() {
      this.cancel_visible = !this.cancel_visible;
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

  #questionnaire-main {
    display: flex;
    flex-direction:column;
    background-color: #80cde6;
    font-size: 1rem;
    height:8rem;
    overflow: hidden;
    margin-bottom: 0.6rem;

    .questionnaire-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top:1rem;
    
      #logodiv{
          #logotop {
            width:100%;
            height: 60px;
          }
      }

    .buttonOhjeet {
      border-radius: 8px 1px;
      background-color: #353535;
      //background-color: #80cde6;
      color: #FFFFFF;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      }
    }
    .questionnaire-bottom{
      display: flex;
      justify-content:flex-end;
      margin-top:0.1rem;
      font-weight:bold;

      span {
        color: #353535;
        font-size: 1rem;
        position: absolute;
        
        }
      }
  }

  .help-button {
    color: white;
    align-self: flex-start;
    padding-bottom: 5vh;
    padding-left: 5vh;
  }
}

.questionnaire {
  background-color: #FFFFFF;
  padding: 0 5vh;
  border-radius: 15px 15px 0 0;
  height: 85%;
  overflow: auto;
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

.review {

  h3{
    margin:2rem;
  }

  .results {
    display: flex;
    flex-flow: column;
    text-align: start;

    .notanswered{
      color:#A1318A;
      font-size:1rem !important;
    }

    div {
      border: 1px solid lightgray;
      padding: 0.7rem;
      margin: 0.6rem;

      span:nth-of-type(1) {
        font-weight: bold;
        font-size:1.125rem;   
        color:#350E7E;
      }

      span:nth-of-type(2) {
        font-size:1rem;
        padding-right:1rem;
      }

      span:nth-child(even) {
        float: right;
      }
      
      .textarea-collapse{
        background-color:white;
        color:black;
        border:0;
        font-size:1.1rem;
        font-weight:bold;
        margin-left:1rem;
      }
       .text-review{
         white-space: pre-wrap;
         word-wrap:break-word;
         padding-top:0.6rem;
      }
    }
  }

  .review-buttons {
    //margin: 1.8rem 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:2rem 0;

    .send-button {
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      line-height: 2;
      width: 16rem;
      padding: 1rem 2rem;
      background-color:#350E7E;
      color:#FFFFFF;
      font-weight:bold;
      margin:1rem;
      font-size:1rem;
    }

    .return-button{
      color:#350E7E;
      font-size:1.1rem;
    }

    .cancel-button {
      color:#350E7E;
      font-size:1.1rem;
    }
  }
}
.dim-background {
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  .help-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: white;
    height: 70vh;
    border-radius: 15px;
    width: 100vw;
    padding-left: 5vh;
    padding-right: 5vh;

    p:nth-of-type(1) {
      padding-top: 3rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid lightgray;
    }

    p:nth-of-type(2) {
      padding-top: 3rem;
    }
  }

  .cancel-container {
    background-color: white;
    height: 40%;
    border-radius: 15px;
    //width: 80vw;
    padding-left: 5vw;
    padding-right: 5vw;

    div {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      height: 50%;

      button {
        border-radius: 50px;
        box-shadow: 0 5px 5px gray;
      }
    }

    div:nth-of-type(1) {
      border-bottom: 1px solid lightgray;
    }
  }
}
//iPhone 4 Portrait
/*@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}*/
//iPhone 5 Portrait
/*@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  textarea {
    width: 100%;
    border-radius: 4px;
    margin: 1rem 0;
    padding-bottom: 5rem;
  }

  textarea::placeholder {
    opacity: 40%;
    color: #353535;
    font-size: 1rem;
  }

  .cancel-button {
    margin: 1rem 0;
  }
}*/
@media only screen and (min-width: 320px) and (max-width: 360px){
  #questionnaire-main {
    margin-bottom: 0.1rem !important;
  }
}

@media only screen and (min-width: 575px) {
  #questionnaire-main {
    margin-bottom: 1rem !important;
  }
}

@media only screen and (min-width: 768px) {
  #questionnaire-main {
    height: 9rem !important;
  }

  .questionnaire-top > img {
    height: 70px !important;
  }

  .dim-background {
    text-align: center;
  }

  .results .text-review{
    padding-top:0rem !important;
  }

  .page-number{
    margin-top:0rem !important;
  }

  .help-container {
    height: 60vh !important; 
    width: 60vw !important;
  }
  //input[type=range]:not(:hover) ~ .rangeLabel { opacity: 0.10; }
}

.custom-range {
  &::-webkit-slider-thumb {
    background: lightgray;
  }

  &::-moz-range-thumb {
    background: gray;
  }

  &::-ms-thumb {
    background: gray;
  }

  &::-webkit-slider-runnable-track {
    background: lightgray;
  }
}

@media only screen and (min-width: 1025px) {
  #questionnaire-main {
    height: 9rem !important;
  }
  
  .questionnaire-top {
    display: flex !important;
    justify-content: center !important;
  }

  .questionnaire-bottom{
    margin-top:0 !important;
  }

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

  .help_button {
    font-size: 1.3rem !important;
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

@media only screen and (min-width: 1400px) {
  .cancel-container {
    width: 30vw !important;
  }
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

  .review h3{
      margin:1rem 1rem 2rem 1rem;
  }
}
</style>