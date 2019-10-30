<template>
  <div class="registerationPage">
    <b-container>
      <div class="registerationLogo">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="logo"/>
        <div class="contentWrapper">
          <div class="empty">
          </div>
          <div class="registerationTitle">
            <p class="title">{{ $t('message.registerText') }}</p>
            <div class="registerationForm">
              <b-form>
                <b-form-group id="namefield">
                  <b-form-input type="email" v-model="registration.email" :state="registervalidation.email" id="email" name="loginname" v-bind:placeholder="$t('message.registerUsername')">
                  </b-form-input>
                  <b-form-invalid-feedback :state="registervalidation.email" class="emailFeedback">
                  {{ $t('message.emailInput') }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="registervalidation.emailpattern" class="emailFeedback">
                  {{ $t('message.patternInput') }}
                  </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group id="passwordfield">
                  <b-form-input type="password" id="password" v-model="registration.password" :state="registervalidation.password" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')">
                  </b-form-input>
                  <b-form-invalid-feedback :state="registervalidation.password.required" class="passwordFeedback">
                  {{ $t('message.passwordInput') }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="registervalidation.password.passwordlength" class="passwordFeedback">
                  {{ $t('message.inputLength') }}
                   </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="retypefield">
                  <b-form-input type="password" id="confirmpassword" v-model="registration.retypepassword" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')">
                  </b-form-input>
                  <b-form-invalid-feedback :state="registervalidation.retypepassword.required" class="passwordFeedback">
                  {{ $t('message.passwordInput') }}
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback :state="registervalidation.confirmpassword" class="passwordFeedback">
                  {{ $t('message.passwordconfirmInput') }}
                   </b-form-invalid-feedback>
                </b-form-group>
                <b-button type="submit" @click.prevent="handleRegistration" class="btn registersubmitButton">{{ $t('message.submitRegister') }}</b-button>
              </b-form>
            </div>
            <p class="registerinfo">{{ $t('message.registrationInfo') }}</p>
            <p class="passwordinfo">{{ $t('message.minimumLength') }}</p>
            <div class="backtologindiv"><p class="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p></div>
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
  data() {
    return {
      registration: {
        email: null,
        password: null,
        retypepassword:null
      },
      registervalidation: {
        email: null,
        emailpattern:null,
        password: {
          required: null,
          passwordlength: null
        },
        retypepassword: {
          required: null,
          passwordlength: null
        },
        confirmpassword:null
      }
    }
  },
  methods: {
    handleRegistration() {
      this.registervalidation.email = null
      if (!this.registration.email) {
        this.registervalidation.email = false
        return
      }
      this.registervalidation.emailpattern = null      
      if (!this.registration.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
        this.registervalidation.emailpattern = false
        return
      }
      this.registervalidation.password.required = null
      if (!this.registration.password) {
        this.registervalidation.password.required = false
        return
      }
      this.registervalidation.password.passwordlength = null
      if(this.registration.password.length < 8) {
        this.registervalidation.password.passwordlength = false
        return
      }
      this.registervalidation.retypepassword.required = null
      if(!this.registration.retypepassword) {
        this.registervalidation.retypepassword.required = false
        return
      }
      this.registervalidation.confirmpassword = null
      if(this.registration.password != this.registration.retypepassword) {
        this.registervalidation.confirmpassword = false
        return
      }
      const data = JSON.stringify({
        email: this.registration.email,
        password: this.registration.password
      })
      axios
        .post(process.env.VUE_APP_BACKEND + "/signup", data, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.data.success) {
            this.$router.push({ name: 'login' })
          }
        })
    },
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
.registerationPage{
  background-color: #FFFFFF;
  width:100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;
  font-size: 1rem;

  .registerationLogo{
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
      
    .logo{
      width: 100%;
    }

    .contentWrapper{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-bottom:1rem;
    
      .empty{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }

      .registerationTitle{
        display: flex;
        flex-direction: column;
        margin-top:1.8rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:0.1rem;
        }

        .title{
          font-size:1.6rem;
        }

        .registerationForm{
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

          .registersubmitButton{
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

        .registerinfo{
          font-size:1rem;
          padding:0.1rem;
          margin-top:1rem;
          margin-bottom:0.1rem;
        }

        .passwordinfo{
          font-size:1rem;
          padding:0.1rem;
          margin-bottom:1rem;
        }

        .backtologindiv{
          display:flex;
          flex-direction:row;
          justify-content:center;

          .backtologinPage{
            color:#350E7E;
            margin-bottom:1.8rem;
            font-size:1.1rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) { 
  .logo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  .contentWrapper{
    width:30rem !important;
  }
}
</style>