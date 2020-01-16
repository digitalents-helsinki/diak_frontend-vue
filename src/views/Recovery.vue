<template>
  <LogoBox size="small">
    <template v-slot:content>
      <div class="recoveryContent">
        <p class="title">{{ $t('message.recoveryText') }}</p>
        <div v-if="!recoverymessage" class="recoveryForm">
          <b-form>
            <b-form-group id="emailfield">
              <b-form-input type="email" v-model="recovery.email" :state="recoveryvalidation.email" id="email" name="loginname" v-bind:placeholder="$t('message.recoveryEmail')">
              </b-form-input>
              <b-form-invalid-feedback :state="recoveryvalidation.email" class="emailFeedback">
              {{ $t('message.emailInput') }}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" @click.prevent="handleRecovery" class="btn recoveryButton">{{ $t('message.submitPassword') }}</b-button>
          </b-form>
        </div>
        <p v-if="recoverymessage" class="submitMessage">{{ $t('message.recoverymessage') }}</p>
        <p v-if="recoveryinstruction" class="recoveryinfo">{{ $t('message.recoveryInfo') }}</p>
        <div class="backtologindiv"><p class="backtologinPage" @click="handleLoginClick">{{ $t('message.gettologinPage') }}</p></div>
      </div>
    </template>
  </LogoBox>
</template>
<script>
import axios from 'axios'
import LogoBox from '@/components/LogoBox.vue'

export default {
  name: 'Recovery',
  components: {
    LogoBox
  },
  data() {
    return {
      recovery: {
        email: null
      },
      recoveryvalidation: {
        email: null
      },
      recoveryinstruction:true,
      recoverymessage:false
    }
  },
  methods: {
    handleRecovery() {
      this.recoveryvalidation.email = null
      if (!this.recovery.email.match(/.+@.+/)) {
        this.recoveryvalidation.email = false
        return
      }
      const data = JSON.stringify({
        email: this.recovery.email
      })
      axios
        .post(process.env.VUE_APP_BACKEND + "/recover", data, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.status === 200) {
            this.recoveryinstruction=false;
            this.recoverymessage=true;
          }
        })
  },
    handleLoginClick() {
      this.$router.push({ name: 'login'})
    }
  }
}
</script>
<style lang="scss" scoped>

.recoveryContent{
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

  .recoveryForm{
    display:flex;
    flex-direction:column;
    width:100%;
    padding:1rem;

    .error {
      margin: 1rem 0 0 0;
      font-size: 1rem;
      color: red;
    }
      
    .emailFeedback{
      font-size:1rem;
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

  .enterEmail{
    font-size:1rem;
    padding:0.1rem;
    margin-top:1rem;
    margin-bottom:1rem;
    color:#FF0000;
  }

  .submitMessage {
    font-size: 1rem;
    padding: 1rem;
  }

  .recoveryinfo{
    font-size:1rem;
    padding:0.1rem;
    margin-top:1rem;
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
</style>