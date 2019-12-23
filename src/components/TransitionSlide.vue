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
  name: 'TransitionSlide',
  props: {
    referencenum: {
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
      latestreferencenum: 0
    }
  },
  watch: {
    referencenum(_, oldVal) {
      this.latestreferencenum = oldVal
    }
  },
  computed: {
    slide() {
      if (this.direction === "horizontal") return this.latestreferencenum < this.referencenum ? "forward" : "backward"
      else return this.latestreferencenum < this.referencenum ? "upward" : "downward"
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

  .forward-enter, .backward-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .forward-leave-to, .backward-enter {
    transform: translateX(-100%);
    opacity: 0;
  }

  .upward-enter, .downward-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .upward-enter-to, .downward-enter {
    transform: translateY(-100%);
    opacity: 0;
  }

  .forward, .backward, .upward, .downward {
    &-enter-active, &-leave-active {
      transition-duration: 0.175s;
      transition-property: height, opacity, transform;
      transition-timing-function: ease;
    }
    &-enter-to {
      opacity: 0.75;
    }
  }

</style>
