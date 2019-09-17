<template>
  <div class="registermaindiv">
    <div class="container registerDiv">
      <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" id="registerLogo"/>
      <div id="registercontentDiv">
        <div id="space">
        </div>
        <div id="registerContent">
          <p id="registerMessage">{{ $t('message.registerText') }}</p>
          <div id="registerCredentials">
            <input type="email" id="email" name="loginname" v-bind:placeholder="$t('message.registerUsername')" required>
            <input type="password" id="password" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')" required>
            <input type="password" id="confirmpassword" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')" required>
            <button type="submit" class="btn registersubmitButton">{{ $t('message.submitRegister') }}</button>
          </div>
          <p class="info">{{ $t('message.registrationInfo') }}</p>
          <p id="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p>
        </div>
      </div>
    </div>
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
.registermaindiv{
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .registerDiv{
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
      
      #registerLogo{
        width: 100%;
      }

    #registercontentDiv{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-bottom:1rem;
    
      #space{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }

      #registerContent{
        display: flex;
        flex-direction: column;
        margin-top:1.8rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:1rem;
        }

        #registerMessage{
          font-size:1.6rem;
        }

        #registerCredentials{
          display:flex;
          flex-direction:column;
          width:100%;
          padding:1rem;

          .registersubmitButton{
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

        #backtologinPage{
          color:#350E7E;
          margin-bottom:1rem;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  #registerLogo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  #registercontentDiv {
    width:30rem !important;
  }
}
</style>