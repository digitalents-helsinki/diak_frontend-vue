<template>
  <div class="home">
    <h1>{{ $t('message.welcome')}}</h1>
    <div class="container">
      <p>{{ $t('message.help_text_1') }}</p>
      <p>{{ $t('message.help_text_2') }}</p>
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
  height: 100%;
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
    justify-content: space-between;
    background-color: white;
    height: 80%;
    padding-bottom: 5vh;
    border-radius: 15px;

    p:nth-of-type(1) {
      padding-top: 5rem;
      padding-bottom: 5rem;
      border-bottom: 1px solid lightgray;
    }

    button {
      border-radius: 50px;
      box-shadow: 0 5px 5px gray;
      line-height: 2;
      width: 8rem;
      align-self: flex-end;
    }
  }
}

</style>
