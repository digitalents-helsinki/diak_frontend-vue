<template>
<div class="supervisorPage">
  <p class="welcome">{{ $t('message.supervisorWelcome') }}</p>
  <div v-if="!jwt" class="supervisorContent">
    <label class="passwordLabel">{{ $t('message.supervisorPassword') }}</label><input v-model="supervisor_password" type="password" />
    <button @click.prevent="handleLogin" class="loginButton">{{ $t('message.supervisorLogin') }}</button>
  </div>
  <div v-if="jwt" class="createNew">
    <h3 class="heading">{{ $t('message.supervisorCreate') }}</h3>
    <label>Sähköposti: </label><input v-model="username" type="text" />
    <label class="emailPassword">{{ $t('message.supervisorPassword') }}</label><input v-model="password" type="password" />
    <button @click.prevent="handleAdminAdd" class="createButton">{{ $t('message.supervisorMore') }}</button>
    <ul>
      <li v-for="admin in admins" :key="admin.userId">{{admin.email}} <button @click.prevent="handleAdminRemove(admin.userId)">{{ $t('message.deleteButton') }}</button></li>
    </ul>
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
      username: null,
      password: null,
      admins: [],
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
          username: this.$data.username,
          password: this.$data.password
        }
      }).then(res => {
        if (res.status === 200) this.getAdmins()
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
      })
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
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
    font-size:1.1rem;
    font-weight:bold;
    color: #350E7E;
    margin-top:5rem;
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
      margin-top:1rem;
    }
  }
  .createNew{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;

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