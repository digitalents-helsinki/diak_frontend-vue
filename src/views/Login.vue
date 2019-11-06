<template>
  <div class="loginPage">
    <b-container>
      <div class="pageWrapper">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="loginLogo"/>
        <div class="logincontentWrapper">
          <div class="empty">
          </div>
          <LangMenu/>
          <div class="loginTitle">
            <p class="loginMessage">{{ $t('message.loginText') }}</p>
            <div class="loginForm">
            <b-form>
              <b-form-group class="loginfield">
                <b-form-input type="email" autocomplete="email" id="email" v-model="login.email" :state="loginvalidation.email" name="loginname" v-bind:placeholder="$t('message.usernamePlaceholder')">
                </b-form-input>
                <b-form-invalid-feedback :state="loginvalidation.email" class="emailFeedback">
                  {{ $t('message.emailInput') }}
                </b-form-invalid-feedback>
              </b-form-group>
                <b-form-group class="passwordfield">
                  <b-form-input type="password" autocomplete="current-password" id="password" v-model="login.password" :state="loginvalidation.password" name="loginpassword" v-bind:placeholder="$t('message.passwordPlaceholder')">
                  </b-form-input>
                  <b-form-invalid-feedback :state="loginvalidation.password" class="passwordFeedback">
                  {{ $t('message.passwordInput') }}
                </b-form-invalid-feedback>
                </b-form-group>
              <b-button type="submit" @click.prevent="handleLogin" class="loginsubmitButton">{{ $t('message.formsubmitButton') }}</b-button>
            <b-form-invalid-feedback :state="loginvalidation.invalidcredentials" class="loginFeedback">
                  {{ $t('message.invalidLogin') }}
                </b-form-invalid-feedback>
            </b-form>
          </div>
            <div class="registerandPassword">
                <p class="changePassword" @click="handlePasswordClick">{{ $t('message.newPassword') }}</p>
                <p class="registration" @click="handleRegisterClick">{{ $t('message.registrationLink') }}</p>
            </div>
            <p class="otherWay">{{ $t('message.loginwithother') }}</p>
            <div class="loginOtherway">
              <b-button class="loginFacebookButton"><font-awesome-icon :icon="['fab', 'facebook']" style="font-size:1.6rem; margin-right:0.6rem;"/>Facebook</b-button>
              <b-button class="loginGoogleButton" @click="handleGSignIn"><font-awesome-icon :icon="['fab', 'google']" style="font-size:1.6rem; margin-right:0.6rem;"/>Google</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
<!--<div class="login">
  <button class="btn" @click="handleSignIn">Kirjaudu sisään</button>
</div>-->
</template>
<script>
import axios from 'axios'
import store from '@/store'
import LangMenu from '@/components/Languages.vue';

export default {
  name: 'login',
  components:{
    LangMenu
  },
  data() {
    return {
      login: {
        email: null,
        password: null
      },
      loginvalidation: {
        email: null,
        password: null,
        invalidcredentials: null
      },
      error: false
    }
  },
  methods: {
    handleLogin() {
      this.loginvalidation.email = null
      if (!this.login.email) {
        this.loginvalidation.email = false
        return
      }
      this.loginvalidation.password = null
      if (!this.login.password) {
        this.loginvalidation.password = false
        return
      }
      const data = JSON.stringify({
        email: this.login.email,
        password: this.login.password
      })
      axios
        .post(process.env.VUE_APP_BACKEND + "/signin", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.role === 'admin') {
              store.state.auth.loggedIn = true
              store.state.auth.role = 'admin'
              store.state.auth.accessToken = res.data.token
              this.$router.push({ name: 'admin' })
            } else {
              store.state.auth.loggedIn = true
              store.state.auth.role = 'user'
              store.state.auth.accessToken = res.data.token
              store.state.auth.userId = res.data.userId
              this.$router.push({ name: 'user' })
            }
          } else { 
            this.$data.error = true
            this.loginvalidation.invalidcredentials = false
          }
        })
    },
    handleGSignIn() {
      this.$gAuth
        .signIn()
        .then(gUser => {
          store.state.auth.loggedIn = true
          this.$router.push({ name: 'user' })
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
.loginPage{
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .pageWrapper{
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    align-items: center;
    text-align: center;
    margin-top: 0.1rem;
      
      .loginLogo{
        width: 100%;
      }

    .logincontentWrapper{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-bottom:1rem;
    
      .empty{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }
      
      .loginTitle{
        display: flex;
        flex-direction: column;
        margin-top:0.1rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:0.1rem;
        }

        .loginMessage{
          font-size:1.6rem;
        }

        .loginForm{
          display:flex;
          flex-direction:column;
          width:100%;
          padding:1rem;

          .emailFeedback{
            font-size:1rem;
          }

          .passwordFeedback{
            font-size:1rem;
          }

          .loginFeedback{
            font-size:1rem;
            margin-top:1rem;
            font-weight:bold;
          }

          .loginsubmitButton{
            background-color: #350E7E;
            color:#FFFFFF;
            font-size: 1rem;
            font-weight:bold;
            padding-top: 0.5rem;
            padding-bottom:0.5rem;
            border: none;
            border-radius: 50px;
            box-shadow: 0 5px 5px gray;
            align-self: center;
            line-height:2;
            width:16rem;
          }
        }

        .registerandPassword{
          display:flex;
          flex-direction:row;
          justify-content: center;
          color:#350E7E;
          margin-top:1rem;

          .changePassword{
            margin-right:1rem;
            font-size:1.1rem;
            cursor: pointer; 
          }

          .registration{
            font-size:1.1rem;
            cursor: pointer; 
          }
        }

        .otherWay{
          font-size:1rem;
          padding:0.1rem;
        }
        
        .loginOtherway{
          display:flex;
          flex-direction:row;
          justify-content:space-around;
          margin-bottom:2rem;

        .loginFacebookButton{
            background-color: #3b5998;
            color: #FFFFFF;
            font-size: 1rem;
            font-weight:bold;
            padding:0.6rem 1rem;
            border: none;
            border-radius: 5px;
            box-shadow: 0 5px 5px gray;
          }

          .loginGoogleButton{
            background-color: #F4B400;
            color: #FFFFFF;
            font-size: 1rem;
            font-weight:bold;
            padding:0.6rem 1.1rem;
            border: none;
            border-radius: 5px;
            box-shadow: 0 5px 5px gray;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  .pageWrapper{
    margin-top:1.8rem !important;
  }
  .loginLogo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  .logincontentWrapper {
    width:30rem !important;
  }
}
</style>