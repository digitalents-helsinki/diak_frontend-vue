<template>
  <div class="home">
    <div class="container">
      <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
      <h1>{{ $t('message.welcome')}}</h1>
      <div class="text-container">
        <div>
          <img src="../images/diak-meter.svg" alt="" />
          <p>{{ $t('message.help_text_1') }}</p>
        </div>
        <div>
          <img src="../images/DiakThumbs.svg" alt="" />
          <p>{{ $t('message.help_text_2') }}</p>
        </div>
        <div>
          <img src="../images/diak-balance.svg" alt="" />
          <p>{{ $t('message.help_text_3') }}</p>
        </div>
        <button @click="moveQuestionnaire" class="btn btn-primary">{{ $t('message.begin') }}</button>
      </div>
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
  background-color: #80bfff;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  .container {
    display: flex;
    flex-flow: column nowrap;
    background-color: white;
    height: 90%;
    padding-bottom: 5vh;
    align-items: center;
    text-align: center;

    img {
      height: 70px;
    }

    h1 {
      font-size: 16px;
      font-weight: 700;
      color: #350E7E;
      width: 60vw;
      margin-bottom: 2rem;
    }

    .text-container {
      background-color: #F7F6F6;
      padding: 2rem;
      border-radius: 4px;
      display: flex;
      flex-flow: column nowrap;

      div {
        display: flex;
        flex-flow: row nowrap;

        img {
          height: 25px;
          flex-basis: 20%;
        }

        p {
          font-size: 14px;
          margin-left: 2rem;
          text-align: start;
          flex-basis: 80%;
        }
      }

      button {
        margin-top: 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 5px gray;
        line-height: 2;
        width: 8rem;
        align-self: center;
        background-color: #350E7E;
      }
    }
  }
}

</style>
