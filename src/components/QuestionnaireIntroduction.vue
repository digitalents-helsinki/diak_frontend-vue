<template>
  <LogoBox size="large">
    <template v-slot:topbar>
      {{ $t('message.home') }}
    </template>
    <template v-slot:content>
      <div class="text-container">
        <div class="survey-name-container">
          <LangMenu class="language"/>
          <h3 class="survey-name">{{surveyName}}</h3>
        </div>
        <p class="introduction-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
  name: 'questionnaireIntroduction',
  components:{
    LogoBox,
    LangMenu
  },
  props: {
    surveyName: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
    .text-container {
      display: flex;
      flex-direction: column;
      font-size:1rem;
      padding-top: 1rem;

      .survey-name-container {
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: 1fr max-content;

        .survey-name {
          font-style: italic;
        }

        .language {
          width: max-content;
          justify-self: flex-end;
        }
      }

      .introduction-text {
        margin: 0 1rem 2rem 1rem;
      }

      .text-container-content {
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
          margin-left: 0.5rem;
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

        &:hover {
          color: #FFFFFF;
        }
      }
    

@media screen and (min-width: 575px) { 
  .text-container p {
    font-size: 1rem !important;
  }
  .survey-name-container {
    grid-auto-flow: column !important;
    grid-template-columns: 1fr max-content;
    grid-template-rows: unset !important;

    .survey-name {
      order: -1;
    }
  }
  button {
    padding:1rem 7rem !important;
    font-size:1.1rem !important;
  } 
}
</style>
