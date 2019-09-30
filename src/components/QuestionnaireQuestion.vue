<template>
  <div class="question" >
    <SlideTransition v-bind:referencenum="navigation.questionnum">
      <QuestionText
        v-bind:key="navigation.questionnum"
        v-bind:name="question.name"
        v-bind:custom="question.custom"
        v-bind:questionnum="navigation.questionnum"
      />
    </SlideTransition>
    <SlideTransition v-bind:referencenum="navigation.questionnum">
      <div class="range-input" v-bind:key="navigation.questionnum">
        <div class="rangeQuestiondata-icon">
          <p class="rangeQuestiondata">{{question.val}}</p>
          <div v-show="question.val" class="remove-icon"><font-awesome-icon icon="times-circle" @click.prevent="$emit('update:question', [question.name, null])"/></div>
          <div v-show="question.val"><button class="btn remove-button" @click.prevent="$emit('update:question', [question.name,  null])">Poista Vastaus</button></div>
        </div>
        <div class="rangeLabelicons">
          <span><img class="thumbslogoDown" src="../images/thumbsDown.svg" alt="ThumbsDown"/></span>
          <span><img class="thumbslogoUp" src="../images/thumbsUp.svg" alt="ThumbsUp"/></span>
        </div>
          <b-form-input
            v-bind:class="{activeRange: question.val}"
            type="range"
            id="range"
            number
            min="0"
            max="10"
            v-bind:value="question.val"
            @update="$emit('update:question', [question.name, $event])"
          />
          <label for="range" class="rangeLabel-mobile">
            <div>0</div>
            <div>10</div>
          </label>
          <label for="range" class="rangeLabel">
            <div>0</div>
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
          </label>
      </div>
    </SlideTransition>
    <SlideTransition v-bind:referencenum="navigation.questionnum">
      <div class="textareaWordCount" v-bind:key="navigation.questionnum">
        <textarea
          id="textarea"
          v-bind:value="question.desc"
          @input="$emit('update:question', [`${question.name}_desc`, $event.target.value])"
          rows="3" 
          maxlength="2000"
          v-bind:placeholder="$t('message.question_desc_placeholder')"
        />
        <p>{{ $t('message.length') }}{{question.desc ? question.desc.length : '0'}}/2000</p>
      </div>
    </SlideTransition>
    <div class="buttons">
      <button v-if="navigation.questionnum + 1 === navigation.questionamount" class="btn button-complete" @click.prevent="$emit('update:navigation', 'add')">{{ $t('message.complete') }}</button>
      <button v-else class="btn button-next" @click.prevent="$emit('update:navigation', 'add')">{{ $t('message.next') }}</button>
      <button v-if="navigation.questionnum > 0" class="btn button-previous" @click.prevent="$emit('update:navigation', 'subtract')">{{ $t('message.previous') }}</button>
    </div>
      <p class="page-number"  style="align-self: center">
        <span class="current" v-bind:key="navigation.questionnum">{{navigation.questionnum + 1}}</span>
        <span class="total">/{{navigation.questionamount}}</span>
      </p>
    <button @click.prevent="$emit('toggleModal', 'cancel')" class="btn cancel-button">{{ $t('message.cancel')}}</button>
  </div>
</template>
<script>
import SlideTransition from '@/components/TransitionSlide.vue'
import QuestionText from '@/components/QuestionnaireQuestionText.vue'

export default {
  name: 'QuestionnaireQuestion',
  components: {
    SlideTransition,
    QuestionText
  },
  props: {
    question: {
      type: Object,
      required: true, 
      validator: function(prop) {
        if (typeof prop.name !== "string") return false
        if (typeof prop.val !== "number" && prop.val !== null) return false
        if (typeof prop.desc !== "string" && prop.desc !== null) return false
        if (prop.custom !== undefined && prop.custom.title === undefined && prop.custom.description === undefined) return false
        return true
      }
    },
    navigation: {
      type: Object,
      required: true,
      validator: function(prop) {
        if (typeof prop.questionnum !== "number") return false
        if (typeof prop.questionamount !== "number") return false
        return true
      }
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

.question {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 75vh;

  .range-input {
    display: flex;
    flex-direction: column;

    .rangeQuestiondata-icon {
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

      .remove-icon {
        font-size:2rem;
        color:#353535;
        display:flex;
      }

      .remove-button {
        display:none;
      }
    }

    .rangeLabelicons {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      margin-bottom:0.2rem;
      width:100%;

      .thumbslogoDown {
        height:1.6rem;
      }

      .thumbslogoUp {
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
      background-color: #353535;
      color: #FFFFFF;
      font-weight:bold;
      border-radius: 50px;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
      line-height: 2;
      width: 8rem;

      &:focus {
        box-shadow: 0 5px 5px rgba(0, 64, 112, 0.5);
      }
    }

    .button {
      &-next {
        &:hover {
          background-color: lighten(#353535, 5%)
        }
      }

      &-previous {
        &:hover {
          background-color: lighten(#353535, 5%)
        }
      }
      
      &-complete {
        background-color:#350E7E;

        &:hover {
          background-color: lighten(#350E7E, 5%)
        }
      }
    }
  }

  .page-number {
    font-size:1.1rem;
    margin-top:1rem;
    margin-bottom:0;

    .current {
      padding:0.1rem;
    }

    .total {
      padding:0.1rem;
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

    p {
      display:flex;
      justify-content:flex-end;
      font-size:1rem;
    }

  }
  .cancel-button {
    color:#350E7E;
    font-size:1.1rem;
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
}*/

@media only screen and (min-width: 768px) {
  
  .page-number{
    margin-top:0rem !important;
  }

  //input[type=range]:not(:hover) ~ .rangeLabel { opacity: 0.10; }
}

@media only screen and (min-width: 320px) and (max-width: 360px){
  .textareaWordCount{
    margin-top:0.1rem !important;
  }  
}


@media only screen and (min-width: 768px) {
  
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

  .rangeLabel-words{
      margin-top:2rem;
  }
  
}
</style>