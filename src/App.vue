<template>
  <div id="app">
    <main :style="appStyle">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      vh: 0
    }
  },
  computed: {
    appStyle() {
      return {
        height: `calc(${this.$data.vh} * 100px`
      }
    }
  },
  created() {
    window.addEventListener('resize', () => {
      this.$data.vh = window.innerHeight * 0.01
    })
  },

  mounted() {
    this.$data.vh = window.innerHeight * 0.01
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
</style>
