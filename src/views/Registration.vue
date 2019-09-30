<template>
  <div class="registermaindiv">
    <b-container>
      <div class="registerDiv">
        <img src="../images/DIAK_3X10D_MUSTA_RGB.svg" alt="logo" class="registerLogo"/>
        <div class="registercontentDiv">
          <div class="spaceRegister">
          </div>
          <div class="registerContent">
            <p class="registerMessage">{{ $t('message.registerText') }}</p>
            <div class="registerCredentials">
              <b-form>
                <b-form-group id="regnamefield">
                  <b-form-input type="email" v-model="registration.email" id="email" name="loginname" v-bind:placeholder="$t('message.registerUsername')" required>
                  </b-form-input>
                </b-form-group>
                <b-form-group id="regpasswordfield">
                  <b-form-input type="password" id="password" v-model="registration.password" name="loginpassword" v-bind:placeholder="$t('message.registerPassword')" required>
                  </b-form-input>
                </b-form-group>
                <b-form-group id="retypefield">
                  <b-form-input type="password" id="confirmpassword" name="confirmloginpassword" v-bind:placeholder="$t('message.confirmPassword')" required>
                  </b-form-input>
                </b-form-group>
                <b-button type="submit" @click.prevent="handleRegistration" class="btn registersubmitButton">{{ $t('message.submitRegister') }}</b-button>
              </b-form>
            </div>
            <p class="registerinfo">{{ $t('message.registrationInfo') }}</p>
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
  data() {
    return {
      registration: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    handleRegistration() {
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
      
      .registerLogo{
        width: 100%;
      }

    .registercontentDiv{
      background-color: #F9F9FB;
      width:100%;
      box-shadow: 0 5px 5px gray;
      margin-bottom:1rem;
    
      .spaceRegister{
        background-color:#80CDE6;
        width:100%;
        padding: 1rem;
      }

      .registerContent{
        display: flex;
        flex-direction: column;
        margin-top:1.8rem;
        width:100%;
        height: 100%;

        input{
          margin-bottom:1rem;
        }

        .registerMessage{
          font-size:1.6rem;
        }

        .registerCredentials{
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

        .registerinfo{
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
  .registerLogo{
    width:29rem !important;
    margin-bottom:1rem;
  }
  .registercontentDiv {
    width:30rem !important;
  }
}
</style>