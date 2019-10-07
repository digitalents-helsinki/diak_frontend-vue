<template>
  <div class="maindivProfile">
      <div class="userprofileTop">
        <div class="logoLocation"><img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="logoHere"/></div>
      </div>
      <!--<div class="usernameLogout">
        <div class="user-name">
            <p class="namelocation"> {{ $t('message.userNametesting') }}</p>
        </div>
        <div class="logoutcontent">
            <button class="btn userlogoutButton">{{ $t('message.logoutButtontranslate') }}</button>
        </div>
      </div>-->
    <b-container>
      <div class="profilecontentUser">
        <div class="profiledivUser">
            <p class="paragraphTop"> {{ $t('message.profileInstruction') }}</p> 
            <div class="contentforUser">
              <div class="previousSurvies">
                <div class="headingPrevious">
                  <p class="paragraphPrevious">{{ $t('message.finishedHeading') }}</p>
                  <b-button v-b-toggle.collapse-vastatut class="textarea-collapse btn-dark"><font-awesome-icon icon="angle-down"/></b-button>
                </div>
                  <b-collapse id="collapse-vastatut">
                  </b-collapse>
              </div>
              <div class="currentSurvies">
                <div class="headingCurrent">
                  <p class="paragraphCurrent">{{ $t('message.ongoingHeading') }}</p>
                  <b-button v-b-toggle.collapse-kysely class="textarea-collapse btn-dark"><font-awesome-icon icon="angle-down"/></b-button>
                </div>
                <b-collapse id="collapse-kysely">
                </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </b-container>
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
  background-color:#F9F9FB;
  width:100%;
  display: flex;
  flex-flow: column nowrap;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;
  
  .userprofileTop{
    background-color: #35CDE6;
    display:flex;
    flex-direction:row;
    justify-content:center;
    width:100%;
    height:7rem;
    padding:1rem;

    .logoLocation{
      .logoHere{
        width:100%;
        height: 80px;
      }
    }
  }
  /*.usernameLogout{
    background-color:#FFFFFF;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    padding:1rem;

      .user-name{
        margin-top:1rem;

        .namelocation{
          font-size:1.1rem;
          color:#000000;
          font-weight:bold;
        }
      }
      
      .logoutcontent{
        margin:1rem;

        .userlogoutButton{
          background-color: #A1318A;
          color: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 5px 5px gray;
          width:10rem;
          height:2.5rem;
          font-weight:bold;
          margin-left:0.2rem;
        }
      }
    }*/

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

  .usernameLogout{
    display:flex !important;
    flex-direction:row !important;
    justify-content:flex-end !important;
    height:5rem;
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