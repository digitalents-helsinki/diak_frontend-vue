<template>
  <LogoBox size="small">
    <template v-slot:content>
      <div class="passwordContent">
        <p class="passwordMessage">{{ $t('message.passwordText') }}</p>
        <div class="passwordCredentials">
          <b-form>
            <b-form-group id="passwordtype">
              <b-form-input type="password" id="password" v-model="password.enterpassword" :state="passwordvalidation.enterpassword" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')" required>
              </b-form-input>
              <b-form-invalid-feedback :state="passwordvalidation.enterpassword" class="passwordFeedback">
              {{ $t('message.passwordInput') }}
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="passwordretype">
              <b-form-input type="password" id="confirmpassword" v-model="password.reenterpassword" :state="passwordvalidation.reenterpassword" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')" required>
              </b-form-input>
              <b-form-invalid-feedback :state="passwordvalidation.reenterpassword" class="passwordFeedback">
              {{ $t('message.passwordInput') }}
            </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" @click.prevent="handleLogin" class="recoveryButton">{{ $t('message.submitPassword') }}</b-button>
          </b-form>
        </div>
        <p class="info">{{ $t('message.passwordInfo') }}</p>
        <div class="backtologindiv"><p class="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p></div>
      </div>
    </template>
  </LogoBox>
</template>
<script>
import axios from 'axios'
import LogoBox from '@/components/LogoBox.vue'

export default {
  name: 'registration',
  components: {
    LogoBox
  },
  data() {
    return {
      password: {
        enterpassword: null,
        reenterpassword: null
      },
      passwordvalidation: {
        enterpassword: {
          required: null,
          passwordlength: null
        },
        reenterpassword: {
          required: null,
          passwordlength: null
        }
      },
      confirm: null
    }
  },
  methods: {
    handleSignIn() {
      this.passwordvalidation.enterpassword.required = null
      if (!this.password.enterpassword) {
        this.registervalidation.enterpassword.required = false
        return
      }
      this.passwordvalidation.enterpassword.passwordlength = null
      if(this.password.enterpassword.length < 8) {
        this.registervalidation.enterpassword.passwordlength = false
        return
      }
      this.passwordvalidation.reenterpassword.required = null
      if (!this.password.reenterpassword) {
        this.registervalidation.reenterpassword.required = false
        return
      }
      this.passwordvalidation.confirm = null
      if(this.registration.enterpassword != this.registration.reenterpassword) {
        this.passwordvalidation.reenterpassword.required = false
        return
      }
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

    .recoveryButton{
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

  .info{
    font-size:1rem;
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
</style>