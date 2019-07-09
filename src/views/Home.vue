<template>
  <div class="home">
    <h1>{{ $t('message.welcome')}}</h1>
    <div class="container">
      <button @click="moveQuestionnaire" class="btn btn-primary">{{ $t('message.begin') }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    moveQuestionnaire() {
      this.$router.push({ path: '/questionnaire/'})
    }
  }
}
</script>
<style lang="scss" scoped>

.home {
  background: linear-gradient(to right, #0078f0, #80bfff);
  height: 100vh;
  padding-bottom: 5vh;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: white;
    padding-left: 5vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
  }

  .container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    background-color: white;
    height: 80%;
    padding-bottom: 5vh;
    border-radius: 15px;

    button {
      width: 8rem;
      border-radius: 50px;
    }
  }
}

</style>
