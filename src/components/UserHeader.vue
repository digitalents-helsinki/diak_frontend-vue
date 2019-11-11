<template>
  <div class="container-fluid" id="questionnaire-main">
    <div class="questionnaire-top">
      <div id="logodiv">
        <img :id="questionnaire ? 'logotopQuestionnaire' : 'logotop'" src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" />
      </div>
      <button v-if="questionnaire" @click="$emit('toggleModal', 'help')" class="btn buttonOhjeet">Ohjeet</button>
    </div>
    <div v-if="questionnaire" class="questionnaire-bottom">
      <span v-if="this.$store.state.auth.loggedIn">Autentikoitu | {{surveyName}}</span>
      <span v-else>Anonyymi | {{surveyName}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserHeader',
  props: {
    surveyName: {
      type: String,
      default: ''
    },
    questionnaire: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>

#questionnaire-main {
  background-color: #80cde6;
  width:100%;
  display: flex;
  flex-direction:column;
  font-size: 1rem;
  height:8rem;
  overflow: hidden;
  margin-bottom: 0.6rem;

  .questionnaire-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:1rem;
    
    #logodiv {
      #logotopQuestionnaire {
        width:100%;
        height: 60px;
      }
      #logotop {
        width: 100%;
        height: 90px;
      }
    }

    .buttonOhjeet {
      border-radius: 8px 1px;
      background-color: #353535;
      color: #FFFFFF;
      margin-right:0.1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;

      &:hover {
        background-color: lighten(#353535, 5%);
      }
    }
  }
  
  .questionnaire-bottom {
    display: flex;
    justify-content:flex-end;
    margin-top:0.1rem;
    margin-right:0.6rem;
    font-weight:bold;

    span {
      color: #353535;
      font-size: 1rem;
      position: absolute;
      
    }
  }
}

.help-button {
  color: white;
  align-self: flex-start;
  padding-bottom: 5vh;
  padding-left: 5vh;
}

@media only screen and (min-width: 320px) and (max-width: 360px){
  #questionnaire-main {
    margin-bottom: 0.1rem !important;
  }
}

@media only screen and (min-width: 575px) {
  #questionnaire-main {
    margin-bottom: 1rem !important;
  }
}

@media only screen and (min-width: 768px) {
  #questionnaire-main {
    height: 8rem !important;
  }

  .questionnaire-top > img {
    height: 70px !important;
  }

  .help-container {
    height: 60vh !important; 
    width: 60vw !important;
  }
}

@media only screen and (min-width: 1025px) {
  #questionnaire-main {
    height: 8rem !important;
  }
  
  .questionnaire-top {
    display: flex !important;
    justify-content: center !important;
  }

  .questionnaire-bottom{
    margin-top:0 !important;
  }

  .buttonOhjeet {
    position: absolute;
    top: 3%;
    right: 1%;
    font-size: 1rem !important;
    padding: 0.5rem 1.8rem !important;
  }

  .help_button {
    font-size: 1.3rem !important;
  }
}
</style>