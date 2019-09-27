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
    questionnum: {
      type: Number,
      required: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (prop) => ["horizontal", "vertical"].includes(prop)
    }
  },
  data() {
    return {
      prevHeight: null,
      latestquestionnum: 0
    }
  },
  watch: {
    questionnum(_, oldVal) {
      this.latestquestionnum = oldVal
    }
  },
  computed: {
    slide() {
      if (this.direction === "horizontal") return this.latestquestionnum < this.questionnum ? "forward" : "backward"
      else if (this.direction === "vertical") return this.latestquestionnum < this.questionnum ? "upward" : "downward"
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

  .forward-enter-to, .backward-enter, .upward-enter, .downward-enter {
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
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .backward-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .upward-enter {
    transform: translateY(100%);
    opacity: 0;
  }

  .upward-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }

  .downward-enter {
    transform: translateY(-100%);
  }

  .downward-leave-to {
    transform: translateY(100%)
  }

  .forward-enter-active, .forward-leave-active, 
  .backward-enter-active, .backward-leave-active, 
  .upward-enter-active, .upward-leave-active, 
  .downward-enter-active, .downward-leave-active {
    transition-duration: 0.175s;
    transition-property: height, opacity, transform;
    transition-timing-function: ease;
  }

</style>
