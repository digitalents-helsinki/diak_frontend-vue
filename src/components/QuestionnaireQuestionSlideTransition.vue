<template>
  <transition 
    v-bind:name="slide" 
    mode="out-in"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter"
  >
  <slot></slot>
  </transition>
</template>
<script>

export default {
  name: 'QuestionnaireQuestionSlideTransition',
  props: {
    navigation: {
      type: Object,
      required: true,
      validator: function(prop) {
        if (typeof prop.questionnum !== "number") return false
        if (typeof prop.latestquestionnum !== "number") return false
        if (typeof prop.questionamount !== "number") return false
        return true
      }
    }
  },
  data() {
    return {
      prevHeight: null
    }
  },
  computed: {
    slide: function() {
      return this.navigation.latestquestionnum < this.navigation.questionnum ? "forward" : "backward"
    }
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight

      setTimeout(() => element.style.height = height);
    },
    afterEnter(element) {
      element.style.height = null;
    }
  }
}
</script>
<style lang="scss" scoped>

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

</style>
