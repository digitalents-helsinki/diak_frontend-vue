<template>
  <div class="question" >
    <transition 
      v-bind:name="slide" 
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
      >
    <div class="question_text" v-bind:key="navigation.questionnum">
      <div class="questionHelpbutton">
        <p v-if="!question.custom" v-html="$t(`message.${question.name}_title`)"></p>
        <p v-else>{{`${navigation.questionnum + 1}. ${question.custom.title}`}}</p>
        <label v-if="!question.custom" for="textarea" v-html="$t(`message.question_${question.name}`)"></label>
        <label v-else for="textarea">{{question.custom.description}}</label>        
        <button
          v-if="!question.custom || question.custom.help"
          class="btn help_button buttonHelp"
          @click.prevent
          v-b-popover.hover.focus.bottom="!question.custom ? $t(`message.help_text_${question.name}`) : question.custom.help"
        >
          {{ $t('message.questionHelp') }}
        </button>
      </div>
    </div>
    </transition>
    <transition 
      v-bind:name="slide" 
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
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
    </transition>
    <transition 
      v-bind:name="slide" 
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
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
    </transition>
    <div class="buttons">
      <button v-if="navigation.questionnum + 1 === navigation.questionamount" class="btn button-complete" @click.prevent="$emit('update:navigation', navigation.questionnum + 1)">{{ $t('message.complete') }}</button>
      <button v-else class="btn button-next" @click.prevent="$emit('update:navigation', navigation.questionnum + 1)">{{ $t('message.next') }}</button>
      <button v-if="navigation.questionnum > 0" class="btn button-previous" @click.prevent="$emit('update:navigation', navigation.questionnum - 1)">{{ $t('message.previous') }}</button>
    </div>
    <p class="page-number"  style="align-self: center"><span class="current">{{navigation.questionnum + 1}}</span><span class="total">/{{navigation.questionamount}}</span></p>
    <button @click.prevent="$emit('toggleModal', 'cancel')" class="btn cancel-button">{{ $t('message.cancel')}}</button>
  </div>
</template>
<script>

export default {
  name: 'QuestionnaireQuestion',
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
  },
  data() {
    return {
      heights: {}
    }
  },
  computed: {
    slide: function() {
      return this.navigation.latestquestionnum < this.navigation.questionnum ? "forward" : "backward"
    }
  },
  methods: {
    beforeLeave(element) {
      this.$set(this.heights, `${element.classList[0]}PrevHeight`, getComputedStyle(element).height)
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.heights[`${element.classList[0]}PrevHeight`]

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = null;
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

  .forward-enter-to {
    opacity: 0.75;
  }

  .forward-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .forward-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .backward-enter {
    opacity: 0.75;
  }

  .backward-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .backward-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .forward-enter-active, .forward-leave-active, .backward-enter-active, .backward-leave-active {
    transition-duration: 0.2s;
    transition-property: height, opacity, transform;
    transition-timing-function: ease;
  }

  .question_text {
    display: flex;
    flex-flow: column nowrap;

    .questionHelpbutton {
      margin-top:1rem;
      margin-bottom:1rem;
      text-align: left;

      p, label, button {
        display:inline;
      }

      p {
        font-weight: bold;
        font-size: 1rem;
        color: #350e7e;
        margin-right: 1rem;
      }

      label {
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
    .button-complete {
      background-color:#350E7E;
      color:#FFFFFF;
      font-weight:bold;
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
  .questionHelpbutton {
    margin-top:0.1rem !important;
    margin-bottom:0.3rem !important;
  }
  .textareaWordCount{
    margin-top:0.1rem !important;
  }  
}

@media only screen and (min-width: 575px) {
  .questionHelpbutton p {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton label {
    font-size: 1.1rem !important;
  }
}

@media only screen and (min-width: 768px) {
  .questionHelpbutton p {
    font-size: 1.2rem !important;
  }

  .questionHelpbutton label {
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

  .questionHelpbutton p {
    font-size: 1.3rem !important;
  }
  
  .questionHelpbutton label {
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

  .questionHelpbutton p {
    font-size: 1.375rem !important;
  }
  
  .questionHelpbutton label {
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

  .questionHelpbutton p {
    font-size: 1.375rem !important;
  }

  .questionHelpbutton label {
    font-size: 1.3rem !important;
  }
}
</style>
