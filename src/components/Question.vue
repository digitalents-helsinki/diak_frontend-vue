<template>
        <div>
          <div class="question_text">
            <div class="questionHelpbutton">
              <p v-html="$t(`message.${subject}_title`)"></p>
              <p v-html="$t(`message.question_${subject}`)"></p>
              <button
                class="btn help_button buttonHelp"
                @click.prevent="help_text_visible = !help_text_visible"
              >{{ $t('message.questionHelp') }}</button>
            </div>
          </div>
          <p v-if="help_text_visible">{{ $t(`message.help_text_${subject}`) }}</p>
          <div class="range-input">
            <div class="rangeQuestiondata-icon">
              <p class="rangeQuestiondata">{{subjectVal}}</p>
              <div v-show="subjectVal" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="$emit('update:subjectVal', null)"/></div>
              <div v-show="subjectVal"><button class="btn remove-button" @click.prevent="$emit('update:subjectVal', null)">Poista Vastaus</button></div>
            </div>
            <div class="rangeLabelicons">
              <span><img class="thumbslogoDown" src="../images/thumbsDown.svg" alt="ThumbsDown"/></span>
              <span><img class="thumbslogoUp" src="../images/thumbsUp.svg" alt="ThumbsUp"/></span>
            </div>
              <b-form-input
                v-bind:class="{activeRange: subjectVal}"
                type="range"
                min="0"
                max="10"
                v-bind:value="subjectVal"
                @update="$emit('update:subjectVal', $event)"
              />
              <div class="rangeLabel-mobile">
                <div>0</div>
                <div>10</div>
              </div>
              <div class="rangeLabel">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
              </div>
          </div>
          <div class="textareaWordCount">
            <textarea
              v-bind:value="subjectDesc"
              @input="$emit('update:subjectDesc', $event.target.value)"
              rows="3" 
              maxlength="2000"
              v-bind:placeholder="$t('message.question_desc_placeholder')"
            ></textarea>
            <p>{{ $t('message.length') }}{{subjectDesc ? subjectDesc.length : '0'}}/2000</p>
          </div>
        </div>
