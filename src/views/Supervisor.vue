<template>
<div class="supervisorPage">
  <h1 v-if="jwt" class="welcome">{{ $t('message.supervisorWelcome') }}</h1>
  <div v-if="!jwt" class="supervisorContent">
    <b-input-group v-if="!loggingIn" class="m-5">
      <b-input v-model="supervisor_password" :placeholder="$t('message.supervisorPassword')" type="password" :state="loginError"/>
      <b-input-group-append>
        <b-button v-if="!loggingIn" @click.prevent="handleLogin" class="loginButton">{{ $t('message.supervisorLogin') }}</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-spinner v-else class="m-5" style="color: #350E7E"/>
    <p v-if="loginError" class="text-danger">{{loginError}}</p>
  </div>
  <div v-else class="supervisor-functions">
    <div class="createNew">
      <h2 class="heading">{{ $t('message.supervisorCreate') }}</h2>
      <b-input-group>
        <b-input v-model="email" :placeholder="$t('message.supervisorEmail')" type="email" />
        <b-input-group-append>
          <b-button variant="primary" @click.prevent="handleAdminAdd">{{ $t('message.supervisorMore') }}</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul>
        <li v-for="admin in admins" :key="admin.userId">
          <b-card class="m-3">
            <p>{{admin.email}}</p>
            <b-button variant="danger" size="sm" @click.prevent="handleAdminRemove(admin.userId)">{{ $t('message.deleteButton') }}</b-button>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'supervisor',
  data() {
    return {
      supervisor_password: null,
      jwt: null,
      email: null,
      password: null,
      admins: [],
      loggingIn: null,
      loginError: null
    }
  },
  methods: {
    handleAdminAdd() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/supervisor/admin/create",
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        },
        data: {
          email: this.$data.email,
          password: this.$data.password
        }
      }).then(res => {
        if (res.status === 200) {
          this.getAdmins()
          this.$data.email = null
          this.$data.password = null
        }
      })
    },
    handleAdminRemove(id) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/supervisor/admin/delete",
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        },
        data: {
          id: id
        }
      }).then(res => {
        if (res.status === 200) this.getAdmins()
      })
    },
    getAdmins() {
      axios({
        method: 'GET',
        url: `${process.env.VUE_APP_BACKEND}/supervisor/admin/all`,
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        },
      }).then(res => {
        if (res.status === 200) this.admins = res.data
      })
    },
    handleLogin() {
      this.loginError = null
      this.loggingIn = true
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_BACKEND}/supervisor/login`,
        data: {
          password: this.$data.supervisor_password
        }
      }).then(res => {
        if (res.status === 200) {
          this.jwt = res.data.token
          this.getAdmins()
        }
      }).catch(err => this.loginError = err.response.data).finally(() => this.loggingIn = false)
    },
    signOut() {
     this.$store.commit('logout')
     this.$router.push({ path: '/' })
    }  
  }
}
</script>
<style lang="scss" scoped>

.supervisor-functions {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.supervisorPage{
  background-color:#FFFFFF;
  width:100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  font-family: Arial, Helvetica, sans-serif;
  font-style:normal;

  .welcome{
    font-size:1.4rem;
    font-weight:bold;
    color: #350E7E;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .supervisorContent{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;

    .passwordLabel{
      margin-top:1rem;
    }
    .loginButton{
      background-color: #350E7E;
      color:#FFFFFF;

      &:hover {
        background-color: darken(#350E7E, 5%);
      }

      &:focus {
        box-shadow:  0 0 0 0.2rem rgba(53, 14, 126, 0.5)
      }
    }
  }
  .createNew{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;
    width: 100%;
    align-self: center;

    ul {
      margin: 0;
      padding: 0;
      max-height: 50vh;
      overflow-y: scroll;
      li {
        list-style: none;
        font-size: 1.2rem;
      }
    }

    .logoutDiv{
      margin-bottom:1rem;

      .logoutButton{
        margin-left:8rem;
      }
    }
    
    .heading{
      font-size:1.1rem;
      font-weight:bold;
      color: #350E7E;
      margin-bottom:1rem;
    }
    .emailPassword{
      margin-top:1rem;
    }
    .createButton{
      background-color: #350E7E;
      color:#FFFFFF;
      margin-top:1rem;
      margin-bottom:1.8rem;
      padding:0 1rem;
    }
  }
}
</style>