<template>
<div class="supervisorPage">
  <p class="welcome">Tervetuloa</p>
  <div v-if="!loggedIn" class="supervisorContent">
    <label>Tunnus: </label><input v-model="supervisor_username" type="text" />
    <label class="passwordLabel">Salasana: </label><input v-model="supervisor_password" type="password" />
    <button @click.prevent="handleLogin" class="loginButton">Kirjaudu sisään</button>
  </div>
  <div v-if="loggedIn" class="createNew">
    <h3 class="heading">Lisää uusi hallinnoija</h3>
    <label>Sähköposti: </label><input v-model="username" type="text" />
    <label class="emailPassword">Salasana: </label><input v-model="password" type="password" />
    <button @click.prevent="handleAdminAdd" class="createButton">Lisää</button>
    <ul>
      <li v-for="admin in admins" :key="admin.userId">{{admin.email}} <button @click.prevent="handleAdminRemove(admin.userId)">Poista</button></li>
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
      loggedIn: false,
      supervisor_username: null,
      supervisor_password: null,
      username: null,
      password: null,
      admins: []
    }
  },
  methods: {
    handleAdminAdd() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/supervisor/admin/create",
        data: {
          username: this.$data.username,
          password: this.$data.password
        }
      }).then(result => {
        this.getAdmins()
      })
    },
    handleAdminRemove(id) {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/supervisor/admin/delete",
        data: {
          id: id
        }
      }).then(result => {
        this.getAdmins()
      })
    },
    getAdmins() {
      axios({
        method: 'GET',
        url: `${process.env.VUE_APP_BACKEND}/supervisor/admin/all`
      }).then(result => {
        this.admins = result.data
      })
    },
    handleLogin() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_BACKEND}/supervisor/authorize`,
        data: {
          username: this.$data.supervisor_username,
          password: this.$data.supervisor_password
        }
      }).then(result => {
        if (result.data.success === true) {
          this.loggedIn = true
        } else {
        }
      })
    }
  },
  created() {
    this.getAdmins()
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