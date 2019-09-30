<template>
  <div class="maindivProfile">
    <div class="container-fluid userprofileTop">
      <div class="logoLocation"><img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="logoHere"/></div>
    </div>
    <div v-if="!hasInfo">
      <personal-info />
    </div>
    <div v-if="hasInfo" class="container profilecontentUser">
      <div id="profiledivUser">
          <p id="paragraphTop"> {{ $t('message.profileInstruction') }}</p> 
          <div id="contentforUser">
            <div id="previousSurvies">
              <div id="headingPrevious">
                <p id="paragraphPrevious">{{ $t('message.finishedHeading') }}</p>
                <b-button v-b-toggle.collapse-vastatut class="textarea-collapse pointer btn-secondary"><font-awesome-icon icon="angle-down"/></b-button>
              </div>
                <b-collapse id="collapse-vastatut">
                </b-collapse>
            </div>
            <div class="currentSurvies">
              <div class="headingCurrent">
                <p class="paragraphCurrent">{{ $t('message.ongoingHeading') }}</p>
                <b-button v-b-toggle.collapse-kysely class="textarea-collapse pointer btn-secondary"><font-awesome-icon icon="angle-down"/></b-button>
              </div>
              <b-collapse id="collapse-kysely">
              </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PersonalInfo from '../components/PersonalInfo.vue'
import store from '@/store'

export default {
  name: 'user',
  data() {
    return {
      isLogged: false,
      hasInfo: true,
      user: null
    }
  },
  methods: {
    async getUser() {
      this.$data.user = await axios.get(process.env.VUE_APP_BACKEND + "/user/" + store.state.auth.userId)
    },
    getUserSurveys() {
      
    }
  },
  components: {
    PersonalInfo
  },
  mounted() {
    this.getUser()
  }
}
</script>
<style lang="scss" scoped>
.maindivProfile{
  background-color: #FFFFFF;
  width:100%;
  display: flex;
  flex-flow: column nowrap;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
  
  .userprofileTop{
    background-color: #80cde6;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
    height:7rem;
    
    .logoLocation{
      .logoHere{
        width:100%;
        height: 80px;
      }
    }
  }

  .profilecontentUser{

    .profiledivUser{
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-top: 1.8rem;
      margin-bottom:1rem;
            
      .paragraphTop{
        font-size:1.6rem;
        margin:1rem 0;
        text-align:center;
      }

      .contentforUser{
        background-color: #FFFFFF;
        display:flex;
        flex-direction:column;
        width:100%;
        padding:1rem;
        margin-bottom:1rem;

        .previousSurvies{
          background-color: #F9F9FB;
          margin:1rem 0;

          .headingPrevious{
            background-color:#350D7E;
            display:flex;
            flex-direction:row;
            justify-content:space-around;
            
            .paragraphPrevious{
              color:#FFFFFF;
              font-size:1.1rem;
              font-weight:bold;
              padding-top:0.1rem;
            }
          }
        }
        .currentSurvies{
          background-color: #F9F9FB;
          margin:1rem 0;

          .headingCurrent{
            background-color:#A1318A;
            display:flex;
            flex-direction:row;
            justify-content:space-around;

            .paragraphCurrent{
              color:#FFFFFF;
              font-size:1.1rem;
              font-weight:bold;
              padding-top:0.1rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) { 
  .maindivProfile{
    height:100%;
  }

  .profilecontentUser{
    display:flex;
    flex-direction:column;
    align-items:center;
  }

  .profiledivUser {
    width:30rem !important;
  
  }
}
</style>