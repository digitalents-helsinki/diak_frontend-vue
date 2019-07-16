<template>
  <div class="home">
    <div class="container-fluid" id="home-top">
    </div>
    <div class="container">
      <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
      <h1>{{ $t('message.welcome')}}</h1>
      <div class="text-container">
        <div class="text-container-content">
          <img src="../images/diak-meter.svg" alt="" />
          <p>{{ $t('message.help_text_1') }}</p>
        </div>
        <div class="text-container-content">
          <img src="../images/DiakThumbs.svg" alt="" />
          <p>{{ $t('message.help_text_2') }}</p>
        </div>
        <div class="text-container-content">
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
  background-color: #FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  overflow: hidden;

  #home-top{
    background-color:#80CDE6;
    height:16vh;
    margin-bottom:1rem;
  }

  .container {
    display: flex;
    flex-flow: column nowrap;
    background-color: white;
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
      box-shadow: 0 2px 2px lightgray; 

   
      div {
        display: flex;
        flex-flow: row nowrap;
        margin:1rem;

        img {
          height: 25px;
          flex-basis: 20%;
        }

        p {
          font-size: 14px;
          margin-left: 2rem;
          text-align: start;
          flex-basis: 80%;
          font-weight: bold;
          color:#353535;
          
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
