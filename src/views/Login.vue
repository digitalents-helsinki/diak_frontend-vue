<template>
  <div class="loginmaindiv">
    <div class="container loginDiv">
      <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" id="loginLogo"/>
      <div id="logincontentDiv">
        <div id="space">
        </div>
        <div id="loginContent">
          <p id="loginMessage">{{ $t('message.loginText') }}</p>
          <div id="loginCredentials">
            <input type="email" id="email" name="loginname" v-bind:placeholder="$t('message.usernamePlaceholder')" required>
            <input type="password" id="password" name="loginpassword" v-bind:placeholder="$t('message.passwordPlaceholder')" required>
            <button type="submit" class="btn submitButton">{{ $t('message.formsubmitButton') }}</button>
          </div>
          <div id="registerandPassword">
              <p id="changePassword" @click="handlePasswordClick">{{ $t('message.newPassword') }}</p>
              <p id="registeration" @click="handleRegisterClick">{{ $t('message.registerionLink') }}</p>
          </div>
          <p class="otherWay">{{ $t('message.loginwithother') }}</p>
          <div id="loginOtherway">
            <button class="btn loginFacebookButton"><font-awesome-icon :icon="['fab', 'facebook']" style="font-size:1.6rem; margin-right:0.6rem;"/>Facebook</button>
            <button class="btn loginGoogleButton" @click="handleSignIn"><font-awesome-icon :icon="['fab', 'google']" style="font-size:1.6rem; margin-right:0.6rem;"/>Google</button>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--<div class="login">
  <button class="btn" @click="handleSignIn">Kirjaudu sisään</button>
</div>-->
</template>
<script>
import axios from 'axios'

export default {
  name: 'login',
  methods: {
    handleSignIn() {
      this.$gAuth
        .signIn()
        .then(gUser => {
          this.$router.push({ name: 'questionnaire', params: { user: gUser.w3.ig}})
        })
    },
    handlePasswordClick() {
      this.$router.push({ name: 'password'})
    },
    handleRegisterClick() {
      this.$router.push({ name: 'registration'})
    }
  }
}

</script>
<style lang="scss" scoped>
.loginmaindiv{
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .loginDiv{
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
      
      #loginLogo{
        width: 100%;
      }

    #logincontentDiv{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
    
      #space{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }

      #loginContent{
        display: flex;
        flex-direction: column;
        margin-top:1.8rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:1rem;
        }

        #loginMessage{
          font-size:1.6rem;
        }

        #loginCredentials{
          display:flex;
          flex-direction:column;
          width:100%;
          padding:1rem;

          .submitButton{
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

        #registerandPassword{
          display:flex;
          flex-direction:row;
          justify-content: center;
          color:#350E7E;
          margin-top:1rem;

          #changePassword{
            margin-right:1rem;
          }
        }
        .otherWay{
          font-size:1rem;
        }
        #loginOtherway{
          display:flex;
          flex-direction:row;
          justify-content:space-around;
          margin-bottom:2rem;

          .loginGoogleButton{
            background-color: #F4B400;
            color: #FFFFFF;
            border-radius: 5px;
            box-shadow: 0 5px 5px gray;
            padding:0.6rem 1rem;
            font-weight:bold;
          }

          .loginFacebookButton{
            background-color: #3b5998;
            color: #FFFFFF;
            border-radius: 5px;
            box-shadow: 0 5px 5px gray;
            padding:0.6rem 1rem;
            font-weight:bold;
          } 
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  #loginLogo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  #logincontentDiv {
    width:30rem !important;
  }
}
</style>