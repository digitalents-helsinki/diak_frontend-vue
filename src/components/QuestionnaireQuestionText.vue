<template>
    <div class="question_text">
      <div class="questionHelpbutton">
        <p v-if="!question.custom" v-html="$t(`message.${question.name}_title`)"></p>
        <p v-else>{{`${questionnum + 1}. ${question.custom.title}`}}</p>
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

@media only screen and (min-width: 320px) and (max-width: 360px){
  .questionHelpbutton {
    margin-top:0.1rem !important;
    margin-bottom:0.3rem !important;
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
}

@media only screen and (min-width: 1025px) {
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
