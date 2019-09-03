<template>
  <div class="profile">
    <form v-if="!loggedIn">
      <h2 class="text-center">Tallenna tietosi</h2>
      <div class="form-group">
        <label for="userName">nimi: </label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="userName">sähköposti: </label>
        <input type="text" class="form-control" id="email" v-model="email" disabled />
      </div>
      <div class="form-group">
        <label for="userGender">Sukupuoli</label>
        <select class="form-control" id="gender" v-model="gender">
          <option>mies</option>
          <option>nainen</option>
          <option>muu</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="handleRegister">Tallenna</button>
    </form>
    <div v-if="loggedIn">
      <h2>Tietosi</h2>
      <p>{{name}}</p>
      <p>{{email}}</p>
      <p>{{gender}}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'profile',
  props: ['user'],
  data() {
    return {
      name: this.$props.user.ig,
      email: this.$props.user.U3,
      gender: null,
      loggedIn: false,
      userId: null
    }
  },
  methods: {
    handleRegister() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_BACKEND + "/user/create",
        data: {
          name: this.$data.name,
          email: this.$data.email,
          gender: this.$data.gender
        }
      })
      .then(res => {
        this.getProfile(res.id)
      })
    },
    getProfile(id) {
    axios
      .get(process.env.VUE_APP_BACKEND + '/user/' + id)
      .then(res => {
        this.$data.name = res.name,
        this.$data.email = res.email,
        this.$data.gender = res.gender
        this.$data.loggedIn = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  flex-flow: column nowrap;
  width: 30%;
  justify-content: center;
  align-content: center;
  margin: auto;
  height: 100%;
  }
</style>