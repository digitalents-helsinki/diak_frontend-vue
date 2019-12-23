<template>
  <LogoBox>
    <template v-slot:content>
      <b-alert show variant="danger" class="error">{{ $t('message.errorPage') + dots }}</b-alert>
    </template>
  </LogoBox>
</template>
<script>
import LogoBox from '@/components/LogoBox'

export default {
  name: 'error',
  components: {
    LogoBox
  },
  data() {
    return {
      dots: '.'
    }
  },
  methods: {
    dotDotDot() {
      if (this.dots.length < 3) {
        this.dots += '.'
      } else {
        this.dots = ''
      }
      setTimeout(this.dotDotDot, 300)
    }
  },
  created() {
    this.dotDotDot()
    setTimeout(() => this.$router.push('/'), 3000)
  }
}
</script>
<style lang="scss" scoped>
.error {
  border-radius: 0 0 15px 15px;
  margin-bottom: 0;
  text-align: left;
  padding-left: 27%;
}
</style>