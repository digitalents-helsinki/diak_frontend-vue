<template>
  <LogoBox size="small">
    <template v-slot:content>
      <div class="passwordContent">
        <p v-if="!submitted" class="passwordMessage">{{ $t('message.passwordText') }}</p>
        <div v-if="!submitted" class="passwordCredentials">
          <b-form>
            <b-form-group id="passwordtype">
              <b-form-input type="password" id="password" v-model="password.enterpassword" :state="passwordlength" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')" required>
              </b-form-input>
              <b-form-invalid-feedback :state="passwordlength" class="passwordFeedback">
                {{ $t('message.minimumLength') }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="passwordretype">
              <b-form-input type="password" id="confirmpassword" v-model="password.reenterpassword" :state="confirm" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')" required>
              </b-form-input>
              <b-form-invalid-feedback :state="confirm" class="passwordFeedback">
                {{ $t('message.passwordconfirmInput') }}
              </b-form-invalid-feedback>
            </b-form-group>
            <p v-if="error" class="error">{{ error }}</p>
            <b-button type="submit" @click.prevent="handleSubmit" class="recoveryButton">{{ $t('message.submitPassword') }}</b-button>
          </b-form>
        </div>
        <p v-else class="info">{{ $route.params.patchMatch === 'change' ? $t('message.changedPasswordMessage') : $t('message.createdPasswordMessage')}}</p>
        <p class="info">{{ $t('message.passwordInfo') }}</p>
        <div class="backtologindiv"><p class="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p></div>
      </div>
    </template>
  </LogoBox>
</template>
<script>
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
      passwordlength: null,
      confirm: null,
      submitted: false,
      error: null
    }
  },
  computed: {
    decodedJWT() {
      return JSON.parse(atob(this.$route.params.jwt.split('.')[1]))
    }
  },
  methods: {
    handleSubmit() {
      this.passwordlength = null
      if (this.password.enterpassword.length < 8) {
        this.passwordlength = false
        return
      }
      this.confirm = null
      if (this.password.enterpassword !== this.password.reenterpassword) {
        this.confirm = false
        return
      }

      const url = this.$route.params.pathMatch === 'change' ? '/changepassword' : '/createpassword'

      this.$axios({
        method: 'POST',
        url: url,
        headers: {
          'Authorization': `Bearer ${this.$route.params.jwt}`
        },
        data: {
          password: this.password.enterpassword
        }
      }).then(res => {
        if (res.status === 200) {
          this.submitted = true
        } 
      }).catch(err => {
        if (err.response) this.error = err.response.data
        else this.error = err
      })
    },
    handleLoginClick() {
      this.$router.push({ name: 'login'})
    }
  }
}

</script>
<style lang="scss" scoped>

.passwordFeedback {
  font-size: 1rem;
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

    .error {
      color: red;
      font-size: 1.25rem;
      margin-top: -0.5rem;
    }

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