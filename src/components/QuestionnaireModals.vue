<template>
  <transition name="fade">
    <div @click.self="$emit('toggleModal', null)" class="dim-background" v-show="modal">
      <div class="help-container" v-if="modal === 'help'">
        <p>{{ $t('message.help_text_1') }}</p>
        <p>{{ $t('message.help_text_2') }}</p>
      </div>
      <div class="cancel-container" v-if="modal === 'cancel'">
        <div>
          <button @click.prevent="$emit('saveUnfinishedAnswers')" class="btn btn-primary">{{ $t('message.cancel_save') }}</button>
        </div>
        <div>
          <button
            @click.prevent="$emit('toggleModal', null)"
            class="btn btn-primary"
          >{{ $t('message.cancel_discard') }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'QuestionnaireModal',
  props: {
    modal: {
      required: true,
      validator: (prop) => ['help', 'cancel', null].includes(prop)
    }
  }
}
</script>
<style lang="scss" scoped>

.fade {
  &-enter, &-leave-to {
    opacity: 0;
  }
  &-enter-active, &-leave-active {
    transition: opacity 0.2s ease;
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
    background-color: #FFFFFF;
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

@media only screen and (min-width: 768px) {
  .dim-background {
    text-align: center;
  }

  .help-container {
    height: 40vh !important; 
    width: 60vw !important;
  }
}

@media only screen and (min-width: 1400px) {
  .cancel-container {
    width: 30vw !important;
  }
}

</style>