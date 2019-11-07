<template>
<LogoBox size="large">
  <template v-slot:topbar>
    {{ $t('message.home') }}
  </template>
  <template v-slot:content>
    <div class="text-container">
      <LangMenu />
      <div class="text-container-content">
        <img src="../images/meter.svg" alt="" />
        <p>{{ $t('message.help_text_1') }}</p>
      </div>
      <div class="text-container-content">
        <img src="../images/thumbs.svg" alt="" />
        <p>{{ $t('message.help_text_2') }}</p>
      </div>
      <div class="text-container-content">
        <img src="../images/balance.svg" alt="" />
        <p>{{ $t('message.help_text_3') }}</p>
      </div>
      <div class="text-container-content">
        <img src="../images/null.svg" alt="" />
        <p>{{ $t('message.help_text_4') }}</p>
      </div>
    </div>
    <button @click.prevent="$emit('moveToQuestionnaire')" class="btn">{{ $t('message.begin') }}</button>
  </template>
</LogoBox>
</template>
<script>
import LogoBox from '@/components/LogoBox.vue'
import LangMenu from '@/components/Languages.vue';

export default {
  name: 'questionnaireHelp',
  components:{
    LogoBox,
    LangMenu
  }
}
</script>
<style lang="scss" scoped>
    .text-container {
      display: flex;
      flex-direction: column;
      font-size:1rem;

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
          margin-top: 0;
          margin-bottom: 0;
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
        margin-bottom: 1rem;
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
    .logoProfile{
      width:40rem !important;
    }
  }
</style>
