<template>
  <div class="home">
    <div class="container main">
      <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" id="logo" />
      <div class="textContainer">
        <div class="container-fluid" id="textContainer-top">
          <p class="welcomeMessage">{{ $t('message.home') }}</p>
        </div>
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
          <div class="text-container-content">
            <img src="../images/Diak-null.svg" alt="" />
            <p>{{ $t('message.help_text_4') }}</p>
          </div>
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
      this.$router.push({ path: '/questionnaire/testikysely'})
    }
  }
}
</script>
<style lang="scss" scoped>

p {
  margin-top: 0;
  margin-bottom: 0;
}

.home {
  background-color: #FFFFFF;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
  //overflow: hidden;

  .main {
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    text-align: center;
    margin-top: 1rem;

    #logo {
      width: 100%;
    }

    .textContainer{
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      height: 70vh;

      @media screen and (min-width: 1024px) {
        height: 60vh;
      }
        
      #textContainer-top{
        background-color:#80CDE6;
        color:#FFFFFF;
        padding: 0.5rem;
        
        .welcomeMessage {
          font-size:1.1rem;
          font-weight:bold;
        }
    }

    .text-container {
      background-color: #F7F6F6;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 2px lightgray;
      font-size:1rem;
      height: 100%;

      div {
        display: flex;
        flex-flow: row nowrap;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        flex: 1;
        align-items: center;

        &:first-child{
          margin-top: 1rem;
        }

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
    }
      button {
        margin-top: 1rem;
        border-radius: 50px;
        box-shadow: 0 5px 5px gray;
        line-height: 2;
        align-self: center;
        background-color: #350E7E;
        font-weight:bold;
        color:#FFFFFF;
        padding: 0.5rem 3rem;
        font-size: 1rem;
      }
    }
  }
}
@media screen and (min-width: 575px) { 

    .welcomeMessage {
      font-size: 1.1rem !important;
    }

    .text-container p {
      font-size: 1rem !important;
    }

    button {
     padding:1rem 7rem !important;
    font-size:1.1rem !important;
    } 
  }

  @media screen and (min-width: 768px) { 
    #logo{
      width:40rem !important;
      margin-bottom:1rem;
    }
  }
</style>
