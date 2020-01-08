<template>
  <LogoBox size="small">
    <template v-slot:content>
      <LangMenu />
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
              <b-form-input type="password" autocomplete="current-password" id="password" v-model="login.password" :state="loginvalidation.passwordlength" name="loginpassword" v-bind:placeholder="$t('message.passwordPlaceholder')">
              </b-form-input>
              <b-form-invalid-feedback :state="loginvalidation.passwordlength" class="passwordFeedback">
                {{ $t('message.inputLength') }}
              </b-form-invalid-feedback>
            </b-form-group>
          <b-button v-if="!loggingIn" type="submit" @click.prevent="handleLogin" class="loginsubmitButton">{{ $t('message.formsubmitButton') }}</b-button>
          <b-spinner style="color: #350E7E;" v-else />
            <b-form-invalid-feedback :state="loginvalidation.invalidcredentials" class="loginFeedback">
              {{ $t('message.invalidLogin') }}
            </b-form-invalid-feedback>
            <b-form-invalid-feedback :state="loginvalidation.userDoesNotExist" class="loginFeedback">
              {{ $t('message.userDoesNotExist') }}
            </b-form-invalid-feedback>
          <p class="error" v-if="error">{{ error }}</p>
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
    </template>
  </LogoBox>
</template>
<script>
import axios from 'axios'
import LogoBox from '@/components/LogoBox.vue'
import LangMenu from '@/components/Languages.vue';

export default {
  name: 'login',
  components: {
    LogoBox,
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
        passwordlength: null,
        invalidcredentials: null,
        userDoesNotExist: null
      },
      loggingIn: null,
      error: null
    }
  },
  methods: {
    handleLogin() {
      Object.keys(this.loginvalidation).forEach(key => this.loginvalidation[key] = null)
      if (!this.login.email || !this.login.email.match(/.+@.+/)) this.loginvalidation.email = false
      if (!this.login.password || this.login.password.length < 8 || this.login.password.length > 128) this.loginvalidation.passwordlength = false
      this.error = null

      const data = JSON.stringify({
        email: this.login.email,
        password: this.login.password
      })
      
      if (Object.values(this.loginvalidation).every(value => value === null)) {
        this.loggingIn = true
        axios.post(process.env.VUE_APP_BACKEND + "/signin", data, {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            if (res.status === 200) {
              this.$store.commit('login', {
                loggedIn: true,
                role: res.data.role,
                accessToken: res.data.token,
                userId: res.data.userId,
                email: res.data.email
              })
              this.$store.commit('user/setAuthUserPersonalInfo', {
                name:res.data.name,
                post_number:res.data.post_number,
                phone_number:res.data.phone_number,
                age:res.data.age,
                gender:res.data.gender
              })
              if (this.$store.state.authentication.role === 'user') {
                this.$router.push({ name: 'user' })
              } else {
                this.$router.push({ name: 'admin' })
              }
            }
          }
        ).catch(err => {
          console.error(err)
          if (err.response.status === 401) this.loginvalidation.invalidcredentials = false
          else if (err.response.status === 404) this.loginvalidation.userDoesNotExist = false
          else if (err.response.data) this.error = err.response.data
          else this.error = err
        }).finally(() => this.loggingIn = null)
      }
    }, 
    handleGSignIn() {
      this.$gAuth
        .signIn()
        .then(gUser => {
          //store.state.authentication.loggedIn = true
          this.$router.push({ name: 'user' })
        })
    },
    handlePasswordClick() {
      this.$router.push({ name: 'recovery'})
    },
    handleRegisterClick() {
      this.$router.push({ name: 'registration'})
    }
  }
}

</script>
<style lang="scss" scoped>

    
      
      .loginTitle{
        display: flex;
        flex-direction: column;
        margin-top:0.1rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:0.1rem;
        }

        .loginMessage {
          align-self: center;
          font-size:1.6rem;
        }

        .loginForm{
          display:flex;
          flex-direction:column;
          width:100%;
          padding: 1rem;

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
            display: block;
            margin: 0 auto;
          }

          .error {
            margin: 1rem 0 0 0;
            font-size: 1rem;
            color: red;
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

        .otherWay {
          font-size:1rem;
          padding:0.1rem;
          align-self: center;
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
</style>