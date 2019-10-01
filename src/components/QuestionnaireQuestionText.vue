<template>
  <div class="question_text">
    <div class="questionHelpbutton">
      <p v-if="!custom">{{ $t(`message.${name}_title`) }}</p>
      <p v-else>{{`${questionnum + 1}. ${custom.title}`}}</p>
      <label v-if="!custom" tag="label" for="textarea">{{ $t(`message.question_base`) }}<b>{{ $t(`message.question_${name}`) }}</b></label>
      <label v-else for="textarea">{{custom.description}}</label>
      <button
        v-if="!custom || custom.help"
        class="btn help_button buttonHelp"
        @click.prevent
        v-b-popover.hover.focus.bottom="!custom ? $t(`message.help_text_${name}`) : custom.help"
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
    name: {
      type: String,
      required: true
    },
    custom: {
      default: undefined,
      validator(prop) {
        if (typeof prop !== "object" && prop !== undefined) return false
        if (typeof prop !== undefined && typeof prop.title !== "string") return false
        if (typeof prop !== undefined && typeof prop.description !== "string") return false
        if (typeof prop !== undefined && typeof prop.help !== "string") return false
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
    position: absolute;
    top: 3%;
    right: 1%;
    font-size: 1rem !important;
    padding: 0.5rem 1.8rem !important;
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
