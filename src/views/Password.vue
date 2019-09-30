<template>
  <div class="passwordmaindiv">
    <b-container>
      <div class="passwordDiv">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="passwordLogo"/>
        <div class="passwordcontentDiv">
          <div class="spacePassword">
          </div>
          <div class="passwordContent">
            <p class="passwordMessage">{{ $t('message.passwordText') }}</p>
            <div class="passwordCredentials">
              <b-form>
                <b-form-group id="passwordtype">
                  <b-form-input type="password" id="password" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')" required>
                  </b-form-input>
                </b-form-group>
                <b-form-group id="passwordretype">
                  <b-form-input type="password" id="confirmpassword" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')" required>
                  </b-form-input>
                </b-form-group>
                <b-button type="submit" class="submitPassword">{{ $t('message.submitPassword') }}</b-button>
              </b-form>
            </div>
            <p class="info">{{ $t('message.passwordInfo') }}</p>
            <p class="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'registration',
  methods: {
    handleSignIn() {
      this.$gAuth
        .signIn()
        .then(gUser => {
          this.$router.push({ name: 'questionnaire', params: { user: gUser.w3.ig}})
        })
    },
    handleLoginClick() {
      this.$router.push({ name: 'login'})
    }
  }
}

</script>
<style lang="scss" scoped>
.passwordmaindiv{
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .passwordDiv{
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
      
      .passwordLogo{
        width: 100%;
      }

    .passwordcontentDiv{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
    
      .spacePassword{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }

      .passwordContent{
        display: flex;
        flex-direction: column;
        margin-top:1.8rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:1rem;
        }

        .passwordMessage{
          font-size:1.6rem;
        }

        .passwordCredentials{
          display:flex;
          flex-direction:column;
          width:100%;
          padding:1rem;

          .submitPassword{
            background-color: #350E7E;
            font-weight:bold;
            color:#FFFFFF;
            border-radius: 50px;
            box-shadow: 0 5px 5px gray;
            line-height: 2;
            align-self: center;
            padding: 0.5rem 3rem;
            font-size: 1rem;
          }
        }

        .info{
          font-size:1rem;
        }

        .backtologinPage{
          color:#350E7E;
          margin-bottom:1rem;
          font-size:1.1rem;
          cursor: pointer; 
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  .passwordLogo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  .passwordcontentDiv {
    width:30rem !important;
  }
}
</style>