</template>
<script>
export default {
  name: 'question',
  data() {
    return {
      help_text_visible: false
    }
  },
  props: {
    subject: {
      type: String,
      required: true
    },
    subjectVal: {
      required: true
    },
    subjectDesc: {
      required: true
    },
    questionnum: {
      type: Number,
      required: true
    }
  }
}
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
        color: white;
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

  /*.buttonOhjeet {
    display: none;
  }*/

  @media screen and (min-width: 1024px) {
    width: 60vw;
    margin-bottom: 5vh;
    border-radius: 15px;
  }

      .question_text {
        display: flex;
        flex-flow: column nowrap;

        .questionHelpbutton {
          margin-top:1rem;
          margin-bottom:1rem;
          text-align: left;

          p, button{
            display:inline;
          }

          p:nth-of-type(1) {
            font-weight: bold;
            font-size: 1rem;
            color: #350e7e;
            margin-right: 1rem;
          }

          p:nth-of-type(2) {
            font-size: 1rem;
            color: #353535;
            margin-right: 1rem;
            }

          .help_button {
            background-color: #350e7e;
            padding: 0 0.6rem ;
            font-size: 1.1rem;
            font-weight: bold;
            align-items: center;
            color: #FFFFFF;
            //align-self: flex-end;
          }
        } 
      }

      .range-input {
        display: flex;
        flex-direction: column;

        .rangeQuestiondata-icon{
          position: relative;
          display: flex;
          left: calc(50% - 30px);
          margin-bottom: 0.1rem;
          width: 50%;
          
          .rangeQuestiondata {
            font-size: 1.8rem;
            width:60px;
            height:60px;
            border:1px solid lightgrey;
            display: flex;
            justify-content:center;
            align-items:center;
          }
          .remove-icon{
            font-size:2rem;
            color:#353535;
            display:flex;
          }
          .remove-button{
            display:none;
          }
        }
        .rangeLabelicons{
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          margin-bottom:0.2rem;
          width:100%;

          .thumbslogoDown{
            height:1.6rem;
          }
          .thumbslogoUp{
            height:1.6rem;
          }
        }
        .rangeLabel-mobile {
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          width:100%;
        }
        .rangeLabel {
          display: none;
        }
        .activeRange {
          &::-webkit-slider-thumb {
            background: #350e7e;
          }

          &::-moz-range-thumb {
            background: #350e7e;
          }

          &::-ms-thumb {
            background: #350e7e;
          }
        }
      }

      .buttons {
        display: flex;
        flex-flow: row-reverse nowrap;
        justify-content: space-between;
        text-align:center;

        button {
          border-radius: 50px;
          box-shadow: 0 5px 5px gray;
          line-height: 2;
          width: 8rem;
        }
        .button-next {
          background-color: #353535;
          color: #FFFFFF;
          font-weight:bold;
        }
        .button-previous {
          background-color: #353535;
          color: #FFFFFF;
          font-weight:bold;
        }
        .button-complete{
          background-color:#350E7E;
          color:#FFFFFF;
          font-weight:bold;
        }
      }

    .page-number{
      font-size:1.1rem;
      margin-top:1rem;
      margin-bottom:0;

      .current{
        padding:0.1rem;
      }
      .total{
        padding:0.1rem;
      }
    }
    
      .cancel-button {
        color: #350e7e;
        opacity: 70%;
        font-size: 1.3em;
      }
}
.textareaWordCount{
  margin-top:0.6rem;
  
  textarea {
    width: 100%;
    border-radius: 4px;
  }
  textarea::placeholder {
    opacity: 40%;
    color: #353535;
  }
  p{
    display:flex;
    justify-content:flex-end;
    font-size:1rem;
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
  .questionHelpbutton {
    margin-top:0.1rem !important;
    margin-bottom:0.3rem !important;
  }
  .textareaWordCount{
    margin-top:0.1rem !important;
  }  
}

@media only screen and (min-width: 575px) {
  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.1rem !important;
  }
}

@media only screen and (min-width: 768px) {
  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.1rem !important;
  }
  
  .rangeLabel-mobile {
    display: none !important;
  }

  .rangeLabel {
    display: block !important;
    display: -webkit-flex !important;
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 0.3rem !important;
    width: 100%;
    margin: auto;
  }

  .rangeLabel > div {
    height: 0.6875rem;
    width: 0.0625rem;
    background: #000000;
    font-weight: bold;
    line-height: 2.875rem;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
  }

  /*.rangeLabel-icons{
    display:none !important;
  }*/

  /*.rangeLabel-words{
    display:block !important;
    display: -webkit-flex !important;
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom:0.1rem;
    margin-top:2rem;
    font-size:1rem !important;
  }*/

  .textareaWordCount{
    margin-top:1.2rem;
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
  
  .questionHelpbutton {
    margin-top:2rem !important;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.3rem !important;
  }
  
  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.2rem !important;
  }

  .help_button {
    font-size: 1.3rem !important;
  }

  .rangeLabel-words{
      margin-top:1.7rem;
  }

  .textareaWordCount{
    margin-top: 2rem;
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
  .questionHelpbutton {
    margin-top:2.5rem !important;
    margin:0 4rem;
    text-align: center !important;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.375rem !important;
  }
  
  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.3rem !important;
  }

  .rangeLabel-words{
      margin-top:2rem;
  }
  
}

@media only screen and (min-width: 1900px) {
  /*.buttonOhjeet {
    position: relative !important;
    top: 0%;
    left: -5%;
  }*/

  .questionHelpbutton {
    margin-top: 2.5rem !important;
    margin:0 4rem;
  }

  .questionHelpbutton p:nth-of-type(1) {
    font-size: 1.375rem !important;
  }

  .questionHelpbutton p:nth-of-type(2) {
    font-size: 1.3rem !important;
  }
}
</style>
