import { create } from 'axios'
import store from './store'
import router from './router'

const axios = create({
  baseURL: process.env.VUE_APP_BACKEND,
  withCredentials: true
})

axios.interceptors.response.use(res => res, err => {
  if (err.response) {
    switch(true) {
      case (err.response.status === 403) && err.response.data === "Invalid csrf token": // Get csrf token if we don't have it because ??? and retry
        console.error(err) // Not sure about the security implications of doing this, but I'm sure it should be fine.
        return axios.get('/surf').then(res => {
          axios.defaults.headers.common['CSRF-Token'] = err.config.headers['CSRF-Token'] = res.data
          return axios(err.config)
        })
      case err.response.config.url === '/surf': // Try again if getting csrf token fails
        console.error(err)
        setTimeout(() => axios.get('/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data), 1000)
        break
      case store.state.authentication.accessToken && (err.response.status === 401): // Auth failed because token expired or whatever, login again
        console.error(err)
        store.commit('logout')
        router.push('/login')
        break
      default:
        return Promise.reject(err)
      }
  } else {
    return Promise.reject(err)
  }
})

axios.get('/surf').then(res => axios.defaults.headers.common['CSRF-Token'] = res.data)

export default axios