<template>
<div class="admin container">
  <h1>Uusi kysely</h1>
  <div class="survey-identity">
    <label>Kyselyn tunnus</label>
    <input type="text" v-model="surveyId" />
  </div>
  <div class="anon-choice">
    <div><label>anonyymi</label><input v-model="anon" value=true id="anon" type="radio" /></div>
    <div><label>tunnistettu</label><input v-model="anon" value=false id="anon" type="radio" /></div>
  </div>
  <div class="email-adder">
    <span>Sähköpostit</span>
    <input v-model="email" type="text" />
    <button @click="addEmail">Lisää</button>
  </div>
  <div>
    <ul class="email-list">
      <li v-for="(email, index) in emails" v-bind:key="index">
        <span>{{email}}</span><button @click="removeEmail(index)">X</button>
      </li>
    </ul>
  </div>
  <div class="submit-btn">
    <button @click="sendSurvey">Lisää kysely</button>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'admin',
  data() {
    return {
      emails: [],
      email: null,
      surveyId: null,
      anon: true
    }
  },
  methods: {
    addEmail() {
      this.$data.emails.push(this.$data.email)
      this.$data.email = null
    },
    removeEmail(index) {
      this.$data.emails.pop(index)
    },
    sendSurvey() {
      if (this.$data.surveyId !== null) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/sendmail",
        data: { to: this.$data.emails, id: this.$data.surveyId, anon: this.$data.anon}
      })
        .then(res => {
          console.log(res)
        })
      } else {
        console.log('error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: column;

  h1 {
    align-self: center;
  }

  .survey-identity {
    display: flex;
    width: 30%;
    justify-content: space-between;
  }

  .anon-choice {
    display: flex;
    flex-direction: column;
  }

  .email-adder {
    display: flex;
    flex-flow: row wrap;

    span {
      width: 100%;
    }
  }

  .email-list {
    li {
      width: 350px;
      padding: 15px 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
  }

  .submit-btn {
    align-self: center;
  }
}
</style>