<template>
<div class="login">
  <button class="btn" @click="handleSignIn">Kirjaudu sisään</button>
</div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    handleSignIn() {
      this.$gAuth
        .signIn()
        .then(gUser => {
          this.$router.push({ name: 'profile', params: { user: gUser.w3 }})
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  button {
    background: steelblue;
    color: white;
  }
}
</style>