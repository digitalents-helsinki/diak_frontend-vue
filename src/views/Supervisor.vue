<template>
<div>
  <div v-if="!loggedIn">
    <label>Tunnus: </label><input v-model="supervisor_username" type="text" />
    <label>Salasana: </label><input v-model="supervisor_password" type="text" />
    <button @click.prevent="handleLogin">Kirjaudu sisään</button>
  </div>
  <div v-if="loggedIn">
    <ul>
      <li v-for="admin in admins" :key="admin.userId">{{admin.email}} <button @click.prevent="handleAdminRemove(admin.userId)">poista</button></li>
    </ul>
    <h3>Lisää uusi hallinnoija</h3>
    <label>Sähköposti: </label><input v-model="username" type="text" />
    <label>Salasana: </label><input v-model="password" type="text" />
    <button @click.prevent="handleAdminAdd">Lisää</button>
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
        url: process.env.VUE_APP_BACKEND + "/admin/create",
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
        url: process.env.VUE_APP_BACKEND + "/admin/delete",
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
        url: `${process.env.VUE_APP_BACKEND}/admins`
      }).then(result => {
        this.admins = result.data
      })
    },
    handleLogin() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_BACKEND}/supervisor/login`,
        data: {
          username: this.$data.supervisor_username,
          password: this.$data.supervisor_password
        }
      }).then(result => {
        if (result.data.success === 'true') {
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
</style>