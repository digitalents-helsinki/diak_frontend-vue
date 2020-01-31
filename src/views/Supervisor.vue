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
          <b-button variant="primary" @click.prevent="handleAdminAdd" :disabled="!email || !email.match(/.+@.+/)">{{ $t('message.supervisorMore') }}</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul v-if="admins.length">
        <li v-for="admin in admins" :key="admin.userId">
          <b-card class="m-3">
            <p>{{admin.email}}</p>
            <b-button variant="danger" size="sm" @click.prevent="handleAdminRemove(admin.userId)">{{ $t('message.removeAdminButton') }}</b-button>
          </b-card>
        </li>
      </ul>
    </div>
    <div class="searchUser">
      <h2 class="heading">{{ $t('message.supervisorSearchUser') }}</h2>
      <b-input-group>
        <b-input v-model="userSearchTerm" :placeholder="$t('message.supervisorSearchPlaceHolder')" type="search"/>
        <b-input-group-append>
          <b-button variant="primary" @click.prevent="handleUserSearch" :disabled="!userSearchTerm">{{ $t('message.supervisorSearchButton') }}</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.userId">
          <b-card class="m-3">
            <p>{{user.email}}</p>
            <p>{{user.name}}</p>
            <b-button variant="danger" size="sm" @click.prevent="handleUserDelete(user.userId)">{{ $t('message.deleteUserButton') }}</b-button>
          </b-card>
        </li>
      </ul>
    </div>
    <div class="deleteByEmail">
      <h2 class="heading">{{ $t('message.supervisorDeleteByEmail') }}</h2>
      <b-input-group>
        <b-input v-model="deleteByEmail" :placeholder="$t('message.supervisorDeleteByEmailPlaceHolder')" type="email" />
        <b-input-group-append>
          <b-button variant="primary" @click.prevent="handleDeleteByEmail" :disabled="!deleteByEmail || !deleteByEmail.match(/.+@.+/)">{{ $t('message.supervisorDeleteByEmailButton') }}</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul v-if="deleteResponses.length">
        <li v-for="(response, index) in deleteResponses" :key="index">
          <b-card class="m-3">
            <p>{{response}}</p>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import { create } from 'axios'
const axios = create({
  baseURL: process.env.VUE_APP_BACKEND,
  withCredentials: true
})

export default {
  name: 'supervisor',
  data() {
    return {
      supervisor_password: null,
      jwt: null,
      email: null,
      admins: [],
      users: [],
      deleteResponses: [],
      loggingIn: null,
      loginError: null,
      userSearchTerm: null,
      deleteByEmail: null
    }
  },
  methods: {
    handleAdminAdd() {
      axios({
        method: "POST",
        url: "/supervisor/admin/create",
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
      }).catch(err => {
        const errorTitle = (() => {
          if (err.response.status === 422) {
              return this.$t('message.validationError')
          } else {
              return this.$t('message.genericError')
          }
        })()
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
            title: errorTitle,
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
        })
      })
    },
    handleAdminRemove(id) {
      axios({
        method: "POST",
        url: "/supervisor/admin/delete",
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        },
        data: {
          id: id
        }
      }).then(res => {
        if (res.status === 200) this.getAdmins()
      }).catch(err => {
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
          title: this.$t('message.genericError'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      })
    },
    getAdmins() {
      axios({
        method: 'GET',
        url: '/supervisor/admin/all',
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      }).then(res => {
        if (res.status === 200) this.admins = res.data
      }).catch(err => {
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
          title: this.$t('message.genericError'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      })
    },
    handleUserSearch() {
      axios({
        method: 'GET',
        url: `/supervisor/user/search/${this.userSearchTerm}`,
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      }).then(res => {
        if (res.status === 200) this.users = res.data
      }).catch(err => {
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
          title: this.$t('message.genericError'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      })
    },
    handleUserDelete(userId) {
      axios({
        method: 'DELETE',
        url: `/supervisor/user/${userId}/delete`,
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      }).then(res => {
        if (res.status === 204) this.users.splice(this.users.findIndex(user => user.userId === userId), 1)
      }).catch(err => {
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
          title: this.$t('message.genericError'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      })
    },
    handleDeleteByEmail() {
      axios({
        method: 'POST',
        url: `/supervisor/deletebyemail`,
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        },
        data: {
          email: this.deleteByEmail
        }
      }).then(({ status, data: { email, amount } }) => {
        if (status === 200) this.deleteResponses.unshift(this.$t('message.deletedEmailFromResources', { email, amount })) 
      }).catch(err => {
        this.$bvToast.toast(`${err.response ? err.response.data : err.message}`, {
          title: this.$t('message.genericError'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger'
        })
      })
    },
    handleLogin() {
      this.loginError = null
      this.loggingIn = true
      axios({
        method: 'POST',
        url: `/supervisor/login`,
        data: {
          password: this.$data.supervisor_password
        }
      }).then(res => {
        if (res.status === 200) {
          this.supervisor_password = null
          this.jwt = res.data.token
          this.getAdmins()
        }
      }).catch(err => this.loginError = err.response.data).finally(() => this.loggingIn = false)
    }
  },
  created() {
    this.$store.dispatch('logout')
    axios.interceptors.response.use(res => res, err => {
      if (err.response) {
        switch(true) {
          case err.response.config.url === '/surf': // Try again if getting csrf token fails
            // eslint-disable-next-line no-console
            console.error(err)
            setTimeout(() => axios.get('/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data), 1000)
            break
          case err.response.status === 401: // Auth failed because token expired or whatever, login again
            // eslint-disable-next-line no-console
            console.error(err)
            this.jwt = null
            return Promise.reject(err)
          default:
            return Promise.reject(err)
        }
      } else {
        return Promise.reject(err)
      }
    })
    axios.get('/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data)
  }
}
</script>
<style lang="scss" scoped>

.supervisor-functions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
}


ul {
  margin: 0.5rem;
  padding: 0;
  max-height: 50vh;
  overflow-y: scroll;
  border: 1px solid #dee2e6;
  border-radius: 5px;

  li {
    list-style: none;
  }
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

  .heading{
    font-size:1.1rem;
    font-weight:bold;
    color: #350E7E;
    margin-bottom:1rem;
  }

  .deleteByEmail {
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;
    width: 100%;
  }

  .searchUser {
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;
    width: 100%;
  }

  .createNew{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:1rem;
    width: 100%;

    .logoutDiv{
      margin-bottom:1rem;

      .logoutButton{
        margin-left:8rem;
      }
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