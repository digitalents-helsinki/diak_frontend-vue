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
          <button v-show="question.val !== null" class="remove-icon" aria-label="Remove Answer" @click.prevent="$emit('update:question', [question.name, null])"><font-awesome-icon icon="times-circle" /></button>
        </div>
        <div class="iconsrangeLabel">
          <span><img class="thumbslogoDown" src="../images/thumbsDown.svg" alt="ThumbsDown"/></span>
          <span><img class="thumbslogoUp" src="../images/thumbsUp.svg" alt="ThumbsUp"/></span>
        </div>
          <b-form-input
            v-bind:class="{activeRange: question.val !== null}"
            type="range"
            id="range"
            autofocus
            number
            min="0"
            max="10"
            v-bind:value="question.val"
            @click="!(question.val === null) || $emit('update:question', [question.name, Number($event.target.value)])"
            @update="$emit('update:question', [question.name, $event])"
          />
          <!-- Clickhandler above allows you to select 5 as a value straight away without firing extra events -->
          <label for="range" class="mobilerangeLabel" @click.prevent>
            <div>0</div>
            <div>10</div>
          </label>
          <label for="range" class="largedeviceLabel" @click.prevent>
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
      <p class="page-number">
        <span class="current" v-bind:key="navigation.questionnum">{{navigation.questionnum + 1}}</span>
        <span class="total">/{{navigation.questionamount}}</span>
      </p>
      <div class="cancelButtondiv">
        <button @click.prevent="$emit('toggleModal', 'cancel')" class="btn cancel-button">{{ $t('message.cancel')}}</button>
      </div>
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
        all: unset;
        font-size:2rem;
        color:#353535;
        display:flex;
        align-self: flex-start;
        transition: color 150ms;

        &:hover {
          color: lighten(#353535, 5%);
        }
        &:focus {
          color: darken(#353535, 5%);
        }
      }
    }

    .iconsrangeLabel {
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

    .mobilerangeLabel {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      width:100%;
    }

    .largedeviceLabel {
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
        &:focus {
          background-color: darken(#353535, 5%)
        }
      }

      &-previous {
        &:hover {
          background-color: lighten(#353535, 5%)
        }
        &:focus {
          background-color: darken(#353535, 5%)
        }
      }
      
      &-complete {
        background-color:#350E7E;

        &:hover {
          background-color: lighten(#350E7E, 5%)
        }
        &:focus {
          background-color: darken(#350E7E, 5%)
        }
      }
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

  .page-number {
    color:#000000;
    font-size:1rem;
    margin-top:1rem;
    margin-bottom:0;

    .current {
      padding:0.1rem;
    }

    .total {
      padding:0.1rem;
    }
  }

  .cancelButtondiv{
    display: flex;
    flex-direction: row;
    justify-content: center;

    .cancel-button {
      color:#350E7E;
      font-size:1.1rem;
      width:8rem;
    }
  }
}

@media only screen and (min-width: 320px) and (max-width: 360px){
  .textareaWordCount{
    margin-top:0.1rem !important;
  }  
}

@media only screen and (min-width: 768px) {
  .mobilerangeLabel {
    display: none !important;
  }

  .largedeviceLabel {
    display: block !important;
    display: -webkit-flex !important;
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 0.3rem !important;
    width: 100%;
    margin: auto;
  }

  .largedeviceLabel > div {
    height: 0.6875rem;
    width: 0.0625rem;
    background: #000000;
    font-weight: bold;
    line-height: 2.875rem;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
  }

  .textareaWordCount{
    margin-top:1.1rem !important;
  }

  .page-number{
    margin-top:0rem !important;
    font-size:1.1rem !important;
  }
}

.custom-range {
  &::-webkit-slider-thumb {
    background: lightgray;
  }

  &::-moz-range-thumb {
    background: lightgray;
  }

  &::-ms-thumb {
    background: gray;
  }

  &::-webkit-slider-runnable-track {
    background: lightgray;
  }
}

@media only screen and (min-width: 1025px) {
  .textareaWordCount{
    margin-top: 1.6rem !important;
  }
}
</style>
